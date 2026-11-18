"""Chemistry state tests for the staged Pygame bonding sandbox."""

from __future__ import annotations

import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "pygame_apps" / "bonding_sandbox"))

from bonding import BondingSandbox, load_molecules, rotate_x  # noqa: E402


class BondingSandboxModelTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        cls.molecules = load_molecules(ROOT / "data" / "orbital-molecule-models.json")

    def test_all_shared_presets_are_available_with_vsepr_explanations(self) -> None:
        self.assertEqual(
            set(self.molecules),
            {"methane", "water", "ammonia", "bf3", "ethane", "ethene", "ethyne"},
        )
        for model in self.molecules.values():
            self.assertTrue(model["atoms"])
            self.assertTrue(model["vsepr"]["explanation"])
            self.assertTrue(model["lesson"])

    def test_hybridisation_precedes_sigma_and_pi_interactions(self) -> None:
        game = BondingSandbox(self.molecules, "ethene")
        self.assertFalse(game.form_hydrogen(0))
        self.assertFalse(game.form_sigma())
        self.assertFalse(game.form_pi(0))

        game.hybridise()
        self.assertFalse(game.form_pi(0), "the C–C σ framework must be built before its π overlap")
        self.assertTrue(game.form_sigma())
        self.assertEqual(game.formed_sigma, 1)
        self.assertFalse(game.complete)
        self.assertTrue(game.form_pi(0), "aligned p orbitals form the side-on π overlap")

    def test_pi_overlap_requires_alignment_and_restricts_later_rotation(self) -> None:
        game = BondingSandbox(self.molecules, "ethene")
        game.hybridise()
        game.form_sigma()
        self.assertTrue(game.set_rotation(30))
        self.assertFalse(game.form_pi(0))
        self.assertIn("out of alignment", game.message)

        self.assertTrue(game.set_rotation(0))
        self.assertTrue(game.form_pi(0))
        self.assertEqual(game.formed_pi, 1)
        self.assertFalse(game.set_rotation(-45))
        self.assertEqual(game.rotation_degrees, 0)
        self.assertEqual(game.attempted_rotation, -45)
        self.assertIn("Rotation blocked", game.message)

    def test_ethane_single_sigma_bond_remains_rotatable(self) -> None:
        game = BondingSandbox(self.molecules, "ethane")
        game.hybridise()
        self.assertTrue(game.form_sigma())
        self.assertTrue(game.set_rotation(35))
        self.assertEqual(game.rotation_degrees, 35)
        self.assertEqual(game.attempted_rotation, 0)
        self.assertIn("single C–C σ bond", game.message)
        self.assertNotEqual(game.site_direction(game.molecule["hSites"][3]), tuple(game.molecule["hSites"][3]["direction"]))

    def test_vsepr_models_keep_lone_pairs_and_shape_explanations(self) -> None:
        water = BondingSandbox(self.molecules, "water")
        self.assertTrue(water.set_mode("vsepr"))
        self.assertEqual(len(water.molecule["lonePairs"]), 2)
        self.assertEqual(water.molecule["vsepr"]["shape"], "Bent")
        self.assertIn("lone pairs", water.molecule["vsepr"]["explanation"])

        ammonia = BondingSandbox(self.molecules, "ammonia")
        ammonia.set_mode("vsepr")
        self.assertEqual(len(ammonia.molecule["lonePairs"]), 1)
        self.assertEqual(ammonia.molecule["vsepr"]["angle"], "107°")
        self.assertIn("repel more strongly", ammonia.message)

    def test_triple_bond_builds_one_sigma_and_two_pi_overlaps(self) -> None:
        game = BondingSandbox(self.molecules, "ethyne")
        game.hybridise()
        game.form_sigma()
        self.assertTrue(game.form_pi(0))
        self.assertFalse(game.complete)
        self.assertTrue(game.form_pi(1))
        self.assertTrue(game.form_hydrogen(0))
        self.assertTrue(game.form_hydrogen(1))
        self.assertTrue(game.complete)
        self.assertEqual((game.formed_sigma, game.formed_pi), (3, 2))
        self.assertIn("All the model’s", game.message)

    def test_reset_and_invalid_selection_clear_interaction_state(self) -> None:
        game = BondingSandbox(self.molecules, "ethene")
        game.hybridise()
        game.form_sigma()
        game.form_pi(0)
        self.assertFalse(game.select_molecule("not-a-molecule"))
        self.assertEqual(game.molecule_id, "ethene")
        self.assertTrue(game.select_molecule("water"))
        self.assertFalse(game.hybridised)
        self.assertEqual(game.mode, "build")
        self.assertEqual(game.formed_sigma, 0)
        self.assertEqual(game.formed_pi, 0)
        self.assertFalse(game.set_mode("rotation"))

    def test_x_axis_rotation_preserves_bond_axis_and_vector_length(self) -> None:
        vector = (1.0, 2.0, 3.0)
        rotated = rotate_x(vector, 90)
        self.assertAlmostEqual(rotated[0], 1.0)
        self.assertAlmostEqual(rotated[1], -3.0)
        self.assertAlmostEqual(rotated[2], 2.0)
        self.assertAlmostEqual(sum(component**2 for component in vector), sum(component**2 for component in rotated))


if __name__ == "__main__":
    unittest.main()
