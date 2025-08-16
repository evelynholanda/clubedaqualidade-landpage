from playwright.sync_api import sync_playwright
import sys

URLS = ["/", "/produtos.html"]
BASE = "http://localhost:8000"

results = []

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    # Mobile emulação (iPhone 12)
    device = p.devices.get("iPhone 12") or p.devices.get("iPhone 11 Pro")
    if device is None:
        device = {"viewport": {"width": 390, "height": 844}, "userAgent": "Mozilla/5.0 (iPhone)"}

    context = browser.new_context(**device)
    page = context.new_page()

    for path in URLS:
        url = BASE + path
        try:
            page.goto(url, wait_until="networkidle", timeout=15000)
        except Exception as e:
            print(f"ERROR loading {url}: {e}")
            results.append((path, "load_error"))
            continue

        # screenshot mobile
        mobile_shot = f"headless{path.replace('/', '_')}_mobile.png".replace('__','_')
        try:
            page.screenshot(path=mobile_shot, full_page=True)
        except Exception:
            pass

        # count product cards and hero CTAs
        cards = page.query_selector_all('.product-card')
        ctas = page.query_selector_all('.hero-fixed-cta .btn')
        results.append((path, 'mobile', len(cards), len(ctas)))
        print(f"{path} mobile -> product_cards={len(cards)}, hero_ctas={len(ctas)}")

    context.close()

    # Desktop check
    context = browser.new_context(viewport={"width": 1200, "height": 900})
    page = context.new_page()

    for path in URLS:
        url = BASE + path
        try:
            page.goto(url, wait_until="networkidle", timeout=15000)
        except Exception as e:
            print(f"ERROR loading {url}: {e}")
            results.append((path, "load_error_desktop"))
            continue

        desk_shot = f"headless{path.replace('/', '_')}_desktop.png".replace('__','_')
        try:
            page.screenshot(path=desk_shot, full_page=True)
        except Exception:
            pass

        cards = page.query_selector_all('.product-card')
        ctas = page.query_selector_all('.hero-fixed-cta .btn')
        results.append((path, 'desktop', len(cards), len(ctas)))
        print(f"{path} desktop -> product_cards={len(cards)}, hero_ctas={len(ctas)}")

    context.close()
    browser.close()

# Summarize to stdout
print("\nSUMMARY:")
for r in results:
    print(r)

print("Screenshots (if created): headless__mobile.png, headless_produtos.html_mobile.png, headless__desktop.png, headless_produtos.html_desktop.png")
