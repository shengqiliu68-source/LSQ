import json
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps

SOURCE = Path.home() / "Desktop" / "礼盒图片"
PROJECT = Path(__file__).resolve().parents[1]
OUTPUT = PROJECT / "public" / "cases"
MANIFEST = PROJECT / "src" / "giftboxCaseData.json"

GROUPS = [
    ("color-block-business-gift-set", "撞色商务办公礼盒", "商务礼赠", [0, 1, 2], "蓝橙双色", ["保温杯", "商务笔记本", "金属签字笔"]),
    ("bamboo-texture-executive-set", "竹木纹行政商务礼盒", "商务礼赠", [3, 4], "原木纹理", ["竹木纹笔记本", "随行杯", "保温杯", "钥匙扣", "签字笔"]),
    ("graphite-office-trio", "石墨灰办公三件套", "商务礼赠", [5, 6], "石墨灰", ["商务笔记本", "保温杯", "金属签字笔"]),
    ("minimal-notebook-tumbler-set", "轻奢笔记本随行杯套装", "商务礼赠", [7, 18], "薄荷绿、正红", ["皮纹笔记本", "保温杯", "金属签字笔"]),
    ("vivid-corporate-welcome-set", "缤纷企业欢迎礼盒", "员工礼赠", [8, 9], "玫红、宝蓝", ["笔记本", "签字笔", "钥匙扣", "便携配件"]),
    ("navy-travel-office-set", "深蓝轻出行办公套装", "出行礼赠", [10, 20], "深海蓝", ["商务记事本", "随行杯", "钥匙扣", "便携配件"]),
    ("carry-case-corporate-gift-series", "手提式企业礼盒系列", "商务礼赠", [11, 12, 19, 21, 22, 23, 24, 25, 26, 27, 28], "绿、棕、红、黑、白、粉", ["笔记本", "保温杯", "签字笔", "钥匙扣", "定制配件"]),
    ("white-tech-accessory-set", "纯白科技配件礼盒", "数码礼赠", [13], "纯净白", ["充电配件", "数据线", "数码收纳件", "说明卡"]),
    ("blue-black-minimal-office-set", "蓝黑极简办公礼盒", "商务礼赠", [14, 15], "宝蓝、曜石黑", ["保温杯", "签字笔", "商务配件"]),
    ("woodgrain-five-piece-business-set", "木纹五件商务组合", "商务礼赠", [16, 43, 53, 54], "天然木纹", ["木纹笔记本", "保温杯", "签字笔", "钥匙扣", "名片配件"]),
    ("orange-event-office-set", "暖橙活动纪念套装", "活动礼赠", [17], "暖橙色", ["笔记本", "签字笔", "保温杯"]),
    ("grey-gold-executive-gift-set", "灰金行政商务礼盒", "商务礼赠", [29], "高级灰、香槟金", ["笔记本", "保温杯", "签字笔", "商务配件"]),
    ("black-notebook-tumbler-set", "黑色笔记本保温杯礼盒", "商务礼赠", [30, 31], "哑光黑", ["商务笔记本", "保温杯", "金属签字笔"]),
    ("red-fragrance-corporate-set", "红色香氛商务礼盒", "员工礼赠", [32], "中国红", ["香氛产品", "笔记本", "签字笔", "便携配件"]),
    ("monochrome-business-essentials", "黑白商务随行套装", "商务礼赠", [33, 34], "黑白配色", ["保温杯", "笔记本", "签字笔", "配件盒"]),
    ("sage-care-gift-set", "鼠尾草绿关怀礼盒", "员工礼赠", [35], "鼠尾草绿", ["随行杯", "感谢卡", "签字笔", "便携配件"]),
    ("event-photo-commemorative-set", "活动影像纪念礼盒", "活动礼赠", [36, 37], "宝蓝、正红", ["活动纪念册", "随行杯", "签字笔", "纪念配件"]),
    ("emerald-administrative-set", "墨绿行政礼赠套装", "商务礼赠", [38], "墨绿色", ["保温杯", "皮纹笔记本", "金属签字笔"]),
    ("black-five-piece-corporate-kit", "黑色五件企业套装", "商务礼赠", [39], "深黑色", ["随行杯", "笔记本", "签字笔", "收纳袋", "便携配件"]),
    ("red-executive-gift-series", "正红行政礼盒系列", "活动礼赠", [40, 41], "正红色", ["保温杯", "皮纹笔记本", "签字笔", "商务配件"]),
    ("charcoal-office-welcome-set", "炭黑办公欢迎礼盒", "员工礼赠", [42], "炭黑色", ["笔记本", "随行杯", "签字笔", "欢迎卡"]),
    ("black-gold-leather-gift-set", "黑金皮具商务套装", "商务礼赠", [44], "黑金配色", ["皮纹笔记本", "保温杯", "商务配件"]),
    ("forest-green-travel-set", "森林绿轻出行礼盒", "出行礼赠", [45], "森林绿", ["保温杯", "商务笔记本", "折叠伞", "随行配件"]),
    ("two-tone-basic-office-set", "双色基础办公套装", "员工礼赠", [46, 47], "青绿、姜黄", ["笔记本", "双支签字笔"]),
    ("portable-corporate-carry-set", "便携手提企业礼盒", "商务礼赠", [48, 49], "深灰色", ["商务笔记本", "签字笔", "保温杯", "便携配件"]),
    ("global-creative-office-set", "环球创意办公礼盒", "商务礼赠", [50, 51, 52], "石墨黑", ["商务笔记本", "保温杯", "签字笔", "数码配件"]),
    ("multi-color-organizer-notebook-set", "多色活页记事本礼盒", "员工礼赠", [55, 56, 57, 58], "黑、蓝、金、红", ["活页记事本", "金属名牌", "商务卡位"]),
    ("passport-commemorative-travel-set", "纪念护照随行礼盒", "出行礼赠", [59, 60], "酒红、米灰", ["纪念护照本", "随行杯", "签字笔"]),
    ("red-notebook-tumbler-series", "红色笔记本保温杯系列", "商务礼赠", [61, 62, 63], "中国红、雅黑", ["皮纹笔记本", "保温杯", "金属签字笔"]),
    ("tri-color-administrative-set", "三色行政商务礼盒", "商务礼赠", [64, 65, 66], "宝蓝、焦糖、军绿", ["笔记本", "保温杯", "签字笔", "商务配件"]),
    ("express-staff-office-kit", "快递团队办公礼盒", "员工礼赠", [67, 68], "深灰色", ["办公记事本", "签字笔", "员工配件"]),
    ("royal-blue-tech-business-set", "皇家蓝科技商务套装", "数码礼赠", [69, 70, 71, 72], "皇家蓝", ["活页笔记本", "保温杯", "签字笔", "数据线", "移动电源"]),
    ("natural-wood-corporate-set", "原木质感企业礼盒", "商务礼赠", [73, 74, 75], "原木、深蓝", ["木纹笔记本", "签字笔", "钥匙扣", "商务配件"]),
    ("blue-logistics-service-set", "蓝色后勤服务礼盒", "员工礼赠", [76, 77, 78], "深蓝色", ["员工手册", "随行杯", "签字笔", "纪念配件"]),
    ("minimal-grey-pen-notebook-set", "极简灰签字笔记事礼盒", "商务礼赠", [79, 80, 81], "高级灰", ["商务记事本", "双支签字笔"]),
]


GALLERY_SIZE = (1400, 1050)
GALLERY_MINIMUM = 9
DETAIL_SIZE = (1400, 3000)
FONT_CANDIDATES = [
    Path("C:/Windows/Fonts/msyh.ttc"),
    Path("C:/Windows/Fonts/simhei.ttf"),
]


def load_image(source: Path):
    with Image.open(source) as image:
        return ImageOps.exif_transpose(image).convert("RGB")


def save_webp(image: Image.Image, target: Path, quality=88):
    target.parent.mkdir(parents=True, exist_ok=True)
    image.save(target, "WEBP", quality=quality, method=6)


def save_image(source: Path, target: Path, centering=(0.5, 0.5), zoom=1.0):
    image = ImageOps.fit(
        load_image(source),
        GALLERY_SIZE,
        method=Image.Resampling.LANCZOS,
        centering=centering,
    )
    if zoom > 1:
        width, height = image.size
        crop_width = round(width / zoom)
        crop_height = round(height / zoom)
        left = round((width - crop_width) * centering[0])
        top = round((height - crop_height) * centering[1])
        image = image.crop((left, top, left + crop_width, top + crop_height)).resize(
            GALLERY_SIZE, Image.Resampling.LANCZOS
        )
    save_webp(image, target)


def get_font(size: int):
    for font_path in FONT_CANDIDATES:
        if font_path.exists():
            return ImageFont.truetype(str(font_path), size)
    return ImageFont.load_default()


def build_detail_board(sources, target, name, colors, contents):
    canvas = Image.new("RGB", DETAIL_SIZE, "#08090c")
    draw = ImageDraw.Draw(canvas)
    accent = "#ff5a1f"
    white = "#f6f6f4"
    muted = "#a4a7ad"

    hero = ImageOps.fit(load_image(sources[0]), (1400, 920), Image.Resampling.LANCZOS)
    canvas.paste(hero, (0, 0))
    canvas.paste(Image.new("RGB", (1400, 235), "#08090c"), (0, 920))
    draw.text((72, 970), "PRODUCT DETAIL / 产品详情", font=get_font(30), fill=accent)
    draw.text((72, 1025), name, font=get_font(64), fill=white)
    draw.text((72, 1110), f"主视觉：{colors}", font=get_font(28), fill=muted)

    left = ImageOps.fit(load_image(sources[0]), (676, 690), Image.Resampling.LANCZOS, centering=(0.32, 0.5))
    right_source = sources[1] if len(sources) > 1 else sources[0]
    right = ImageOps.fit(load_image(right_source), (676, 690), Image.Resampling.LANCZOS, centering=(0.68, 0.5))
    canvas.paste(left, (24, 1185))
    canvas.paste(right, (724, 1185))

    canvas.paste(Image.new("RGB", (1400, 305), "#111319"), (0, 1905))
    draw.text((72, 1955), "套装配置", font=get_font(28), fill=accent)
    draw.text((72, 2010), "  ·  ".join(contents), font=get_font(36), fill=white)
    draw.text((72, 2080), "礼盒结构、内托、产品组合、品牌标识和卡片内容均可按项目定制。", font=get_font(25), fill=muted)

    bottom_source = sources[-1]
    bottom = ImageOps.fit(load_image(bottom_source), (1400, 700), Image.Resampling.LANCZOS, centering=(0.5, 0.62))
    canvas.paste(bottom, (0, 2250))
    draw.rectangle((0, 2948, 1400, 3000), fill=accent)
    save_webp(canvas, target, quality=86)


def main():
    files = sorted(path for path in SOURCE.iterdir() if path.is_file())
    cases = []
    for number, (slug, name, category, indices, colors, contents) in enumerate(GROUPS, 1):
        directory = OUTPUT / slug
        gallery = []
        sources = [files[source_index] for source_index in indices]
        for image_number, source_index in enumerate(indices, 1):
            target = directory / f"gallery-{image_number:02}.webp"
            save_image(files[source_index], target)
            gallery.append(f"/cases/{slug}/{target.name}")

        crop_centers = [
            (0.28, 0.32), (0.72, 0.32), (0.28, 0.68), (0.72, 0.68),
            (0.5, 0.24), (0.5, 0.76), (0.38, 0.5), (0.62, 0.5),
        ]
        while len(gallery) < GALLERY_MINIMUM:
            image_number = len(gallery) + 1
            source = sources[(image_number - 1) % len(sources)]
            centering = crop_centers[(image_number - len(indices) - 1) % len(crop_centers)]
            target = directory / f"gallery-{image_number:02}.webp"
            zoom = [1.18, 1.24, 1.32, 1.4][(image_number - len(indices) - 1) % 4]
            save_image(source, target, centering=centering, zoom=zoom)
            gallery.append(f"/cases/{slug}/{target.name}")

        cover = directory / "cover.webp"
        save_image(files[indices[0]], cover)
        detail = directory / "detail.webp"
        build_detail_board(sources, detail, name, colors, contents)
        content_text = "、".join(contents)
        cases.append({
            "index": f"N{number:02}", "slug": slug, "name": name,
            "nameEn": slug.replace("-", " ").title(), "category": category,
            "summary": f"以{colors}为主视觉，将{content_text}统一收纳于定型礼盒中，适合企业活动、员工关怀与客户答谢场景。",
            "description": f"该案例围绕企业批量礼赠与项目交付设计，组合包含{content_text}。通过统一配色、定型内托和品牌标识规划，让包装与内容物保持完整一致的视觉表达；同一结构的不同颜色已合并展示，便于客户直观比较配色方案。",
            "contents": contents,
            "materials": ["硬质纸板裱装礼盒", "定型内托", "金属与皮纹复合材质", "特种纸或覆膜表面"],
            "design": f"采用{colors}配色，强调套装秩序、开箱层次和企业品牌识别。",
            "customization": "支持礼盒颜色、内托结构、产品组合、LOGO、祝福文字与宣传卡片定制；图片中的客户标识仅作为过往交付效果展示。",
            "cover": f"/cases/{slug}/cover.webp", "gallery": gallery,
            "detail": f"/cases/{slug}/detail.webp",
        })
    MANIFEST.write_text(json.dumps(cases, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Synced {len(cases)} product groups from {len(files)} images")


if __name__ == "__main__":
    main()
