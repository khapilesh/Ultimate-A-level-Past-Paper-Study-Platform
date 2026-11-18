"""Chemistry model state for the browser Pygame bonding sandbox.

The molecule JSON is the shared source of truth used by the existing Canvas
sandbox and by this staged Pygame port.  This module deliberately has no
pygame dependency so its chemistry-state rules can be tested with stdlib only.
"""

from __future__ import annotations

import json
import math
from pathlib import Path
from typing import Any


def _model_file() -> Path:
    """Find the shared model JSON in either the Pygbag bundle or repository."""
    bundled = Path(__file__).resolve().with_name("orbital-molecule-models.json")
    if bundled.is_file():
        return bundled
    repository = Path(__file__).resolve().parents[2] / "data" / "orbital-molecule-models.json"
    if repository.is_file():
        return repository
    raise FileNotFoundError(
        "orbital-molecule-models.json must be bundled beside main.py or kept in data/"
    )


def load_molecules(path: str | Path | None = None) -> dict[str, dict[str, Any]]:
    """Load and validate the seven shared chemistry presets."""
    source = Path(path) if path is not None else _model_file()
    with source.open("r", encoding="utf-8") as handle:
        rows = json.load(handle)
    if not isinstance(rows, list) or not rows:
        raise ValueError("Molecule model data must be a non-empty JSON list")
    molecules: dict[str, dict[str, Any]] = {}
    for model in rows:
        model_id = model.get("id")
        if not model_id or model_id in molecules:
            raise ValueError(f"Molecule model has a missing or duplicate id: {model_id!r}")
        if not model.get("atoms") or "vsepr" not in model:
            raise ValueError(f"Molecule model {model_id!r} is missing atoms or VSEPR data")
        molecules[model_id] = model
    return molecules


def rotate_x(vector: list[float] | tuple[float, ...], degrees: float) -> tuple[float, float, float]:
    """Rotate a 3-D vector around the C–C x-axis."""
    angle = math.radians(degrees)
    cosine, sine = math.cos(angle), math.sin(angle)
    x, y, z = vector
    return (x, y * cosine - z * sine, y * sine + z * cosine)


class BondingSandbox:
    """Mutable interaction state, independent of rendering and input devices."""

    def __init__(
        self,
        molecules: dict[str, dict[str, Any]] | None = None,
        molecule_id: str = "ethene",
    ) -> None:
        self.molecules = molecules or load_molecules()
        self.molecule_id = molecule_id if molecule_id in self.molecules else next(iter(self.molecules))
        self.mode = "build"
        self.hybridised = False
        self.formed_hydrogens: set[int] = set()
        self.sigma_formed = False
        self.pi_formed: set[int] = set()
        self.rotation_degrees = 0.0
        self.attempted_rotation = 0.0
        self.complete = False
        self.message = ""
        self.select_molecule(self.molecule_id)

    @property
    def molecule(self) -> dict[str, Any]:
        return self.molecules[self.molecule_id]

    @property
    def ligand_symbol(self) -> str:
        return self.molecule.get("ligandSymbol") or self.molecule.get("hSymbol") or "H"

    @property
    def hybridisation_label(self) -> str:
        return self.molecule["hybridization"].replace("3", "³").replace("2", "²")

    @property
    def expected_sigma(self) -> int:
        return len(self.molecule["hSites"]) + int(bool(self.molecule.get("ccSigma")))

    @property
    def formed_sigma(self) -> int:
        return len(self.formed_hydrogens) + int(
            bool(self.molecule.get("ccSigma") and self.sigma_formed)
        )

    @property
    def expected_pi(self) -> int:
        return len(self.molecule["piDirections"])

    @property
    def formed_pi(self) -> int:
        return len(self.pi_formed)

    def select_molecule(self, molecule_id: str) -> bool:
        if molecule_id not in self.molecules:
            return False
        self.molecule_id = molecule_id
        self.mode = "build"
        self.hybridised = False
        self.formed_hydrogens = set()
        self.sigma_formed = False
        self.pi_formed = set()
        self.rotation_degrees = 0.0
        self.attempted_rotation = 0.0
        self.complete = False
        self.message = (
            f"{self.molecule['formula']} selected. Hybridise the orbitals, then form the "
            "head-on σ and side-on π overlaps."
        )
        return True

    def hybridise(self) -> bool:
        self.hybridised = True
        self.formed_hydrogens.clear()
        self.sigma_formed = False
        self.pi_formed.clear()
        self.rotation_degrees = 0.0
        self.attempted_rotation = 0.0
        self.complete = False
        self.message = (
            f"{self.hybridisation_label} orbitals are ready. Drag a green hybrid lobe to its "
            "outlined atom to form a σ bond; align matching blue p lobes side-on for π."
        )
        return True

    def set_mode(self, mode: str) -> bool:
        if mode not in {"build", "vsepr", "rotation"}:
            return False
        if mode == "rotation" and not self.molecule.get("ccSigma"):
            self.message = "Choose ethane, ethene or ethyne to explore rotation around a C–C bond."
            return False
        self.mode = mode
        if mode == "vsepr":
            self.message = (
                "Each bonding domain and lone pair occupies space. Lone pairs repel more "
                "strongly, so they can compress the bond angle."
            )
        elif mode == "rotation":
            self.message = self.rotation_explanation()
        return True

    def form_hydrogen(self, index: int) -> bool:
        if (
            not self.hybridised
            or not isinstance(index, int)
            or index < 0
            or index >= len(self.molecule["hSites"])
            or index in self.formed_hydrogens
        ):
            return False
        self.formed_hydrogens.add(index)
        site = self.molecule["hSites"][index]
        central = self.molecule["atoms"][site["atom"]]["element"]
        self.message = (
            f"Head-on overlap makes a {central}–{self.ligand_symbol} σ bond. "
            "Its electron density lies along the internuclear axis."
        )
        self._check_complete()
        return True

    def form_sigma(self) -> bool:
        if (
            not self.hybridised
            or not self.molecule.get("ccSigma")
            or self.sigma_formed
        ):
            return False
        self.sigma_formed = True
        self.message = "The carbon hybrid orbitals overlap head-on to make one C–C σ bond."
        self._check_complete()
        return True

    def form_pi(self, index: int) -> bool:
        if (
            not self.hybridised
            or not isinstance(index, int)
            or index < 0
            or index >= self.expected_pi
            or index in self.pi_formed
        ):
            return False
        if self.molecule.get("ccSigma") and not self.sigma_formed:
            self.message = "Build the head-on C–C σ bond first; the π overlap forms alongside it."
            return False
        if abs(self.rotation_degrees) > 1:
            self.message = (
                "The p orbitals are twisted out of alignment. Return to 0° before their "
                "side-on overlap can form a π bond."
            )
            return False
        self.pi_formed.add(index)
        self.attempted_rotation = 0.0
        self.message = (
            "Side-on p–p overlap has formed a π bond. Parallel p clouds resist rotation."
            if self.formed_pi == self.expected_pi
            else "One side-on p–p overlap is formed. Align the perpendicular pair to build the next π bond."
        )
        self._check_complete()
        return True

    def clear_bonds(self) -> None:
        self.formed_hydrogens.clear()
        self.sigma_formed = False
        self.pi_formed.clear()
        self.rotation_degrees = 0.0
        self.attempted_rotation = 0.0
        self.complete = False
        self.message = f"Bond overlaps cleared. The {self.hybridisation_label} orbital set is ready to build again."

    def set_rotation(self, degrees: float) -> bool:
        if not self.molecule.get("ccSigma"):
            self.message = "Rotation around a C–C bond is available for ethane, ethene and ethyne."
            return False
        value = max(-90.0, min(90.0, float(degrees)))
        if self.pi_formed and self.molecule.get("rotation") == "restricted":
            self.attempted_rotation = value
            self.rotation_degrees = 0.0
            self.message = (
                "Rotation blocked: twisting destroys side-on overlap between the parallel p "
                "orbitals. The σ framework remains; a π overlap must be broken before rotation."
            )
            return False
        self.rotation_degrees = value
        self.attempted_rotation = 0.0
        if abs(value) < 1:
            self.message = "The groups are aligned at 0°. Compare the p-orbital clouds before and after a twist."
        elif self.molecule.get("rotation") == "free":
            self.message = (
                f"The groups are twisted {round(value)}°. A single C–C σ bond keeps its head-on "
                "overlap as the groups rotate."
            )
        elif self.expected_pi:
            self.message = (
                f"The groups are twisted {round(value)}°. The σ bond remains, but the unformed "
                "p clouds no longer line up for π overlap."
            )
        else:
            self.message = f"The groups are twisted {round(value)}° around their C–C σ bond."
        return True

    def rotation_explanation(self) -> str:
        if not self.molecule.get("ccSigma"):
            return "Choose ethane, ethene or ethyne to explore rotation around a C–C bond."
        if self.pi_formed:
            return (
                "The formed π overlap locks the bond axis. Twisting would destroy the side-on "
                "p–p overlap, although the C–C σ framework remains."
            )
        if self.molecule.get("rotation") == "free":
            return (
                "A single C–C σ bond is cylindrically symmetrical. The groups can rotate while "
                "head-on overlap remains."
            )
        return (
            "Before π overlap forms, twist the right-hand atom. The σ bond can remain, but the "
            "parallel p orbitals become misaligned."
        )

    def _check_complete(self) -> None:
        all_terminal = len(self.formed_hydrogens) == len(self.molecule["hSites"])
        cc_ready = not self.molecule.get("ccSigma") or self.sigma_formed
        pi_ready = len(self.pi_formed) == self.expected_pi
        if self.hybridised and all_terminal and cc_ready and pi_ready:
            self.complete = True
            self.message = (
                "All the model’s σ and π overlaps are in place. Compare its molecular shape "
                "and orbital explanation."
            )

    def atom_position(self, index: int) -> tuple[float, float, float]:
        position = self.molecule["atoms"][index]["position"]
        if index == 1 and self.molecule.get("ccSigma") and self.rotation_degrees:
            return rotate_x(position, self.rotation_degrees)
        return tuple(position)

    def site_direction(self, site: dict[str, Any]) -> tuple[float, float, float]:
        direction = site["direction"]
        if site.get("atom") == 1 and self.molecule.get("ccSigma") and self.rotation_degrees:
            return rotate_x(direction, self.rotation_degrees)
        return tuple(direction)

    def pi_direction(self, atom_index: int, direction: list[float] | tuple[float, ...]) -> tuple[float, float, float]:
        if atom_index == 1 and self.molecule.get("ccSigma") and self.rotation_degrees:
            return rotate_x(direction, self.rotation_degrees)
        return tuple(direction)

    def terminal_position(self, index: int) -> tuple[float, float, float]:
        site = self.molecule["hSites"][index]
        direction = self.site_direction(site)
        atom = self.atom_position(site["atom"])
        return tuple(atom[i] + direction[i] * 1.28 for i in range(3))
