import json
import re
from pathlib import Path

from PIL import Image, ImageOps


SOURCE = Path.home() / "Desktop" / "产品图片"
PROJECT = Path(__file__).resolve().parents[1]
OUTPUT = PROJECT / "public" / "cases"
MANIFEST = PROJECT / "src" / "caseData.json"


def value(data, *keys, default=""):
    for key in keys:
        if data.get(key):
            return data[key]
    return default


def save_webp(source: Path, target: Path, size: tuple[int, int], fit=True):
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        if fit:
            image = ImageOps.fit(image, size, method=Image.Resampling.LANCZOS)
        else:
            image.thumbnail(size, Image.Resampling.LANCZOS)
        target.parent.mkdir(parents=True, exist_ok=True)
        image.save(target, "WEBP", quality=84, method=6)


def main():
    if not SOURCE.exists():
        raise SystemExit(f"Source folder not found: {SOURCE}")
    OUTPUT.mkdir(parents=True, exist_ok=True)
    cases = []
    for index, folder in enumerate(sorted(p for p in SOURCE.iterdir() if p.is_dir()), 1):
        data = json.loads((folder / "product.json").read_text(encoding="utf-8"))
        slug = value(data, "slug", default=re.sub(r"[^a-z0-9-]", "-", folder.name.lower()))
        target = OUTPUT / slug
        target.mkdir(parents=True, exist_ok=True)
        gallery_names = value(data, "gallery", default=[]) or data.get("images", {}).get("gallery", [])
        main_name = data.get("images", {}).get("main") or (gallery_names[0] if gallery_names else "detail.png")
        save_webp(folder / main_name, target / "cover.webp", (1400, 1000))
        gallery = []
        for gallery_index, name in enumerate(gallery_names, 1):
            output_name = f"gallery-{gallery_index:02}.webp"
            save_webp(folder / name, target / output_name, (1400, 1000))
            gallery.append(f"/cases/{slug}/{output_name}")
        detail_name = value(data, "detail", default="") or data.get("images", {}).get("detail", "detail.png")
        save_webp(folder / detail_name, target / "detail.webp", (1600, 8000), fit=False)
        category = value(data, "category", "categoryZh", default="精选案例").split("/")[0].strip()
        cases.append({
            "index": f"{index:02}",
            "slug": slug,
            "name": value(data, "name", "productNameZh", default=folder.name),
            "nameEn": value(data, "nameEn", "productNameEn", default="CUSTOM PROJECT"),
            "category": category,
            "summary": value(data, "summary", "descriptionZh"),
            "description": value(data, "description", "descriptionZh"),
            "contents": value(data, "contents", "contentsZh", default=[]),
            "materials": value(data, "materials", "materialsZh", default=[]),
            "design": value(data, "design", default="从包装结构、配色、内托与单品标识统一规划，形成完整的项目视觉。"),
            "customization": value(data, "customization", "customizationNoteZh"),
            "cover": f"/cases/{slug}/cover.webp",
            "gallery": gallery,
            "detail": f"/cases/{slug}/detail.webp",
        })
    MANIFEST.write_text(json.dumps(cases, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Synced {len(cases)} cases to {OUTPUT}")


if __name__ == "__main__":
    main()
