#!/usr/bin/env python3
"""
Trim transparent pixels from all sides, then fit the result into a square
with a small padding. Output is saved as PNG with transparency preserved.
"""

from PIL import Image
import os
import glob

PADDING = 0.08   # fraction of the square size to use as padding on each side
OUTPUT_SIZE = 300  # output square size in pixels

def get_content_bbox(img):
    """Return bounding box of non-transparent pixels. Falls back to full image if no alpha."""
    if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
        rgba = img.convert('RGBA')
        alpha = rgba.split()[-1]
        bbox = alpha.getbbox()
        if bbox:
            return bbox
    # No useful alpha — fall back to the whole image
    return (0, 0, img.width, img.height)

def process(path):
    img = img_orig = Image.open(path).convert('RGBA')

    # 1. Crop transparent border
    bbox = get_content_bbox(img)
    img = img.crop(bbox)

    # 2. Fit into square canvas with padding
    pad_px = int(OUTPUT_SIZE * PADDING)
    inner = OUTPUT_SIZE - pad_px * 2

    # Scale preserving aspect ratio
    img.thumbnail((inner, inner), Image.LANCZOS)

    # Paste centred onto transparent square canvas
    canvas = Image.new('RGBA', (OUTPUT_SIZE, OUTPUT_SIZE), (0, 0, 0, 0))
    x = (OUTPUT_SIZE - img.width) // 2
    y = (OUTPUT_SIZE - img.height) // 2
    canvas.paste(img, (x, y), img)

    canvas.save(path, 'PNG', optimize=True)
    print(f'  OK  {os.path.basename(path):40s}  {img_orig.size} → {OUTPUT_SIZE}×{OUTPUT_SIZE} (content {img.size})')

gear_dir = os.path.dirname(os.path.abspath(__file__))
images = glob.glob(os.path.join(gear_dir, '*.png')) + glob.glob(os.path.join(gear_dir, '*.jpg')) + glob.glob(os.path.join(gear_dir, '*.webp'))
images = [i for i in images if os.path.basename(i) != 'trim_images.py']

print(f'Processing {len(images)} images in {gear_dir}...\n')
for img_path in sorted(images):
    try:
        process(img_path)
    except Exception as e:
        print(f'  ERR {os.path.basename(img_path)}: {e}')

print('\nDone.')
