import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        page.on("console", lambda msg: print(f"Browser console: {msg.text}"))

        await page.goto('http://localhost:4173/marketplace')

        # Wait for splash screen to disappear
        print("Waiting for splash screen...")
        await page.wait_for_timeout(4000)

        await page.wait_for_load_state('networkidle')

        await page.screenshot(path='screenshot_marketplace.png', full_page=True)
        print("Took marketplace screenshot.")

        await browser.close()

asyncio.run(run())
