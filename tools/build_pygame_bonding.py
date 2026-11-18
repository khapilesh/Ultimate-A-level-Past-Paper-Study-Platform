"""Build the Chemistry Pygame prototype as Vercel-friendly static files.

Install the pinned optional requirements, then run:
    python3 tools/build_pygame_bonding.py

Pygbag's Python/SDL runtime is loaded by the browser from its official 0.9.3
CDN.  This script packages only the app archive, HTML shell and favicon in the
repository; it does not vendor the large CPython/WASM runtime.
"""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
APP_SOURCE = ROOT / "pygame_apps" / "bonding_sandbox"
BUILD_ROOT = ROOT / "build" / "pygame-bonding"
STAGED_APP = BUILD_ROOT / "bonding-sandbox"
WEB_OUTPUT = STAGED_APP / "build" / "web"
STATIC_OUTPUT = ROOT / "runtime" / "pygame" / "bonding-sandbox"
MODEL_DATA = ROOT / "data" / "orbital-molecule-models.json"
TEMPLATE = ROOT / "tools" / "pygbag" / "0.9.3" / "default.tmpl"
ICON = ROOT / "tools" / "pygbag" / "0.9.3" / "favicon.png"
CDN = "https://pygame-web.github.io/cdn/0.9.3/"


def main() -> int:
    for required in (APP_SOURCE / "main.py", APP_SOURCE / "bonding.py", MODEL_DATA, TEMPLATE, ICON):
        if not required.is_file():
            print(f"Missing Pygame build input: {required}", file=sys.stderr)
            return 2

    if shutil.which("ffmpeg") is None:
        print("Note: ffmpeg is not installed; this app has no audio assets, so the Pygbag build can continue without media conversion.")

    if BUILD_ROOT.exists():
        shutil.rmtree(BUILD_ROOT)
    STAGED_APP.mkdir(parents=True)
    shutil.copy2(APP_SOURCE / "main.py", STAGED_APP / "main.py")
    shutil.copy2(APP_SOURCE / "bonding.py", STAGED_APP / "bonding.py")
    shutil.copy2(MODEL_DATA, STAGED_APP / "orbital-molecule-models.json")

    command = [
        sys.executable,
        "-m",
        "pygbag",
        "--build",
        "--no_opt",
        "--PYBUILD",
        "3.12",
        "--width",
        "1280",
        "--height",
        "720",
        "--title",
        "IAL Mastery - Chemistry Bonding Sandbox",
        "--package",
        "org.ialmastery.chemistry.bonding",
        "--cdn",
        CDN,
        "--template",
        str(TEMPLATE),
        "--icon",
        str(ICON),
        str(STAGED_APP),
    ]
    print("Building the browser Pygame app with Pygbag 0.9.3…")
    subprocess.run(command, cwd=ROOT, check=True)

    required_output = [
        WEB_OUTPUT / "index.html",
        WEB_OUTPUT / "bonding-sandbox.tar.gz",
        WEB_OUTPUT / "bonding-sandbox.apk",
        WEB_OUTPUT / "favicon.png",
    ]
    missing = [path for path in required_output if not path.is_file()]
    if missing:
        print("Pygbag did not create the expected static output:", file=sys.stderr)
        for path in missing:
            print(f"  {path}", file=sys.stderr)
        return 3

    STATIC_OUTPUT.mkdir(parents=True, exist_ok=True)
    for source in required_output:
        shutil.copy2(source, STATIC_OUTPUT / source.name)

    print("\nVercel-ready browser app written to runtime/pygame/bonding-sandbox/")
    for source in required_output:
        print(f"  {source.name:24} {source.stat().st_size:>9,} bytes")
    print(f"  Runtime CDN: {CDN}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
