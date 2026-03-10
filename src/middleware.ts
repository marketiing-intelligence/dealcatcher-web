import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["pl", "en"];
const defaultLocale = "pl";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip if path already has locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;

  // Skip static files, API, demo pages, previews, and generated assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/demo") ||
    pathname.startsWith("/previews") ||
    pathname === "/icon" ||
    pathname === "/apple-icon" ||
    pathname === "/sitemap.xml" ||
    pathname === "/llms.txt" ||
    pathname.includes(".")
  ) {
    return;
  }

  // Always redirect to Polish (main market)
  // English is available via language switcher for those who need it
  const locale = "pl";

  // Redirect to localized path
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!_next|api|demo|previews|icon|apple-icon|sitemap\\.xml|llms\\.txt|.*\\..*).*)"],
};

