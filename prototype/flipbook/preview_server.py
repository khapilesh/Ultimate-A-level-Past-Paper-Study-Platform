"""Tiny preview-only server: serve the prototype at / and existing data at /js/."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

PROTOTYPE = Path(__file__).resolve().parent
REPOSITORY = PROTOTYPE.parents[1]


class PrototypeHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        requested = urlsplit(path).path
        if requested in ("/", "/index.html"):
            return str(PROTOTYPE / "index.html")
        if requested in ("/style.css", "/app.js"):
            return str(PROTOTYPE / requested.lstrip("/"))
        return str(REPOSITORY / requested.lstrip("/"))


if __name__ == "__main__":
    ThreadingHTTPServer(("0.0.0.0", 8003), PrototypeHandler).serve_forever()
