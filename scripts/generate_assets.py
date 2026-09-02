#!/usr/bin/env python3
"""
OVIZai asset generator — creates og-image.png, logo.png, apple-touch-icon.png
using only Python stdlib (struct + zlib). No Pillow needed.
"""

import struct
import zlib
import os

# ── helpers ─────────────────────────────────────────────────────────────────

def png_chunk(tag: bytes, data: bytes) -> bytes:
    c = zlib.crc32(tag + data) & 0xFFFFFFFF
    return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", c)

def write_png(path: str, width: int, height: int, rows_rgba: list[bytes]):
    """rows_rgba: list of height raw RGBA rows, each width*4 bytes."""
    ihdr = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
    # Filter type 0 (None) prepended to each row
    raw = b"".join(b"\x00" + row for row in rows_rgba)
    idat = zlib.compress(raw, 9)
    data = (
        b"\x89PNG\r\n\x1a\n"
        + png_chunk(b"IHDR", ihdr)
        + png_chunk(b"IDAT", idat)
        + png_chunk(b"IEND", b"")
    )
    with open(path, "wb") as f:
        f.write(data)
    print(f"  Wrote {path}  ({os.path.getsize(path)//1024} KB)")

def rgba(r, g, b, a=255):
    return bytes([r, g, b, a])

def lerp(a, b, t):
    return int(a + (b - a) * t)

def lerp_color(c1, c2, t):
    return (lerp(c1[0],c2[0],t), lerp(c1[1],c2[1],t), lerp(c1[2],c2[2],t))

# ── text rasteriser (tiny bitmap font, only ASCII subset we need) ────────────
# 5×7 pixel font, 1-bit per pixel, packed in rows MSB first.
FONT_5X7 = {
    'O': [0b01110,0b10001,0b10001,0b10001,0b10001,0b10001,0b01110],
    'V': [0b10001,0b10001,0b10001,0b10001,0b01010,0b01010,0b00100],
    'I': [0b11111,0b00100,0b00100,0b00100,0b00100,0b00100,0b11111],
    'Z': [0b11111,0b00001,0b00010,0b00100,0b01000,0b10000,0b11111],
    'a': [0b00000,0b00000,0b01110,0b00001,0b01111,0b10001,0b01111],
    'i': [0b00100,0b00000,0b01100,0b00100,0b00100,0b00100,0b01110],
    'A': [0b00100,0b01010,0b10001,0b11111,0b10001,0b10001,0b10001],
    'r': [0b00000,0b00000,0b10110,0b11001,0b10000,0b10000,0b10000],
    't': [0b01000,0b01000,0b11110,0b01000,0b01000,0b01001,0b00110],
    ' ': [0b00000,0b00000,0b00000,0b00000,0b00000,0b00000,0b00000],
    'D': [0b11110,0b10001,0b10001,0b10001,0b10001,0b10001,0b11110],
    'e': [0b00000,0b00000,0b01110,0b10001,0b11111,0b10000,0b01110],
    'c': [0b00000,0b00000,0b01111,0b10000,0b10000,0b10001,0b01110],
    'o': [0b00000,0b00000,0b01110,0b10001,0b10001,0b10001,0b01110],
    'n': [0b00000,0b00000,0b10110,0b11001,0b10001,0b10001,0b10001],
    '&': [0b01100,0b10010,0b10100,0b01000,0b10101,0b10010,0b01101],
    'C': [0b01110,0b10001,0b10000,0b10000,0b10000,0b10001,0b01110],
    'i_up': [0b00100,0b00000,0b01100,0b00100,0b00100,0b00100,0b01110],  # alias
    'm': [0b00000,0b00000,0b11010,0b10101,0b10101,0b10001,0b10001],
    'S': [0b01111,0b10000,0b10000,0b01110,0b00001,0b00001,0b11110],
    'u': [0b00000,0b00000,0b10001,0b10001,0b10001,0b10011,0b01101],
    'd': [0b00001,0b00001,0b01101,0b10011,0b10001,0b10001,0b01101],
    'T': [0b11111,0b00100,0b00100,0b00100,0b00100,0b00100,0b00100],
    'g': [0b00000,0b00000,0b01111,0b10001,0b10001,0b01111,0b00001],
    'h': [0b10000,0b10000,0b10110,0b11001,0b10001,0b10001,0b10001],
    'y': [0b00000,0b00000,0b10001,0b10001,0b01111,0b00001,0b01110],
    'p': [0b00000,0b00000,0b11110,0b10001,0b11110,0b10000,0b10000],
    'G': [0b01110,0b10001,0b10000,0b10111,0b10001,0b10001,0b01110],
    'R': [0b11110,0b10001,0b10001,0b11110,0b10100,0b10010,0b10001],
    'P': [0b11110,0b10001,0b10001,0b11110,0b10000,0b10000,0b10000],
    'H': [0b10001,0b10001,0b10001,0b11111,0b10001,0b10001,0b10001],
    'Y': [0b10001,0b10001,0b01010,0b00100,0b00100,0b00100,0b00100],
    '-': [0b00000,0b00000,0b00000,0b11111,0b00000,0b00000,0b00000],
    '/': [0b00001,0b00010,0b00100,0b01000,0b10000,0b00000,0b00000],
    '?': [0b01110,0b10001,0b00001,0b00110,0b00100,0b00000,0b00100],
}

def render_text(text: str, scale: int, col: tuple, bg: tuple, alpha_bg: int=0):
    """Returns list of rows (RGBA bytes) for rendered text at given scale."""
    W5 = 5
    H7 = 7
    gap = 1
    chars = list(text)
    rows_out = []
    h = H7 * scale
    w_total = len(chars) * (W5 + gap) * scale

    for row_i in range(h):
        font_row = row_i // scale
        row_bytes = bytearray()
        for ch in chars:
            glyph = FONT_5X7.get(ch, FONT_5X7.get(' ', [0]*7))
            bits = glyph[font_row]
            for bit_i in range(W5):
                on = (bits >> (W5 - 1 - bit_i)) & 1
                for _ in range(scale):
                    if on:
                        row_bytes += bytes([col[0], col[1], col[2], 255])
                    else:
                        row_bytes += bytes([bg[0], bg[1], bg[2], alpha_bg])
            # gap
            for _ in range(gap * scale):
                row_bytes += bytes([bg[0], bg[1], bg[2], alpha_bg])
        rows_out.append(bytes(row_bytes))
    return rows_out, w_total, h

# ── og-image.png 1200×630 ────────────────────────────────────────────────────
def make_og_image(path: str):
    W, H = 1200, 630
    BG = (8, 8, 8)
    GOLD_LIGHT = (240, 200, 105)
    GOLD_MID   = (202, 162, 67)
    CREAM      = (236, 228, 211)
    GOLD_DIM   = (122, 95, 33)

    rows = []
    for y in range(H):
        row = bytearray()
        for x in range(W):
            # subtle vignette
            cx = (x - W//2) / (W//2)
            cy = (y - H//2) / (H//2)
            d = (cx*cx + cy*cy) ** 0.5
            vignette = max(0, 1 - d * 0.45)
            bg_r = int(BG[0] * vignette)
            bg_g = int(BG[1] * vignette)
            bg_b = int(BG[2] * vignette)
            row += bytes([bg_r, bg_g, bg_b, 255])
        rows.append(bytes(row))

    # Gold horizontal accent lines
    def draw_hline(rows, y, x0, x1, col, alpha=255):
        row = bytearray(rows[y])
        for x in range(x0, x1):
            row[x*4:x*4+4] = bytes([col[0], col[1], col[2], alpha])
        rows[y] = bytes(row)

    # Top accent line
    for dy in range(2):
        draw_hline(rows, 60 + dy, 80, 1120, GOLD_MID, 180)
    # Bottom accent line
    for dy in range(2):
        draw_hline(rows, H - 60 + dy, 80, 1120, GOLD_MID, 180)

    def draw_pixel(rows, x, y, col, alpha=255):
        if 0 <= y < H and 0 <= x < W:
            row = bytearray(rows[y])
            row[x*4:x*4+4] = bytes([col[0], col[1], col[2], alpha])
            rows[y] = bytes(row)

    def draw_rect(rows, x0, y0, x1, y1, col, alpha=255):
        for yy in range(y0, y1):
            for xx in range(x0, x1):
                draw_pixel(rows, xx, yy, col, alpha)

    # "OVIZai" in large scale — render with gold gradient
    text_main = "OVIZai"
    scale_main = 14
    # Build gold gradient per-row
    text_rows, tw, th = render_text(text_main, scale_main, GOLD_LIGHT, BG, 0)
    tx = (W - tw) // 2
    ty = H // 2 - th - 30

    for row_i, tr in enumerate(text_rows):
        t = row_i / max(th - 1, 1)
        gold_r = lerp(GOLD_LIGHT[0], GOLD_MID[0], t)
        gold_g = lerp(GOLD_LIGHT[1], GOLD_MID[1], t)
        gold_b = lerp(GOLD_LIGHT[2], GOLD_MID[2], t)
        if 0 <= ty + row_i < H:
            row = bytearray(rows[ty + row_i])
            for px in range(tw):
                src = tr[px*4:px*4+4]
                if src[3] > 0:  # foreground pixel
                    gx = tx + px
                    if 0 <= gx < W:
                        row[gx*4:gx*4+4] = bytes([gold_r, gold_g, gold_b, 255])
            rows[ty + row_i] = bytes(row)

    # Subtitle
    subtitle = "AI Art Direction & Cinematography Studio"
    scale_sub = 4
    sub_rows, sw, sh = render_text(subtitle, scale_sub, CREAM, BG, 0)
    sx = (W - sw) // 2
    sy = ty + th + 30
    for row_i, sr in enumerate(sub_rows):
        if 0 <= sy + row_i < H:
            row = bytearray(rows[sy + row_i])
            for px in range(sw):
                src = sr[px*4:px*4+4]
                if src[3] > 0:
                    gx = sx + px
                    if 0 <= gx < W:
                        row[gx*4:gx*4+4] = bytes([CREAM[0], CREAM[1], CREAM[2], 255])
            rows[sy + row_i] = bytes(row)

    # Decorative dot separator
    dot_y = sy - 15
    for dx in range(-2, 3):
        draw_pixel(rows, W//2 + dx*12, dot_y, GOLD_MID, 220)

    write_png(path, W, H, rows)


# ── logo.png transparent ─────────────────────────────────────────────────────
def make_logo(path: str, width_hint: int = 400):
    text = "OVIZai"
    scale = max(1, width_hint // (6 * 6))  # ~6 chars × 6px wide
    GOLD_LIGHT = (240, 200, 105)
    GOLD_MID   = (202, 162, 67)

    text_rows, tw, th = render_text(text, scale, GOLD_LIGHT, (0,0,0), 0)

    # Add padding
    pad = scale * 2
    W = tw + pad * 2
    H = th + pad * 2

    rows = []
    for y in range(H):
        row = bytearray(W * 4)  # fully transparent
        rows.append(bytes(row))

    for row_i, tr in enumerate(text_rows):
        t = row_i / max(th - 1, 1)
        gold_r = lerp(GOLD_LIGHT[0], GOLD_MID[0], t)
        gold_g = lerp(GOLD_LIGHT[1], GOLD_MID[1], t)
        gold_b = lerp(GOLD_LIGHT[2], GOLD_MID[2], t)
        row = bytearray(rows[pad + row_i])
        for px in range(tw):
            src = tr[px*4:px*4+4]
            if src[3] > 0:
                gx = pad + px
                row[gx*4:gx*4+4] = bytes([gold_r, gold_g, gold_b, 255])
        rows[pad + row_i] = bytes(row)

    write_png(path, W, H, rows)


# ── apple-touch-icon 180×180 ─────────────────────────────────────────────────
def make_apple_icon(path: str, size: int = 180):
    BG = (8, 8, 8)
    GOLD_LIGHT = (240, 200, 105)
    GOLD_MID   = (202, 162, 67)
    W = H = size

    rows = []
    for y in range(H):
        row = bytearray()
        for x in range(W):
            row += bytes([BG[0], BG[1], BG[2], 255])
        rows.append(bytes(row))

    text = "OVZ"  # abbreviated for small icon
    scale = 8
    text_rows, tw, th = render_text(text, scale, GOLD_LIGHT, BG, 255)
    tx = (W - tw) // 2
    ty = (H - th) // 2

    for row_i, tr in enumerate(text_rows):
        t = row_i / max(th - 1, 1)
        gold_r = lerp(GOLD_LIGHT[0], GOLD_MID[0], t)
        gold_g = lerp(GOLD_LIGHT[1], GOLD_MID[1], t)
        gold_b = lerp(GOLD_LIGHT[2], GOLD_MID[2], t)
        if 0 <= ty + row_i < H:
            row = bytearray(rows[ty + row_i])
            for px in range(tw):
                src = tr[px*4:px*4+4]
                if src[3] > 0:
                    gx = tx + px
                    if 0 <= gx < W:
                        row[gx*4:gx*4+4] = bytes([gold_r, gold_g, gold_b, 255])
            rows[ty + row_i] = bytes(row)

    write_png(path, W, H, rows)


# ── favicon — write small PNG then convert with sips ─────────────────────────
def make_favicon_png(path: str, size: int = 32):
    BG = (8, 8, 8)
    GOLD_LIGHT = (240, 200, 105)
    GOLD_MID   = (202, 162, 67)
    W = H = size

    rows = []
    for y in range(H):
        row = bytearray()
        for x in range(W):
            row += bytes([BG[0], BG[1], BG[2], 255])
        rows.append(bytes(row))

    # Draw "O" letter for favicon
    text = "O"
    scale = 4 if size >= 32 else 2
    text_rows, tw, th = render_text(text, scale, GOLD_LIGHT, BG, 255)
    tx = (W - tw) // 2
    ty = (H - th) // 2

    for row_i, tr in enumerate(text_rows):
        t = row_i / max(th - 1, 1)
        gold_r = lerp(GOLD_LIGHT[0], GOLD_MID[0], t)
        gold_g = lerp(GOLD_LIGHT[1], GOLD_MID[1], t)
        gold_b = lerp(GOLD_LIGHT[2], GOLD_MID[2], t)
        if 0 <= ty + row_i < H:
            row = bytearray(rows[ty + row_i])
            for px in range(tw):
                src = tr[px*4:px*4+4]
                if src[3] > 0:
                    gx = tx + px
                    if 0 <= gx < W:
                        row[gx*4:gx*4+4] = bytes([gold_r, gold_g, gold_b, 255])
            rows[ty + row_i] = bytes(row)

    write_png(path, W, H, rows)


# ── ICO writer ───────────────────────────────────────────────────────────────
def make_ico(ico_path: str, png_paths: list[str]):
    """Pack multiple PNGs into a .ico file (PNG-in-ICO format, modern)."""
    images = []
    for p in png_paths:
        with open(p, "rb") as f:
            data = f.read()
        # Parse PNG dimensions
        w = struct.unpack(">I", data[16:20])[0]
        h = struct.unpack(">I", data[20:24])[0]
        images.append((w, h, data))

    # ICO header
    n = len(images)
    header = struct.pack("<HHH", 0, 1, n)
    # Directory entries are 16 bytes each; image data starts after header + directory
    dir_offset = 6 + n * 16
    offsets = []
    cur = dir_offset
    for (w, h, data) in images:
        offsets.append(cur)
        cur += len(data)

    directory = b""
    for i, (w, h, data) in enumerate(images):
        bw = 0 if w >= 256 else w
        bh = 0 if h >= 256 else h
        directory += struct.pack("<BBBBHHII",
            bw, bh,   # width, height (0=256)
            0,        # color count
            0,        # reserved
            1,        # color planes
            32,       # bit count
            len(data),
            offsets[i]
        )

    with open(ico_path, "wb") as f:
        f.write(header + directory)
        for (w, h, data) in images:
            f.write(data)

    print(f"  Wrote {ico_path}  ({os.path.getsize(ico_path)//1024} KB, {n} sizes)")


# ── FONT additions ────────────────────────────────────────────────────────────
FONT_5X7.update({
    'W': [0b10001,0b10001,0b10001,0b10101,0b10101,0b11011,0b10001],
    'l': [0b01100,0b00100,0b00100,0b00100,0b00100,0b00100,0b01110],
    'f': [0b00110,0b01000,0b11110,0b01000,0b01000,0b01000,0b01000],
    'k': [0b10000,0b10010,0b10100,0b11000,0b10100,0b10010,0b10001],
    'x': [0b00000,0b00000,0b10001,0b01010,0b00100,0b01010,0b10001],
    'v': [0b00000,0b00000,0b10001,0b10001,0b10001,0b01010,0b00100],
    'w': [0b00000,0b00000,0b10001,0b10101,0b10101,0b10101,0b01010],
    'z': [0b00000,0b00000,0b11111,0b00010,0b00100,0b01000,0b11111],
    'q': [0b00000,0b00000,0b01111,0b10001,0b10001,0b01111,0b00011],
    'j': [0b00010,0b00000,0b00110,0b00010,0b00010,0b10010,0b01100],
    'b': [0b10000,0b10000,0b10110,0b11001,0b10001,0b10001,0b11110],
    'E': [0b11111,0b10000,0b10000,0b11110,0b10000,0b10000,0b11111],
    'F': [0b11111,0b10000,0b10000,0b11110,0b10000,0b10000,0b10000],
    'L': [0b10000,0b10000,0b10000,0b10000,0b10000,0b10000,0b11111],
    'M': [0b10001,0b11011,0b10101,0b10101,0b10001,0b10001,0b10001],
    'N': [0b10001,0b11001,0b10101,0b10011,0b10001,0b10001,0b10001],
    'B': [0b11110,0b10001,0b10001,0b11110,0b10001,0b10001,0b11110],
    'K': [0b10001,0b10010,0b10100,0b11000,0b10100,0b10010,0b10001],
    'J': [0b00111,0b00010,0b00010,0b00010,0b10010,0b10010,0b01100],
    'Q': [0b01110,0b10001,0b10001,0b10001,0b10101,0b10010,0b01101],
    'U': [0b10001,0b10001,0b10001,0b10001,0b10001,0b10001,0b01110],
    'X': [0b10001,0b10001,0b01010,0b00100,0b01010,0b10001,0b10001],
})

if __name__ == "__main__":
    PUBLIC = "public"
    SCRATCH_DIR = PUBLIC  # use public/ for temp favicon PNGs
    os.makedirs(SCRATCH_DIR, exist_ok=True)

    print("\n[1] Generating og-image.png (1200×630)...")
    make_og_image(f"{PUBLIC}/og-image.png")

    print("\n[2] Generating logo.png (transparent)...")
    make_logo(f"{PUBLIC}/logo.png", width_hint=500)

    print("\n[3] Generating apple-touch-icon.png (180×180)...")
    make_apple_icon(f"{PUBLIC}/apple-touch-icon.png", size=180)

    print("\n[4] Generating favicon PNG sources...")
    fav16 = f"{SCRATCH_DIR}/fav16.png"
    fav32 = f"{SCRATCH_DIR}/fav32.png"
    fav48 = f"{SCRATCH_DIR}/fav48.png"
    make_favicon_png(fav16, 16)
    make_favicon_png(fav32, 32)
    make_favicon_png(fav48, 48)

    print("\n[5] Packing favicon.ico...")
    make_ico(f"{PUBLIC}/favicon.ico", [fav16, fav32, fav48])

    print("\nDone. Sizes:")
    for f in ["public/og-image.png", "public/logo.png", "public/apple-touch-icon.png", "public/favicon.ico"]:
        sz = os.path.getsize(f)
        print(f"  {f}: {sz/1024:.1f} KB")
