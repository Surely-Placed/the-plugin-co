"""Export single combined logo matching header/footer Logo component."""
import base64
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ICON = ROOT / "public" / "logo-icon.png"
OUT_SVG = ROOT / "public" / "the-plugin-logo.svg"
OUT_PNG = ROOT / "public" / "the-plugin-logo.png"

b64 = base64.b64encode(ICON.read_bytes()).decode()

svg = f"""<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 520 100" fill="none">
  <title>The Plugin — Marketing and More.</title>
  <image x="0" y="8" width="84" height="72" preserveAspectRatio="xMidYMid meet" xlink:href="data:image/png;base64,{b64}"/>
  <text x="96" y="46" font-family="Montserrat, Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="-0.02em">
    <tspan fill="#4AB1E7">The </tspan><tspan fill="#FFFFFF">Plugin</tspan>
  </text>
  <text x="96" y="72" font-family="Montserrat, Arial, sans-serif" font-size="14" font-weight="500" letter-spacing="0.04em">
    <tspan fill="#6E8C96">Marketing </tspan><tspan fill="#4AB1E7">and More.</tspan>
  </text>
</svg>
"""

OUT_SVG.write_text(svg, encoding="utf-8")
print(f"Wrote {OUT_SVG}")

try:
    from PIL import Image, ImageDraw, ImageFont

    icon = Image.open(ICON).convert("RGBA")
    icon_h = 80
    icon_w = int(icon.width * (icon_h / icon.height))
    icon = icon.resize((icon_w, icon_h), Image.LANCZOS)

    canvas_w = 560
    canvas_h = 110
    canvas = Image.new("RGBA", (canvas_w, canvas_h), (0, 0, 0, 255))
    canvas.paste(icon, (0, 15), icon)

    draw = ImageDraw.Draw(canvas)
    font_paths = [
        "C:/Windows/Fonts/Montserrat-Bold.ttf",
        "C:/Windows/Fonts/arialbd.ttf",
    ]
    sub_font_paths = [
        "C:/Windows/Fonts/Montserrat-Medium.ttf",
        "C:/Windows/Fonts/arial.ttf",
    ]

    title_font = None
    sub_font = None
    for p in font_paths:
        try:
            title_font = ImageFont.truetype(p, 36)
            break
        except OSError:
            continue
    for p in sub_font_paths:
        try:
            sub_font = ImageFont.truetype(p, 14)
            break
        except OSError:
            continue
    title_font = title_font or ImageFont.load_default()
    sub_font = sub_font or ImageFont.load_default()

    x = icon_w + 16
    draw.text((x, 18), "The ", fill="#4AB1E7", font=title_font)
    the_w = draw.textlength("The ", font=title_font)
    draw.text((x + the_w, 18), "Plugin", fill="#FFFFFF", font=title_font)
    draw.text((x, 58), "Marketing ", fill="#6E8C96", font=sub_font)
    m_w = draw.textlength("Marketing ", font=sub_font)
    draw.text((x + m_w, 58), "and More.", fill="#4AB1E7", font=sub_font)

    canvas.save(OUT_PNG, "PNG")
    print(f"Wrote {OUT_PNG}")
except ImportError:
    print("Pillow not available; PNG skipped")
