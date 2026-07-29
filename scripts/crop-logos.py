"""Crop logo PNGs to visible content (removes large square canvas padding)."""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = ROOT / "public"
OUT_DIR = ROOT / "public" / "logos"
NAMES = ("2.png", "3.png", "4.png", "5.png")
PADDING = 12


def crop_logo(path: Path, out: Path) -> tuple[tuple[int, int], tuple[int, int]]:
    im = Image.open(path).convert("RGBA")
    bbox = im.getbbox()
    if not bbox:
        raise ValueError(f"No visible content in {path}")

    left, top, right, bottom = bbox
    left = max(0, left - PADDING)
    top = max(0, top - PADDING)
    right = min(im.width, right + PADDING)
    bottom = min(im.height, bottom + PADDING)

    cropped = im.crop((left, top, right, bottom))
    out.parent.mkdir(parents=True, exist_ok=True)
    cropped.save(out, optimize=True)
    return im.size, cropped.size


def main() -> None:
    for name in NAMES:
        src = SRC_DIR / name
        dst = OUT_DIR / name
        original, cropped = crop_logo(src, dst)
        print(f"{name}: {original[0]}x{original[1]} -> {cropped[0]}x{cropped[1]} -> {dst}")


if __name__ == "__main__":
    main()
