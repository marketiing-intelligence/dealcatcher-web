#!/usr/bin/env python3
"""
Record smooth scroll videos of demo pages for portfolio preview.
Usage: python scripts/record-scroll-videos.py

Requires:
- pip install playwright
- playwright install chromium
- Dev server running on localhost:4000
"""

import os
import time
import subprocess
from pathlib import Path
from playwright.sync_api import sync_playwright

# Configuration
BASE_URL = "http://localhost:4000"
OUTPUT_DIR = Path(__file__).parent.parent / "public" / "previews"
VIEWPORT = {"width": 1280, "height": 720}
SCROLL_DURATION = 6  # seconds for smooth scroll
WAIT_BEFORE_SCROLL = 2  # seconds to wait for page load/animations
PAUSE_AT_TOP = 1  # seconds to show top of page before scroll
TRIM_START = 2  # seconds to trim from beginning (loading)

# Demo pages to record
DEMOS = [
    {"name": "swiss", "url": "/demo/swiss.html"},
    {"name": "standard", "url": "/demo/standard.html"},
    {"name": "technical", "url": "/demo/technical.html"},
    {"name": "terminal", "url": "/demo/terminal.html"},
    {"name": "blueprint", "url": "/demo/blueprint.html"},
    {"name": "gallery", "url": "/demo/gallery.html"},
]


def record_scroll_video(page, url: str, output_name: str) -> str:
    """Record a smooth scroll video of a page."""
    print(f"  Loading {url}...")
    page.goto(f"{BASE_URL}{url}", wait_until="networkidle")

    # Wait for initial animations to settle
    time.sleep(WAIT_BEFORE_SCROLL)

    # Ensure we're at the top
    page.evaluate("window.scrollTo(0, 0)")

    # Pause at top to capture hero section as first visible frame
    print(f"  Pausing {PAUSE_AT_TOP}s at top...")
    time.sleep(PAUSE_AT_TOP)

    # Get page height
    page_height = page.evaluate("document.body.scrollHeight")
    viewport_height = page.evaluate("window.innerHeight")
    scroll_distance = page_height - viewport_height

    print(f"  Page height: {page_height}px, scrolling {scroll_distance}px...")

    # Smooth scroll using JavaScript
    # This creates a nice eased scroll effect
    page.evaluate(f"""
        const scrollDistance = {scroll_distance};
        const duration = {SCROLL_DURATION * 1000};
        const startTime = performance.now();
        const startY = window.scrollY;

        function easeInOutCubic(t) {{
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }}

        function scroll() {{
            const elapsed = performance.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeInOutCubic(progress);

            window.scrollTo(0, startY + scrollDistance * easedProgress);

            if (progress < 1) {{
                requestAnimationFrame(scroll);
            }}
        }}

        scroll();
    """)

    # Wait for scroll to complete
    time.sleep(SCROLL_DURATION + 1)

    # Small pause at bottom
    time.sleep(1)

    print(f"  Recording complete!")
    return output_name


def main():
    print("=" * 50)
    print("Recording Scroll Videos for Portfolio Preview")
    print("=" * 50)

    # Ensure output directory exists
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        print("\nLaunching browser...")
        browser = p.chromium.launch(headless=False)  # Show browser for debugging

        for demo in DEMOS:
            print(f"\n Recording: {demo['name']}")

            # Create context with video recording
            video_path = OUTPUT_DIR / f"{demo['name']}-scroll.webm"

            context = browser.new_context(
                viewport=VIEWPORT,
                record_video_dir=str(OUTPUT_DIR),
                record_video_size=VIEWPORT
            )

            page = context.new_page()

            try:
                record_scroll_video(page, demo["url"], demo["name"])
            except Exception as e:
                print(f"  Error: {e}")
            finally:
                # Close context to save video
                context.close()

                # Rename video file (Playwright generates random names)
                for f in OUTPUT_DIR.glob("*.webm"):
                    if f.name.startswith("video-"):
                        temp_name = OUTPUT_DIR / f"temp-{demo['name']}.webm"
                        final_name = OUTPUT_DIR / f"{demo['name']}-scroll.webm"

                        # Rename raw video
                        if temp_name.exists():
                            temp_name.unlink()
                        f.rename(temp_name)

                        # Trim beginning with re-encoding to ensure accurate cut
                        print(f"  Trimming first {TRIM_START}s...")
                        if final_name.exists():
                            final_name.unlink()
                        subprocess.run([
                            "ffmpeg", "-y", "-ss", str(TRIM_START),
                            "-i", str(temp_name),
                            "-c:v", "libvpx", "-b:v", "1M",
                            str(final_name)
                        ], capture_output=True)

                        # Clean up temp file
                        temp_name.unlink()
                        print(f"  Saved: {final_name.name}")
                        break

        browser.close()

    print("\n" + "=" * 50)
    print("Done! Videos saved to:", OUTPUT_DIR)
    print("=" * 50)


if __name__ == "__main__":
    main()
