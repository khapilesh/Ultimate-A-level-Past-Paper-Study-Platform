"""Optional headless draw/input smoke test (requires pygame-ce)."""

from __future__ import annotations

import os
import sys
import unittest
from pathlib import Path

os.environ.setdefault("SDL_VIDEODRIVER", "dummy")
os.environ.setdefault("SDL_AUDIODRIVER", "dummy")

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "pygame_apps" / "bonding_sandbox"))

import pygame  # noqa: E402
from main import HEIGHT, WIDTH, make_game  # noqa: E402


class PygameBondingRenderTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        pygame.init()
        pygame.display.set_mode((WIDTH, HEIGHT))

    @classmethod
    def tearDownClass(cls) -> None:
        pygame.quit()

    def test_render_and_interactive_buttons_cover_build_shape_and_rotation(self) -> None:
        game = make_game()
        surface = pygame.Surface((WIDTH, HEIGHT))
        game.draw(surface)
        self.assertGreater(len(game.ui_buttons), 10)
        self.assertGreater(len(game.hit_regions), 0)
        self.assertEqual(game.model.molecule_id, "ethene")

        def click(action: str, payload=None) -> None:
            game.draw(surface)
            rect = next(
                rect for rect, button_action, button_payload, disabled in game.ui_buttons
                if button_action == action and button_payload == payload and not disabled
            )
            game.handle_event(pygame.event.Event(pygame.MOUSEBUTTONDOWN, {"button": 1, "pos": rect.center}))
            game.draw(surface)

        click("hybridise")
        self.assertTrue(game.model.hybridised)
        click("form_sigma")
        self.assertTrue(game.model.sigma_formed)
        click("form_pi", 0)
        self.assertTrue(game.model.pi_formed)
        click("mode", "rotation")
        self.assertEqual(game.model.mode, "rotation")
        self.assertTrue(game.rotation_slider.width > 0)
        click("mode", "vsepr")
        self.assertEqual(game.model.mode, "vsepr")
        self.assertGreater(len(game.hit_regions), 0, "VSEPR redraws the visible electron-domain clouds")

    def test_mouse_drag_can_form_a_terminal_sigma_bond(self) -> None:
        game = make_game()
        surface = pygame.Surface((WIDTH, HEIGHT))
        game.model.select_molecule("methane")
        game.model.hybridise()
        game.draw(surface)
        source = next(hit for hit in game.hit_regions if hit["type"] == "sigma-site" and hit["id"] == 0)
        target = next(hit for hit in game.hit_regions if hit["type"] == "h-target" and hit["id"] == 0)
        start = (round(source["x"]), round(source["y"]))
        end = (round(target["x"]), round(target["y"]))
        game.handle_event(pygame.event.Event(pygame.MOUSEBUTTONDOWN, {"button": 1, "pos": start}))
        game.handle_event(pygame.event.Event(pygame.MOUSEMOTION, {"pos": end, "rel": (end[0] - start[0], end[1] - start[1]), "buttons": (1, 0, 0)}))
        game.handle_event(pygame.event.Event(pygame.MOUSEBUTTONUP, {"button": 1, "pos": end}))
        self.assertIn(0, game.model.formed_hydrogens)


if __name__ == "__main__":
    unittest.main()
