from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()
    try:
        page.goto("http://localhost:3000/dashboard")
        page.wait_for_selector("text=Create Product")
        page.click("text=Create Product")
        page.fill("input[name='title']", "Test Product")
        page.fill("input[name='description']", "This is a test product.")
        page.fill("input[name='price']", "10")
        page.fill("input[name='productUrl']", "https://example.com")
        page.fill("input[name='paymentAddress']", "0x1234567890123456789012345678901234567890")
        page.click("text=Create Product")
        page.click("text=View")
        page.screenshot(path="jules-scratch/verification/verification.png")
    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
