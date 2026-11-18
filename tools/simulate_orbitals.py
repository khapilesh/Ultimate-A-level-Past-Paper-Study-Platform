#!/usr/bin/env python3
"""Precompute lightweight LCAO-inspired electron-density clouds for the web sandbox.

This is an educational Gaussian-basis model, not a self-consistent quantum-chemistry
solver. The browser renders the deterministic point clouds emitted by this script.
"""
from __future__ import annotations

import argparse
import base64
import heapq
import json
import math
import random
from pathlib import Path
from typing import Callable, Iterable

ROOT = Path(__file__).resolve().parents[1]
MODEL_PATH = ROOT / "data" / "orbital-molecule-models.json"
OUTPUT_PATH = ROOT / "js" / "orbital-density-data.js"
BOUND = 3.2
GRID_STEPS = 25
BASE_SAMPLES = 92

# Simple valence-electron occupancies for the atomic-reference view.
P_OCCUPANCIES = {
    "B": (1, 0, 0),
    "C": (1, 1, 0),
    "N": (1, 1, 1),
    "O": (2, 1, 1),
    "F": (2, 2, 1),
}


def dot(a: Iterable[float], b: Iterable[float]) -> float:
    return sum(x * y for x, y in zip(a, b))


def normalize(v: Iterable[float]) -> tuple[float, float, float]:
    values = tuple(float(x) for x in v)
    length = math.sqrt(dot(values, values)) or 1.0
    return tuple(x / length for x in values)


def add(a: Iterable[float], b: Iterable[float]) -> tuple[float, float, float]:
    return tuple(x + y for x, y in zip(a, b))


def scale(v: Iterable[float], amount: float) -> tuple[float, float, float]:
    return tuple(x * amount for x in v)


def subtract(a: Iterable[float], b: Iterable[float]) -> tuple[float, float, float]:
    return tuple(x - y for x, y in zip(a, b))


def cross(a: Iterable[float], b: Iterable[float]) -> tuple[float, float, float]:
    ax, ay, az = a
    bx, by, bz = b
    return (ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx)


def gaussian_s(point: tuple[float, float, float], center: tuple[float, float, float]) -> float:
    r2 = dot(subtract(point, center), subtract(point, center))
    return math.exp(-0.82 * r2)


def gaussian_2s(point: tuple[float, float, float], center: tuple[float, float, float]) -> float:
    delta = subtract(point, center)
    r2 = dot(delta, delta)
    # A radial node keeps the atomic reference visibly distinct from a 1s cloud.
    return (1.0 - 0.58 * r2) * math.exp(-0.61 * r2)


def gaussian_p(
    point: tuple[float, float, float],
    center: tuple[float, float, float],
    direction: Iterable[float],
) -> float:
    delta = subtract(point, center)
    r2 = dot(delta, delta)
    return 1.75 * dot(delta, normalize(direction)) * math.exp(-0.72 * r2)


def hybrid_coefficients(hybridization: str) -> tuple[float, float]:
    if hybridization == "sp3":
        return (0.5, math.sqrt(3.0) / 2.0)
    if hybridization == "sp2":
        return (1.0 / math.sqrt(3.0), math.sqrt(2.0 / 3.0))
    return (1.0 / math.sqrt(2.0), 1.0 / math.sqrt(2.0))


def hybrid_wavefunction(
    point: tuple[float, float, float],
    center: tuple[float, float, float],
    direction: Iterable[float],
    hybridization: str,
) -> float:
    c_s, c_p = hybrid_coefficients(hybridization)
    return c_s * gaussian_2s(point, center) + c_p * gaussian_p(point, center, direction)


def bonding_molecular_orbital_density(orbital_a: Callable, orbital_b: Callable) -> Callable:
    """Two-electron density for a normalized, constructive two-centre LCAO combination."""
    return lambda point: 2.0 * ((orbital_a(point) + orbital_b(point)) / math.sqrt(2.0)) ** 2


def atomic_density(element: str, center: tuple[float, float, float]) -> tuple[Callable, int]:
    if element == "H":
        return (lambda point: gaussian_s(point, center) ** 2, 1)
    p_occupancies = P_OCCUPANCIES.get(element, (1, 1, 1))
    axes = ((1.0, 0.0, 0.0), (0.0, 1.0, 0.0), (0.0, 0.0, 1.0))
    electrons = 2 + sum(p_occupancies)

    def density(point: tuple[float, float, float]) -> float:
        result = 2.0 * gaussian_2s(point, center) ** 2
        for axis, occupancy in zip(axes, p_occupancies):
            if occupancy:
                result += occupancy * gaussian_p(point, center, axis) ** 2
        return result

    return density, electrons


def ligand_geometry(model: dict) -> list[dict]:
    symbol = model.get("ligandSymbol") or model.get("hSymbol") or "H"
    result = []
    for site in model["hSites"]:
        central = model["atoms"][site["atom"]]["position"]
        direction = normalize(site["direction"])
        result.append({
            "element": symbol,
            "position": add(central, scale(direction, 1.0)),
            "centralAtom": site["atom"],
            "direction": direction,
        })
    return result


def cloud_for_density(
    density_fn: Callable[[tuple[float, float, float]], float],
    electrons: float,
    seed: str,
) -> dict:
    """Sample a compact, deterministic 3-D point cloud weighted by |psi| squared."""
    steps = GRID_STEPS
    coordinates = [(-BOUND + 2.0 * BOUND * i / (steps - 1)) for i in range(steps)]
    weighted_nodes: list[tuple[float, tuple[float, float, float], float]] = []
    peak = 0.0
    rng = random.Random(seed)
    # Keep a bounded heap of weighted-reservoir keys rather than serializing a volume.
    count = min(176, BASE_SAMPLES + int(15 * math.sqrt(max(electrons, 1))))
    for x in coordinates:
        for y in coordinates:
            for z in coordinates:
                point = (x, y, z)
                value = max(0.0, density_fn(point))
                if value <= 0.0:
                    continue
                peak = max(peak, value)
                weight = value ** 0.62
                key = rng.random() ** (1.0 / max(weight, 1e-12))
                entry = (key, point, value)
                if len(weighted_nodes) < count:
                    heapq.heappush(weighted_nodes, entry)
                elif key > weighted_nodes[0][0]:
                    heapq.heapreplace(weighted_nodes, entry)
    if not weighted_nodes or peak <= 0.0:
        return {"packed": "", "samples": 0, "electrons": electrons}

    encoded = bytearray()
    for _, point, value in weighted_nodes:
        for coordinate in point:
            quantized = round((coordinate + BOUND) * 255.0 / (2.0 * BOUND))
            encoded.append(max(0, min(255, quantized)))
        intensity = round(255.0 * min(1.0, value / peak) ** 0.38)
        encoded.append(max(1, min(255, intensity)))
    return {
        "packed": base64.b64encode(encoded).decode("ascii"),
        "samples": len(weighted_nodes),
        "electrons": electrons,
    }


def orbital_cloud(center: Iterable[float], direction: Iterable[float], hybridization: str, electrons: float = 1.0) -> Callable:
    center_tuple = tuple(float(x) for x in center)
    direction_tuple = normalize(direction)
    return lambda point: electrons * hybrid_wavefunction(point, center_tuple, direction_tuple, hybridization) ** 2


def atom_ao_cloud(center: Iterable[float], element: str) -> tuple[Callable, int]:
    return atomic_density(element, tuple(float(x) for x in center))


def make_model_density(model: dict) -> dict:
    model_id = model["id"]
    atoms = model["atoms"]
    ligands = ligand_geometry(model)
    hybridization = model["hybridization"]
    atom_clouds = []
    for atom in atoms:
        fn, electrons = atom_ao_cloud(atom["position"], atom["element"])
        atom_clouds.append({"anchorAtom": len(atom_clouds), "cloud": cloud_for_density(fn, electrons, f"{model_id}:atom:{len(atom_clouds)}")})
    ligand_atom_clouds = []
    for index, ligand in enumerate(ligands):
        fn, electrons = atom_ao_cloud(ligand["position"], ligand["element"])
        ligand_atom_clouds.append({
            "anchorAtom": ligand["centralAtom"],
            "site": index,
            "cloud": cloud_for_density(fn, electrons, f"{model_id}:ligand-atom:{index}"),
        })

    hybrid_sites = []
    ligand_sites = []
    sigma_bonds = []
    for index, site in enumerate(model["hSites"]):
        center = atoms[site["atom"]]["position"]
        direction = normalize(site["direction"])
        ligand = ligands[index]
        hybrid_fn = orbital_cloud(center, direction, hybridization, 1.0)
        hybrid_sites.append({
            "anchorAtom": site["atom"],
            "site": index,
            "cloud": cloud_for_density(hybrid_fn, 1.0, f"{model_id}:hybrid:{index}"),
        })
        ligand_element = ligand["element"]
        ligand_center = ligand["position"]
        if ligand_element == "H":
            ligand_fn = lambda point, c=tuple(ligand_center): gaussian_s(point, c) ** 2
        else:
            ligand_fn = lambda point, c=tuple(ligand_center), d=scale(direction, -1.0): gaussian_p(point, c, d) ** 2
        ligand_sites.append({
            "anchorAtom": site["atom"],
            "site": index,
            "cloud": cloud_for_density(ligand_fn, 1.0, f"{model_id}:ligand:{index}"),
        })
        central_wave = lambda point, c=tuple(center), d=direction, h=hybridization: hybrid_wavefunction(point, c, d, h)
        if ligand_element == "H":
            terminal_wave = lambda point, c=tuple(ligand_center): gaussian_s(point, c)
        else:
            terminal_wave = lambda point, c=tuple(ligand_center), d=scale(direction, -1.0): gaussian_p(point, c, d)
        bond_fn = bonding_molecular_orbital_density(central_wave, terminal_wave)
        sigma_bonds.append({
            "anchorAtom": site["atom"],
            "site": index,
            "cloud": cloud_for_density(bond_fn, 2.0, f"{model_id}:sigma:{index}"),
        })

    sigma_sites = []
    cc_sigma_bond = None
    if model.get("ccSigma"):
        directions_by_atom = {item["atom"]: item["direction"] for item in model["sigmaDirections"]}
        for atom_index, atom in enumerate(atoms[:2]):
            direction = normalize(directions_by_atom[atom_index])
            ao_fn = orbital_cloud(atom["position"], direction, hybridization, 1.0)
            sigma_sites.append({
                "anchorAtom": atom_index,
                "site": atom_index,
                "cloud": cloud_for_density(ao_fn, 1.0, f"{model_id}:cc-hybrid:{atom_index}"),
            })
        first_center = tuple(float(x) for x in atoms[0]["position"])
        second_center = tuple(float(x) for x in atoms[1]["position"])
        first_direction = normalize(directions_by_atom[0])
        second_direction = normalize(directions_by_atom[1])
        first_fn = lambda point: hybrid_wavefunction(point, first_center, first_direction, hybridization)
        second_fn = lambda point: hybrid_wavefunction(point, second_center, second_direction, hybridization)
        cc_fn = bonding_molecular_orbital_density(first_fn, second_fn)
        cc_sigma_bond = cloud_for_density(cc_fn, 2.0, f"{model_id}:cc-sigma")

    lone_pairs = []
    for index, site in enumerate(model["lonePairs"]):
        fn = orbital_cloud(atoms[site["atom"]]["position"], site["direction"], hybridization, 2.0)
        lone_pairs.append({
            "anchorAtom": site["atom"],
            "site": index,
            "cloud": cloud_for_density(fn, 2.0, f"{model_id}:lone-pair:{index}"),
        })

    pi_atomic = []
    pi_bonds = []
    for direction_index, raw_direction in enumerate(model["piDirections"]):
        direction = normalize(raw_direction)
        pair = []
        atom_wavefunctions = []
        for atom_index, atom in enumerate(atoms[:2]):
            center = tuple(float(x) for x in atom["position"])
            wavefunction = lambda point, c=center, d=direction: gaussian_p(point, c, d)
            atom_wavefunctions.append(wavefunction)
            pair.append({
                "anchorAtom": atom_index,
                "site": direction_index,
                "cloud": cloud_for_density(lambda point, f=wavefunction: f(point) ** 2, 1.0, f"{model_id}:pi-ao:{direction_index}:{atom_index}"),
            })
        pi_atomic.append(pair)
        pi_fn = bonding_molecular_orbital_density(atom_wavefunctions[0], atom_wavefunctions[1])
        pi_bonds.append({
            "anchorAtom": None,
            "site": direction_index,
            "cloud": cloud_for_density(pi_fn, 2.0, f"{model_id}:pi-mo:{direction_index}"),
        })

    ligand_lone_pairs = []
    if ligands and ligands[0]["element"] == "F":
        for index, ligand in enumerate(ligands):
            center = tuple(float(x) for x in ligand["position"])
            bond_axis = scale(ligand["direction"], -1.0)
            reference = (1.0, 0.0, 0.0) if abs(bond_axis[0]) < 0.85 else (0.0, 1.0, 0.0)
            axis_a = normalize(cross(bond_axis, reference))
            axis_b = normalize(cross(bond_axis, axis_a))
            fn = lambda point, c=center, a=axis_a, b=axis_b: (
                2.0 * gaussian_2s(point, c) ** 2
                + 2.0 * gaussian_p(point, c, a) ** 2
                + 2.0 * gaussian_p(point, c, b) ** 2
            )
            ligand_lone_pairs.append({
                "anchorAtom": ligand["centralAtom"],
                "site": index,
                "cloud": cloud_for_density(fn, 6.0, f"{model_id}:fluorine-lone-pairs:{index}"),
            })

    return {
        "atomClouds": atom_clouds,
        "ligandAtomClouds": ligand_atom_clouds,
        "hybridSites": hybrid_sites,
        "ligandSites": ligand_sites,
        "sigmaBonds": {"terminal": sigma_bonds, "cc": cc_sigma_bond},
        "sigmaSites": sigma_sites,
        "lonePairs": lone_pairs,
        "piAtomic": pi_atomic,
        "piBonds": pi_bonds,
        "ligandLonePairs": ligand_lone_pairs,
    }


def build_output() -> dict:
    models = json.loads(MODEL_PATH.read_text(encoding="utf-8"))
    density = {model["id"]: make_model_density(model) for model in models}
    return {
        "version": 1,
        "engine": "Python Gaussian-AO / LCAO-inspired educational model",
        "bounds": [-BOUND, BOUND],
        "molecules": models,
        "density": density,
    }


def render_javascript(data: dict) -> str:
    payload = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    return (
        "/* Generated by tools/simulate_orbitals.py from data/orbital-molecule-models.json. */\n"
        "var SCIENCE_LAB_ORBITAL_MODEL_DATA = " + payload + ";\n"
    )


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="fail if the checked-in browser data is stale")
    args = parser.parse_args()
    rendered = render_javascript(build_output())
    if args.check:
        if not OUTPUT_PATH.exists() or OUTPUT_PATH.read_text(encoding="utf-8") != rendered:
            print(f"{OUTPUT_PATH.relative_to(ROOT)} is stale; run python3 tools/simulate_orbitals.py")
            return 1
        print("ORBITAL_SIMULATION_DATA_OK")
        return 0
    OUTPUT_PATH.write_text(rendered, encoding="utf-8")
    print(f"Wrote {OUTPUT_PATH.relative_to(ROOT)} ({len(rendered.encode('utf-8')):,} bytes)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
