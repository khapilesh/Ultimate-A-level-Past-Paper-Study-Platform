"""Browser-ready Pygame-ce renderer for the Chemistry Bonding Sandbox.

Run natively with ``python main.py`` or package this folder with Pygbag.  The
main website keeps the original Canvas version available while this Python / WebAssembly prototype is play-tested.
"""

from __future__ import annotations

import asyncio
import math
from typing import Any

import pygame

from bonding import BondingSandbox, load_molecules


WIDTH, HEIGHT = 1280, 720
FPS = 60

PAPER = (244, 240, 230)
CARD = (255, 253, 247)
PANEL = (248, 246, 238)
INK = (39, 58, 46)
MUTED = (99, 109, 96)
SOFT = (132, 140, 125)
BORDER = (218, 211, 196)
FOREST = (48, 93, 62)
GREEN = (73, 137, 88)
GREEN_LIGHT = (133, 183, 131)
GREEN_PALE = (224, 237, 218)
BLUE = (75, 130, 157)
BLUE_PALE = (218, 234, 238)
AMBER = (191, 127, 53)
AMBER_PALE = (245, 231, 198)
RED = (162, 77, 59)
WHITE = (255, 255, 255)

ELEMENT_COLOURS = {
    "C": ((60, 125, 83), (42, 88, 57)),
    "O": ((195, 101, 77), (145, 66, 48)),
    "N": ((77, 130, 157), (48, 91, 111)),
    "B": ((190, 137, 58), (138, 93, 34)),
    "F": ((123, 151, 101), (75, 105, 69)),
    "H": ((255, 250, 239), (180, 133, 74)),
}
MOLECULE_ORDER = ["methane", "water", "ammonia", "bf3", "ethane", "ethene", "ethyne"]


def add(a: tuple[float, ...], b: tuple[float, ...], amount: float = 1.0) -> tuple[float, float, float]:
    return (a[0] + b[0] * amount, a[1] + b[1] * amount, a[2] + b[2] * amount)


def scale_vector(vector: tuple[float, ...], amount: float) -> tuple[float, float, float]:
    return (vector[0] * amount, vector[1] * amount, vector[2] * amount)


class BondingGame:
    """Pygame drawing and input layer for :class:`BondingSandbox`."""

    def __init__(self, pygame_module: Any = pygame) -> None:
        self.pg = pygame_module
        self.model = BondingSandbox(load_molecules())
        self.screen_width, self.screen_height = WIDTH, HEIGHT
        self.camera_yaw = -0.38
        self.camera_pitch = 0.24
        self.zoom = 1.0
        self.ui_buttons: list[tuple[pygame.Rect, str, Any, bool]] = []
        self.hit_regions: list[dict[str, Any]] = []
        self.view_rect = pygame.Rect(0, 0, 0, 0)
        self.rotation_slider = pygame.Rect(0, 0, 0, 0)
        self.active_slider: str | None = None
        self.pointer_drag: dict[str, Any] | None = None
        self.pointer_point = (0, 0)
        self.dirty = True
        self._fonts: dict[tuple[int, bool], pygame.font.Font] = {}

    def font(self, size: int, bold: bool = False) -> pygame.font.Font:
        key = (size, bold)
        if key not in self._fonts:
            self._fonts[key] = self.pg.font.SysFont("dejavusans", size, bold=bold)
        return self._fonts[key]

    def text(
        self,
        surface: pygame.Surface,
        value: str,
        position: tuple[int, int],
        size: int = 14,
        colour: tuple[int, int, int] = INK,
        bold: bool = False,
        align: str = "left",
    ) -> pygame.Rect:
        rendered = self.font(size, bold).render(str(value), True, colour)
        rect = rendered.get_rect()
        if align == "center":
            rect.center = position
        elif align == "right":
            rect.topright = position
        else:
            rect.topleft = position
        surface.blit(rendered, rect)
        return rect

    def wrapped_text(
        self,
        surface: pygame.Surface,
        value: str,
        rect: pygame.Rect,
        size: int = 13,
        colour: tuple[int, int, int] = MUTED,
        bold: bool = False,
        line_gap: int = 3,
        max_lines: int | None = None,
    ) -> int:
        font = self.font(size, bold)
        lines: list[str] = []
        for paragraph in str(value).split("\n"):
            current = ""
            for word in paragraph.split():
                candidate = word if not current else current + " " + word
                if current and font.size(candidate)[0] > rect.width:
                    lines.append(current)
                    current = word
                else:
                    current = candidate
            lines.append(current)
        y = rect.y
        height = font.get_linesize() + line_gap
        for line in lines[:max_lines]:
            if y + height > rect.bottom:
                break
            self.text(surface, line, (rect.x, y), size, colour, bold)
            y += height
        return y

    @staticmethod
    def rounded_rect(
        surface: pygame.Surface,
        rect: pygame.Rect,
        fill: tuple[int, int, int],
        border: tuple[int, int, int] | None = None,
        radius: int = 9,
        border_width: int = 1,
    ) -> None:
        pygame.draw.rect(surface, fill, rect, border_radius=radius)
        if border:
            pygame.draw.rect(surface, border, rect, border_width, border_radius=radius)

    def add_button(
        self,
        surface: pygame.Surface,
        rect: pygame.Rect,
        label: str,
        action: str,
        payload: Any = None,
        *,
        selected: bool = False,
        disabled: bool = False,
        primary: bool = False,
        small: bool = False,
    ) -> None:
        if disabled:
            fill, edge, colour = (239, 236, 226), BORDER, SOFT
        elif primary or selected:
            fill, edge, colour = FOREST, FOREST, CARD
        else:
            fill, edge, colour = CARD, BORDER, INK
        self.rounded_rect(surface, rect, fill, edge, 7)
        self.text(surface, label, rect.center, 12 if small else 13, colour, True, "center")
        self.ui_buttons.append((rect.copy(), action, payload, disabled))

    def add_hit_region(
        self,
        kind: str,
        index: int,
        atom: int,
        direction: int | None,
        point: tuple[float, float],
        radius: float,
    ) -> None:
        self.hit_regions.append(
            {"type": kind, "id": index, "atom": atom, "direction": direction,
             "x": point[0], "y": point[1], "radius": radius}
        )

    def project(self, vector: tuple[float, ...], area: pygame.Rect) -> tuple[float, float, float]:
        cy, sy = math.cos(self.camera_yaw), math.sin(self.camera_yaw)
        cp, sp = math.cos(self.camera_pitch), math.sin(self.camera_pitch)
        x, y, z = vector
        rotated_x = x * cy + z * sy
        rotated_z = -x * sy + z * cy
        rotated_y = y * cp - rotated_z * sp
        depth = y * sp + rotated_z * cp
        scale = min(area.width * 0.235, area.height * 0.35) * self.zoom
        perspective = 2.8 / (2.8 + depth * 0.11)
        return (
            area.centerx + rotated_x * scale * perspective,
            area.centery - rotated_y * scale * perspective,
            depth,
        )

    def draw_lobe(
        self,
        surface: pygame.Surface,
        area: pygame.Rect,
        centre: tuple[float, ...],
        axis: tuple[float, ...],
        colour: tuple[int, int, int],
        *,
        major: int = 42,
        minor: int = 22,
        alpha: int = 112,
    ) -> tuple[float, float]:
        p = self.project(centre, area)
        q = self.project(add(centre, axis, 0.25), area)
        angle = math.degrees(math.atan2(q[1] - p[1], q[0] - p[0]))
        base = self.pg.Surface((major * 2 + 4, minor * 2 + 4), self.pg.SRCALPHA)
        self.pg.draw.ellipse(base, (*colour, alpha), base.get_rect())
        edge = tuple(max(0, int(component * 0.73)) for component in colour)
        self.pg.draw.ellipse(base, (*edge, min(220, alpha + 45)), base.get_rect(), 2)
        rotated = self.pg.transform.rotate(base, -angle)
        target = rotated.get_rect(center=(round(p[0]), round(p[1])))
        surface.blit(rotated, target)
        return p[0], p[1]

    def draw_arrow(self, surface: pygame.Surface, start: tuple[int, int], end: tuple[int, int], colour: tuple[int, int, int]) -> None:
        pygame.draw.line(surface, colour, start, end, 2)
        angle = math.atan2(end[1] - start[1], end[0] - start[0])
        head = 8
        left = (end[0] - head * math.cos(angle - 0.52), end[1] - head * math.sin(angle - 0.52))
        right = (end[0] - head * math.cos(angle + 0.52), end[1] - head * math.sin(angle + 0.52))
        pygame.draw.polygon(surface, colour, [end, left, right])

    def draw_atom(
        self,
        surface: pygame.Surface,
        point: tuple[float, float],
        symbol: str,
        label: str,
        central: bool,
        target: bool = False,
    ) -> None:
        fill, edge = ELEMENT_COLOURS.get(symbol, ELEMENT_COLOURS["H"])
        radius = 23 if central else 15
        center = (round(point[0]), round(point[1]))
        if target:
            pygame.draw.circle(surface, AMBER, center, radius + 7, 2)
            pygame.draw.circle(surface, AMBER_PALE, center, radius + 4, 1)
        pygame.draw.circle(surface, edge, (center[0] + 1, center[1] + 2), radius + 1)
        pygame.draw.circle(surface, fill, center, radius)
        if central:
            pygame.draw.circle(surface, (255, 255, 255), (center[0] - 7, center[1] - 8), 3)
        self.text(surface, symbol, center, 15 if central else 12, CARD if central else INK, True, "center")
        self.text(surface, label, (center[0], center[1] + radius + 5), 10, MUTED, True, "center")

    def draw_unhybridised(self, surface: pygame.Surface, area: pygame.Rect) -> None:
        axes = [
            ((1.0, 0.0, 0.0), GREEN, "2pₓ"),
            ((0.0, 1.0, 0.0), AMBER, "2pᵧ"),
            ((0.0, 0.0, 1.0), BLUE, "2p_z"),
        ]
        for atom_index, atom in enumerate(self.model.molecule["atoms"]):
            centre = self.model.atom_position(atom_index)
            point = self.project(centre, area)
            radius = max(24, round(min(area.width, area.height) * 0.075))
            pygame.draw.circle(surface, (242, 227, 187), (round(point[0]), round(point[1])), radius, 2)
            self.text(surface, "2s", (round(point[0] + radius * 0.7), round(point[1] - radius * 0.7)), 10, AMBER, True)
            for axis, colour, label in axes:
                for sign in (-1, 1):
                    direction = scale_vector(axis, sign)
                    cloud_centre = add(centre, axis, 0.39 * sign)
                    at = self.draw_lobe(surface, area, cloud_centre, direction, colour, major=31, minor=17, alpha=82)
                    if sign > 0:
                        self.text(surface, label, (round(at[0] + 10), round(at[1] - 15)), 9, colour, True)

    def draw_domain(
        self,
        surface: pygame.Surface,
        area: pygame.Rect,
        atom_index: int,
        direction: tuple[float, ...],
        lone_pair: bool,
        label: str,
    ) -> None:
        centre = self.model.atom_position(atom_index)
        cloud_centre = add(centre, direction, 0.52)
        colour = AMBER if lone_pair else GREEN
        point = self.draw_lobe(
            surface, area, cloud_centre, direction, colour,
            major=35, minor=21, alpha=112,
        )
        origin = self.project(add(centre, direction, 0.18), area)
        arrow_end = self.project(add(centre, direction, 0.38), area)
        self.draw_arrow(
            surface,
            (round(origin[0]), round(origin[1])),
            (round(arrow_end[0]), round(arrow_end[1])),
            AMBER if lone_pair else GREEN,
        )
        if lone_pair:
            pygame.draw.circle(surface, INK, (round(point[0] - 5), round(point[1])), 2)
            pygame.draw.circle(surface, INK, (round(point[0] + 5), round(point[1])), 2)
        self.text(surface, label, (round(point[0]), round(point[1] - 30)), 9, colour, True, "center")

    def draw_model(self, surface: pygame.Surface, area: pygame.Rect) -> None:
        model = self.model.molecule
        state = self.model
        atoms = [self.project(state.atom_position(i), area) for i in range(len(model["atoms"]))]
        self.hit_regions = []
        previous_clip = surface.get_clip()
        surface.set_clip(area.clip(previous_clip))
        pygame.draw.rect(surface, (251, 249, 242), area, border_radius=8)
        pygame.draw.rect(surface, BORDER, area, 1, border_radius=8)
        self.text(surface, f"3D ORBITAL MODEL  ·  {model['formula']}", (area.x + 18, area.y + 14), 12, FOREST, True)
        guide = (
            "DRAG DOMAINS TO ORBIT" if state.mode == "vsepr"
            else "DRAG EMPTY SPACE TO ORBIT  ·  ARROWS ALSO WORK"
        )
        self.text(surface, guide, (area.right - 18, area.y + 16), 9, SOFT, True, "right")

        if state.mode == "vsepr":
            for index, site in enumerate(model["hSites"]):
                self.draw_domain(surface, area, site["atom"], state.site_direction(site), False, "bond")
            for site in model["sigmaDirections"]:
                self.draw_domain(surface, area, site["atom"], state.site_direction(site), False, "bond")
            for index, site in enumerate(model["lonePairs"]):
                direction = tuple(site["direction"])
                self.draw_domain(surface, area, site["atom"], direction, True, "LP")
        elif not state.hybridised:
            self.draw_unhybridised(surface, area)
        else:
            for index, site in enumerate(model["hSites"]):
                centre = state.atom_position(site["atom"])
                direction = state.site_direction(site)
                end = state.terminal_position(index)
                terminal = self.project(end, area)
                origin = atoms[site["atom"]]
                if index in state.formed_hydrogens:
                    pygame.draw.line(surface, GREEN, origin[:2], terminal[:2], 4)
                else:
                    cloud = add(centre, direction, 0.52)
                    point = self.draw_lobe(surface, area, cloud, direction, GREEN, major=38, minor=19, alpha=142)
                    self.add_hit_region("sigma-site", index, site["atom"], None, point, 32)
            if model.get("ccSigma"):
                if state.sigma_formed:
                    pygame.draw.line(surface, GREEN, atoms[0][:2], atoms[1][:2], 5)
                    midpoint = ((atoms[0][0] + atoms[1][0]) / 2, (atoms[0][1] + atoms[1][1]) / 2)
                    self.text(surface, "σ", (round(midpoint[0]), round(midpoint[1] - 13)), 14, FOREST, True, "center")
                else:
                    for site in model["sigmaDirections"]:
                        direction = state.site_direction(site)
                        cloud = add(state.atom_position(site["atom"]), direction, 0.53)
                        point = self.draw_lobe(surface, area, cloud, direction, GREEN, major=40, minor=20, alpha=146)
                        self.add_hit_region("cc-site", site["atom"], site["atom"], None, point, 34)
            for site in model["lonePairs"]:
                centre = state.atom_position(site["atom"])
                direction = tuple(site["direction"])
                point = self.draw_lobe(surface, area, add(centre, direction, 0.49), direction, AMBER, major=36, minor=20, alpha=126)
                pygame.draw.circle(surface, INK, (round(point[0] - 5), round(point[1])), 2)
                pygame.draw.circle(surface, INK, (round(point[0] + 5), round(point[1])), 2)
                self.text(surface, "LP", (round(point[0]), round(point[1] - 28)), 9, AMBER, True, "center")
            for direction_index, raw_direction in enumerate(model["piDirections"]):
                if direction_index in state.pi_formed:
                    cc_axis = (1.0, 0.0, 0.0)
                    midpoint_world = (0.0, 0.0, 0.0)
                    major = max(50, round(abs(atoms[1][0] - atoms[0][0]) * 0.5 + 28))
                    for sign in (-1, 1):
                        direction = state.pi_direction(1, raw_direction)
                        cloud_centre = add(midpoint_world, direction, 0.37 * sign)
                        self.draw_lobe(surface, area, cloud_centre, cc_axis, BLUE, major=major, minor=25, alpha=92)
                    mid = ((atoms[0][0] + atoms[1][0]) / 2, (atoms[0][1] + atoms[1][1]) / 2)
                    self.text(surface, "π", (round(mid[0]), round(mid[1] - 36 - direction_index * 11)), 13, BLUE, True, "center")
                else:
                    for atom_index in range(len(model["atoms"])):
                        direction = state.pi_direction(atom_index, raw_direction)
                        centre = state.atom_position(atom_index)
                        for sign in (-1, 1):
                            lobe_direction = scale_vector(direction, sign)
                            cloud = add(centre, lobe_direction, 0.38)
                            point = self.draw_lobe(surface, area, cloud, lobe_direction, BLUE, major=35, minor=20, alpha=122)
                            self.add_hit_region("pi-cloud", direction_index, atom_index, direction_index, point, 30)

        # Atom labels are drawn last so orbital lobes never obscure the nuclei.
        for index, atom in enumerate(model["atoms"]):
            point = atoms[index]
            self.draw_atom(surface, point[:2], atom["element"], f"{atom['element']}{index + 1}", True)
            self.add_hit_region("central-atom", index, index, None, point[:2], 27)
        for index, site in enumerate(model["hSites"]):
            symbol = state.ligand_symbol
            point = self.project(state.terminal_position(index), area)
            target = state.hybridised and index not in state.formed_hydrogens and state.mode == "build"
            self.draw_atom(surface, point[:2], symbol, f"{symbol}{index + 1}", False, target)
            if target:
                self.add_hit_region("h-target", index, site["atom"], None, point[:2], 24)

        if self.pointer_drag and self.pointer_drag.get("type") != "camera":
            start = (round(self.pointer_drag["x"]), round(self.pointer_drag["y"]))
            end = self.pointer_point
            tint = BLUE if self.pointer_drag["type"] == "pi-cloud" else GREEN
            pygame.draw.line(surface, tint, start, end, 3)
            pygame.draw.circle(surface, CARD, end, 8)
            pygame.draw.circle(surface, AMBER, end, 8, 2)
        if state.attempted_rotation and model.get("rotation") == "restricted":
            badge = pygame.Rect(area.right - 203, area.y + 48, 185, 25)
            self.rounded_rect(surface, badge, RED, RED, 5)
            self.text(surface, "π OVERLAP  ·  ROTATION LOCKED", badge.center, 9, CARD, True, "center")
        surface.set_clip(previous_clip)

    def _panel_button(self, surface: pygame.Surface, rect: pygame.Rect, label: str, action: str, payload: Any = None, **kwargs: Any) -> None:
        self.add_button(surface, rect, label, action, payload, **kwargs)

    def draw_header(self, surface: pygame.Surface) -> None:
        self.text(surface, "CHEMISTRY  /  BONDING LAB", (24, 17), 12, FOREST, True)
        self.text(surface, "Orbitals in motion", (24, 35), 24, INK, True)
        self.text(surface, "HYBRIDISE  ·  OVERLAP  ·  TEST MOLECULAR SHAPE", (338, 48), 11, MUTED, True)
        badge = pygame.Rect(self.screen_width - 250, 22, 226, 31)
        self.rounded_rect(surface, badge, GREEN_PALE, BORDER, 15)
        self.text(surface, "PYTHON  ·  PYGAME-CE  ·  WEB", badge.center, 10, FOREST, True, "center")

    def draw_molecule_picker(self, surface: pygame.Surface) -> None:
        x, y, width, height = 22, 87, self.screen_width - 44, 59
        picker = pygame.Rect(x, y, width, height)
        self.rounded_rect(surface, picker, CARD, BORDER, 10)
        self.text(surface, "MOLECULE", (x + 13, y + 8), 9, MUTED, True)
        gap = 6
        row_x = x + 106
        available = picker.right - row_x - 12
        button_width = (available - gap * (len(MOLECULE_ORDER) - 1)) // len(MOLECULE_ORDER)
        for i, molecule_id in enumerate(MOLECULE_ORDER):
            model = self.model.molecules[molecule_id]
            rect = pygame.Rect(row_x + i * (button_width + gap), y + 8, button_width, 43)
            selected = molecule_id == self.model.molecule_id
            self.add_button(surface, rect, model["formula"], "select_molecule", molecule_id, selected=selected)
            label = model["name"]
            self.text(surface, label, (rect.centerx, y + 37), 8, CARD if selected else MUTED, False, "center")

    def draw_stage(self, surface: pygame.Surface, stage: pygame.Rect) -> None:
        self.rounded_rect(surface, stage, CARD, BORDER, 11)
        model = self.model.molecule
        self.text(surface, "ORBITAL WORKBENCH", (stage.x + 17, stage.y + 14), 10, MUTED, True)
        self.text(surface, model["name"], (stage.x + 17, stage.y + 30), 19, INK, True)
        badge = pygame.Rect(stage.x + 17, stage.y + 58, 116, 23)
        badge_text = "MODEL COMPLETE" if self.model.complete else ("BUILD MODE" if self.model.mode == "build" else "VSEPR VIEW" if self.model.mode == "vsepr" else "ROTATION TEST")
        badge_colour = GREEN_PALE if self.model.complete else PANEL
        self.rounded_rect(surface, badge, badge_colour, BORDER, 11)
        self.text(surface, badge_text, badge.center, 9, FOREST, True, "center")
        zoom_y = stage.y + 17
        self.add_button(surface, pygame.Rect(stage.right - 150, zoom_y, 32, 27), "−", "zoom", -0.08, small=True)
        self.add_button(surface, pygame.Rect(stage.right - 112, zoom_y, 67, 27), "Reset view", "camera_reset", small=True)
        self.add_button(surface, pygame.Rect(stage.right - 39, zoom_y, 27, 27), "+", "zoom", 0.08, small=True)
        view = pygame.Rect(stage.x + 13, stage.y + 89, stage.width - 26, stage.height - 174)
        self.view_rect = view
        self.draw_model(surface, view)
        status_rect = pygame.Rect(stage.x + 15, stage.bottom - 73, stage.width - 30, 60)
        status_fill = AMBER_PALE if self.model.attempted_rotation else GREEN_PALE
        self.rounded_rect(surface, status_rect, status_fill, BORDER, 8)
        title = "STATUS  ·  π ROTATION BLOCKED" if self.model.attempted_rotation else "STATUS  ·  LEARNING AS YOU BUILD"
        self.text(surface, title, (status_rect.x + 12, status_rect.y + 8), 9, RED if self.model.attempted_rotation else FOREST, True)
        self.wrapped_text(
            surface,
            self.model.message,
            pygame.Rect(status_rect.x + 12, status_rect.y + 25, status_rect.width - 24, 30),
            11,
            INK,
            max_lines=2,
        )
        self.text(surface, "Conceptual shapes · not to scale", (stage.x + 16, stage.bottom - 9), 8, SOFT)

    def draw_mode_tabs(self, surface: pygame.Surface, panel: pygame.Rect) -> int:
        x, y = panel.x + 15, panel.y + 52
        gap = 5
        width = (panel.width - 30 - gap * 2) // 3
        options = [("build", "BUILD"), ("vsepr", "SHAPE"), ("rotation", "ROTATE")]
        for i, (mode, label) in enumerate(options):
            rect = pygame.Rect(x + i * (width + gap), y, width, 33)
            unavailable = mode == "rotation" and not self.model.molecule.get("ccSigma")
            self.add_button(surface, rect, label, "mode", mode, selected=self.model.mode == mode, disabled=unavailable, small=True)
        return y + 46

    def draw_build_panel(self, surface: pygame.Surface, panel: pygame.Rect, y: int) -> None:
        x = panel.x + 16
        width = panel.width - 32
        model = self.model.molecule
        self.text(surface, "STEP 1  ·  HYBRIDISE", (x, y), 9, MUTED, True)
        orbital_text = {
            "sp": "1 s + 1 p orbital",
            "sp2": "1 s + 2 p orbitals",
            "sp3": "1 s + 3 p orbitals",
        }[model["hybridization"]]
        self.text(surface, f"{orbital_text} combine on each central atom.", (x, y + 15), 11, INK)
        hybrid_rect = pygame.Rect(x, y + 34, width, 38)
        self.add_button(
            surface,
            hybrid_rect,
            f"{'REBUILD' if self.model.hybridised else 'MAKE'} {self.model.hybridisation_label} ORBITALS",
            "hybridise",
            primary=True,
        )
        group_y = y + 83
        self.text(surface, "STEP 2  ·  FORM THE BONDS", (x, group_y), 9, MUTED, True)
        self.text(surface, "Drag clouds together or use a button.", (x, group_y + 14), 10, MUTED)
        actions: list[tuple[str, str, Any, bool]] = []
        if model.get("ccSigma"):
            actions.append(("C–C σ", "form_sigma", None, self.model.sigma_formed))
        for index, site in enumerate(model["hSites"]):
            central = model["atoms"][site["atom"]]["element"]
            actions.append((f"{central}–{self.model.ligand_symbol} σ {index + 1}", "form_h", index, index in self.model.formed_hydrogens))
        for index in range(len(model["piDirections"])):
            actions.append((f"π overlap {index + 1}", "form_pi", index, index in self.model.pi_formed))
        columns = 2
        gap_x = 7
        button_width = (width - gap_x) // columns
        button_height = 31
        gap_y = 5
        for index, (label, action, payload, done) in enumerate(actions):
            col = index % columns
            row = index // columns
            rect = pygame.Rect(
                x + col * (button_width + gap_x),
                group_y + 34 + row * (button_height + gap_y),
                button_width,
                button_height,
            )
            self.add_button(
                surface,
                rect,
                ("✓ " if done else "") + label,
                action,
                payload,
                selected=done,
                disabled=not self.model.hybridised or done,
                small=True,
            )
        rows = math.ceil(len(actions) / columns) if actions else 0
        bottom = group_y + 34 + rows * (button_height + gap_y)
        if self.model.hybridised:
            self.text(surface, f"σ  {self.model.formed_sigma}/{self.model.expected_sigma}     π  {self.model.formed_pi}/{self.model.expected_pi}", (x, bottom + 5), 10, FOREST, True)
            if self.model.formed_sigma or self.model.formed_pi or self.model.formed_hydrogens:
                clear_rect = pygame.Rect(x, bottom + 23, width, 29)
                self.add_button(surface, clear_rect, "Clear formed overlaps", "clear_bonds", small=True)
        else:
            self.wrapped_text(surface, "Build a set of equivalent hybrid orbitals before making any bonds.", pygame.Rect(x, bottom + 3, width, 30), 10, MUTED, max_lines=2)

    def draw_vsepr_panel(self, surface: pygame.Surface, panel: pygame.Rect, y: int) -> None:
        x = panel.x + 16
        width = panel.width - 32
        vsepr = self.model.molecule["vsepr"]
        self.text(surface, "ELECTRON-DOMAIN REPULSION", (x, y), 9, MUTED, True)
        self.text(surface, "Every domain takes up space.", (x, y + 17), 13, INK, True)
        boxes = [
            ("DOMAINS", vsepr["domains"]),
            ("ELECTRON GEOMETRY", vsepr["electronGeometry"]),
            ("MOLECULAR SHAPE", vsepr["shape"]),
            ("TYPICAL BOND ANGLE", vsepr["angle"]),
        ]
        box_y = y + 49
        for index, (label, value) in enumerate(boxes):
            row_y = box_y + index * 56
            rect = pygame.Rect(x, row_y, width, 48)
            self.rounded_rect(surface, rect, PANEL, BORDER, 7)
            self.text(surface, label, (rect.x + 10, rect.y + 7), 8, MUTED, True)
            self.wrapped_text(surface, value, pygame.Rect(rect.x + 10, rect.y + 20, rect.width - 18, 24), 10, INK, True, max_lines=2)
        note_y = box_y + len(boxes) * 56 + 4
        self.text(surface, "WHY THE SHAPE CHANGES", (x, note_y), 9, AMBER, True)
        self.wrapped_text(
            surface,
            vsepr["explanation"],
            pygame.Rect(x, note_y + 18, width, 57),
            10,
            INK,
            max_lines=4,
        )
        self.wrapped_text(
            surface,
            "Lone pairs occupy more space than bonding pairs and repel them more strongly, which can reduce the observed bond angle.",
            pygame.Rect(x, note_y + 83, width, 54),
            10,
            MUTED,
            max_lines=4,
        )

    def draw_rotation_panel(self, surface: pygame.Surface, panel: pygame.Rect, y: int) -> None:
        x = panel.x + 16
        width = panel.width - 32
        model = self.model.molecule
        self.text(surface, "ROTATION AROUND C–C", (x, y), 9, MUTED, True)
        self.text(surface, model["formula"], (x, y + 16), 17, INK, True)
        explanation = self.model.rotation_explanation()
        self.wrapped_text(surface, explanation, pygame.Rect(x, y + 43, width, 67), 11, INK, max_lines=5)
        slider_y = y + 128
        self.text(surface, "ATTEMPTED TWIST", (x, slider_y), 9, MUTED, True)
        self.text(surface, f"{round(self.model.attempted_rotation or self.model.rotation_degrees)}°", (panel.right - 17, slider_y - 2), 14, FOREST, True, "right")
        self.rotation_slider = pygame.Rect(x + 8, slider_y + 26, width - 16, 8)
        pygame.draw.line(surface, BORDER, (self.rotation_slider.left, self.rotation_slider.centery), (self.rotation_slider.right, self.rotation_slider.centery), 5)
        for value in (-90, -45, 0, 45, 90):
            px = self._rotation_x(value)
            pygame.draw.circle(surface, SOFT if value else FOREST, (px, self.rotation_slider.centery), 3 if value else 4)
        knob_x = self._rotation_x(self.model.rotation_degrees)
        pygame.draw.circle(surface, FOREST, (knob_x, self.rotation_slider.centery), 9)
        pygame.draw.circle(surface, CARD, (knob_x, self.rotation_slider.centery), 4)
        self.text(surface, "−90°", (self.rotation_slider.left, slider_y + 41), 9, MUTED)
        self.text(surface, "0° · ALIGNED", (self.rotation_slider.centerx, slider_y + 41), 9, MUTED, True, "center")
        self.text(surface, "+90°", (self.rotation_slider.right, slider_y + 41), 9, MUTED, False, "right")
        step_y = slider_y + 63
        half = (width - 12) // 3
        self.add_button(surface, pygame.Rect(x, step_y, half, 30), "−15°", "rotate_step", -15, small=True)
        self.add_button(surface, pygame.Rect(x + half + 6, step_y, half, 30), "ALIGN 0°", "rotate_step", 0, small=True)
        self.add_button(surface, pygame.Rect(x + 2 * (half + 6), step_y, width - 2 * (half + 6), 30), "+15°", "rotate_step", 15, small=True)
        info_y = step_y + 45
        if model.get("rotation") == "free":
            heading = "SINGLE σ BOND"
            body = "Ethane's C–C σ overlap is cylindrically symmetrical, so the groups can rotate while the head-on overlap remains."
        elif self.model.pi_formed:
            heading = "π OVERLAP LOCKS THE AXIS"
            body = "Twisting the double or triple bond would break the side-on p–p overlap. A π bond must be broken before rotation."
        else:
            heading = "BEFORE π FORMS"
            body = "Twist the atom and compare the p clouds. The σ framework can remain while sideways p-orbital overlap is lost."
        self.text(surface, heading, (x, info_y), 9, BLUE if model.get("rotation") == "restricted" else FOREST, True)
        self.wrapped_text(surface, body, pygame.Rect(x, info_y + 18, width, 67), 10, MUTED, max_lines=4)

    def draw_side_panel(self, surface: pygame.Surface, panel: pygame.Rect) -> None:
        self.rounded_rect(surface, panel, CARD, BORDER, 11)
        self.text(surface, "CHOOSE · BUILD · COMPARE", (panel.x + 16, panel.y + 15), 10, MUTED, True)
        y = self.draw_mode_tabs(surface, panel)
        if self.model.mode == "build":
            self.draw_build_panel(surface, panel, y)
        elif self.model.mode == "vsepr":
            self.draw_vsepr_panel(surface, panel, y)
        else:
            self.draw_rotation_panel(surface, panel, y)
        footer = pygame.Rect(panel.x + 12, panel.bottom - 24, panel.width - 24, 15)
        self.text(surface, "Simplified chemistry model · not to scale", footer.topleft, 8, SOFT)

    def draw(self, surface: pygame.Surface) -> None:
        self.screen_width, self.screen_height = surface.get_size()
        surface.fill(PAPER)
        self.ui_buttons = []
        self.draw_header(surface)
        self.draw_molecule_picker(surface)
        margin, gap = 22, 15
        top, bottom = 158, self.screen_height - 20
        body_height = bottom - top
        available = self.screen_width - 2 * margin - gap
        stage_width = round(available * 0.665)
        stage = pygame.Rect(margin, top, stage_width, body_height)
        panel = pygame.Rect(stage.right + gap, top, self.screen_width - margin - (stage.right + gap), body_height)
        self.draw_stage(surface, stage)
        self.draw_side_panel(surface, panel)
        self.text(surface, "Drag to orbit · arrows move the view · + / − changes model size", (margin + 2, self.screen_height - 10), 8, SOFT)

    def _rotation_x(self, value: float) -> int:
        if self.rotation_slider.width <= 0:
            return 0
        return round(self.rotation_slider.left + (float(value) + 90.0) / 180.0 * self.rotation_slider.width)

    def _set_rotation_from_x(self, x: int) -> None:
        if self.rotation_slider.width <= 0:
            return
        ratio = max(0.0, min(1.0, (x - self.rotation_slider.left) / self.rotation_slider.width))
        self.model.set_rotation(-90.0 + ratio * 180.0)

    def _perform_drag(self, source: dict[str, Any], point: tuple[int, int]) -> None:
        priorities = {"sigma-site": 5, "cc-site": 5, "pi-cloud": 5, "h-target": 4, "central-atom": 1}
        target = None
        best_priority = -1
        best_distance = float("inf")
        for item in self.hit_regions:
            distance = math.hypot(point[0] - item["x"], point[1] - item["y"])
            priority = priorities.get(item["type"], 0)
            if distance <= item["radius"] and (priority > best_priority or (priority == best_priority and distance < best_distance)):
                target, best_priority, best_distance = item, priority, distance
        if not target:
            return
        if source["type"] == "sigma-site" and target["type"] == "h-target" and target["id"] == source["id"]:
            self.model.form_hydrogen(source["id"])
        elif source["type"] == "h-target" and target["type"] == "sigma-site" and target["id"] == source["id"]:
            self.model.form_hydrogen(source["id"])
        elif source["type"] == "cc-site" and target["type"] == "central-atom" and target["atom"] != source["atom"]:
            self.model.form_sigma()
        elif source["type"] == "central-atom" and target["type"] == "cc-site" and target["atom"] != source["atom"]:
            self.model.form_sigma()
        elif source["type"] == "pi-cloud" and target["type"] == "pi-cloud" and target["atom"] != source["atom"] and target["direction"] == source["direction"]:
            self.model.form_pi(source["direction"])
        else:
            self.model.message = "Bring a matching hybrid lobe and atom together, or align the same p-orbital pair side-on."

    def _click_button(self, action: str, payload: Any) -> None:
        if action == "select_molecule":
            self.model.select_molecule(payload)
        elif action == "mode":
            self.model.set_mode(payload)
        elif action == "hybridise":
            self.model.hybridise()
        elif action == "form_h":
            self.model.form_hydrogen(payload)
        elif action == "form_sigma":
            self.model.form_sigma()
        elif action == "form_pi":
            self.model.form_pi(payload)
        elif action == "clear_bonds":
            self.model.clear_bonds()
        elif action == "camera_reset":
            self.camera_yaw, self.camera_pitch, self.zoom = -0.38, 0.24, 1.0
        elif action == "zoom":
            self.zoom = max(0.72, min(1.38, self.zoom + float(payload)))
        elif action == "rotate_step":
            self.model.set_rotation(self.model.rotation_degrees + float(payload))

    def _region_at(self, point: tuple[int, int]) -> dict[str, Any] | None:
        priorities = {"sigma-site": 5, "cc-site": 5, "pi-cloud": 5, "h-target": 4, "central-atom": 1}
        chosen = None
        best_priority = -1
        best_distance = float("inf")
        for region in self.hit_regions:
            distance = math.hypot(point[0] - region["x"], point[1] - region["y"])
            priority = priorities.get(region["type"], 0)
            if distance <= region["radius"] and (priority > best_priority or (priority == best_priority and distance < best_distance)):
                chosen, best_priority, best_distance = region, priority, distance
        return chosen

    def handle_event(self, event: pygame.event.Event) -> bool:
        if event.type == self.pg.QUIT:
            return False
        if event.type == getattr(self.pg, "VIDEORESIZE", -999):
            self.dirty = True
            return True
        if event.type == self.pg.KEYDOWN:
            if event.key == self.pg.K_ESCAPE:
                return False
            if event.key == self.pg.K_LEFT:
                self.camera_yaw -= 0.12
            elif event.key == self.pg.K_RIGHT:
                self.camera_yaw += 0.12
            elif event.key == self.pg.K_UP:
                self.camera_pitch = max(-1.12, self.camera_pitch - 0.1)
            elif event.key == self.pg.K_DOWN:
                self.camera_pitch = min(1.12, self.camera_pitch + 0.1)
            elif event.key in (self.pg.K_PLUS, self.pg.K_EQUALS, self.pg.K_KP_PLUS):
                self.zoom = min(1.38, self.zoom + 0.08)
            elif event.key in (self.pg.K_MINUS, self.pg.K_KP_MINUS):
                self.zoom = max(0.72, self.zoom - 0.08)
            elif event.key == self.pg.K_SPACE and self.model.mode == "build":
                self.model.hybridise()
            elif self.pg.K_1 <= event.key <= self.pg.K_7:
                index = event.key - self.pg.K_1
                self.model.select_molecule(MOLECULE_ORDER[index])
            self.dirty = True
            return True
        if event.type == self.pg.MOUSEBUTTONDOWN:
            point = tuple(event.pos)
            if event.button in (4, 5):
                self.zoom = max(0.72, min(1.38, self.zoom + (0.07 if event.button == 4 else -0.07)))
                self.dirty = True
                return True
            if event.button != 1:
                return True
            for rect, action, payload, disabled in reversed(self.ui_buttons):
                if rect.collidepoint(point):
                    if not disabled:
                        self._click_button(action, payload)
                    self.dirty = True
                    return True
            if self.model.mode == "rotation" and self.rotation_slider.collidepoint(point):
                self.active_slider = "rotation"
                self._set_rotation_from_x(point[0])
                self.dirty = True
                return True
            if self.view_rect.collidepoint(point):
                hit = self._region_at(point) if self.model.mode == "build" else None
                if hit:
                    self.pointer_drag = dict(hit)
                    self.pointer_drag["start"] = point
                else:
                    self.pointer_drag = {"type": "camera", "start": point, "yaw": self.camera_yaw, "pitch": self.camera_pitch}
                self.pointer_point = point
            self.dirty = True
            return True
        if event.type == self.pg.MOUSEMOTION:
            point = tuple(event.pos)
            if self.active_slider == "rotation":
                self._set_rotation_from_x(point[0])
                self.dirty = True
            elif self.pointer_drag:
                self.pointer_point = point
                if self.pointer_drag.get("type") == "camera":
                    start = self.pointer_drag["start"]
                    self.camera_yaw = self.pointer_drag["yaw"] + (point[0] - start[0]) * 0.009
                    self.camera_pitch = max(-1.12, min(1.12, self.pointer_drag["pitch"] + (point[1] - start[1]) * 0.008))
                self.dirty = True
            return True
        if event.type == self.pg.MOUSEBUTTONUP and event.button == 1:
            if self.active_slider == "rotation":
                self.active_slider = None
            elif self.pointer_drag:
                drag = self.pointer_drag
                if drag.get("type") != "camera":
                    self._perform_drag(drag, tuple(event.pos))
                self.pointer_drag = None
            self.dirty = True
            return True
        return True


def make_game() -> BondingGame:
    """Factory kept separate so native smoke tests can inspect the renderer."""
    return BondingGame()


async def main() -> None:
    pygame.init()
    pygame.display.set_caption("Chemistry Bonding Sandbox · Pygame")
    screen = pygame.display.set_mode((WIDTH, HEIGHT))
    clock = pygame.time.Clock()
    game = make_game()
    running = True
    while running:
        for event in pygame.event.get():
            running = game.handle_event(event) and running
        if game.dirty:
            game.draw(screen)
            pygame.display.flip()
            game.dirty = False
        clock.tick(FPS)
        await asyncio.sleep(0)
    pygame.quit()


if __name__ == "__main__":
    asyncio.run(main())
