#!/usr/bin/env python3
"""Checks for the Python Gaussian-AO/LCAO density precomputation."""
from __future__ import annotations

import base64
import importlib.util
import json
import math
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("simulate_orbitals", ROOT / "tools" / "simulate_orbitals.py")
SIM = importlib.util.module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(SIM)


class OrbitalDensitySimulationTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.models = json.loads(SIM.MODEL_PATH.read_text(encoding="utf-8"))
        cls.output = SIM.build_output()

    def test_each_preset_has_reproducible_density_components(self):
        self.assertEqual(set(self.output["density"]), {model["id"] for model in self.models})
        for model in self.models:
            parts = self.output["density"][model["id"]]
            self.assertEqual(len(parts["hybridSites"]), len(model["hSites"]))
            self.assertEqual(len(parts["sigmaBonds"]["terminal"]), len(model["hSites"]))
            self.assertEqual(len(parts["piAtomic"]), len(model["piDirections"]))
            for collection in ("atomClouds", "ligandAtomClouds", "hybridSites", "ligandSites", "sigmaSites", "lonePairs", "piBonds", "ligandLonePairs"):
                for component in parts[collection]:
                    self.assert_valid_cloud(component["cloud"], model["id"], collection)
            for component in parts["sigmaBonds"]["terminal"]:
                self.assert_valid_cloud(component["cloud"], model["id"], "sigma-bond")
            if parts["sigmaBonds"]["cc"]:
                self.assert_valid_cloud(parts["sigmaBonds"]["cc"], model["id"], "C-C sigma")
            for pair in parts["piAtomic"]:
                self.assertEqual(len(pair), 2)
                for component in pair:
                    self.assert_valid_cloud(component["cloud"], model["id"], "pi atomic orbital")
            for component in parts["piBonds"]:
                self.assert_valid_cloud(component["cloud"], model["id"], "pi bond")

    def test_atomic_and_bonding_orbitals_have_qualitative_nodes(self):
        origin = (0.0, 0.0, 0.0)
        plus = (0.0, 0.0, 0.6)
        minus = (0.0, 0.0, -0.6)
        p_plus = SIM.gaussian_p(plus, origin, (0.0, 0.0, 1.0))
        p_minus = SIM.gaussian_p(minus, origin, (0.0, 0.0, 1.0))
        self.assertAlmostEqual(SIM.gaussian_p(origin, origin, (0.0, 0.0, 1.0)), 0.0)
        self.assertGreater(p_plus, 0.0)
        self.assertAlmostEqual(p_plus, -p_minus)

        ethene = next(model for model in self.models if model["id"] == "ethene")
        centers = [tuple(atom["position"]) for atom in ethene["atoms"]]
        axis = ethene["piDirections"][0]
        def pi_density(z):
            point = (0.0, 0.0, z)
            psi = sum(SIM.gaussian_p(point, center, axis) for center in centers)
            return 2.0 * (psi / math.sqrt(2.0)) ** 2
        self.assertAlmostEqual(pi_density(0.0), 0.0, places=8, msg="a pi orbital has a nodal plane through the nuclei")
        self.assertGreater(pi_density(0.55), 0.0)
        self.assertAlmostEqual(pi_density(0.55), pi_density(-0.55), places=8)

    def test_sigma_bonding_mo_adds_density_between_nuclei(self):
        left = lambda point: SIM.gaussian_s(point, (-0.66, 0.0, 0.0))
        right = lambda point: SIM.gaussian_s(point, (0.66, 0.0, 0.0))
        midpoint = (0.0, 0.0, 0.0)
        isolated_atoms = left(midpoint) ** 2 + right(midpoint) ** 2
        bonded_density = SIM.bonding_molecular_orbital_density(left, right)(midpoint)
        self.assertGreater(bonded_density, isolated_atoms)

    def test_hybrid_coefficients_are_normalized(self):
        for hybridization in ("sp", "sp2", "sp3"):
            c_s, c_p = SIM.hybrid_coefficients(hybridization)
            self.assertAlmostEqual(c_s * c_s + c_p * c_p, 1.0)

    def test_checked_in_browser_data_matches_python_output(self):
        expected = SIM.render_javascript(self.output)
        self.assertEqual(SIM.OUTPUT_PATH.read_text(encoding="utf-8"), expected)

    def assert_valid_cloud(self, cloud, molecule_id, component):
        raw = base64.b64decode(cloud["packed"])
        self.assertGreater(cloud["samples"], 0, f"{molecule_id} {component} should contain sampled density")
        self.assertEqual(len(raw), cloud["samples"] * 4)
        self.assertGreater(cloud["electrons"], 0)
        self.assertTrue(any(raw[3::4]), f"{molecule_id} {component} should have non-zero density weights")


if __name__ == "__main__":
    unittest.main(verbosity=2)
