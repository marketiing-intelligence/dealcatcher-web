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

  // Detect browser language from Accept-Language header
  const acceptLanguage = request.headers.get("accept-language") || "";

  // Parse the first language from Accept-Language header (e.g., "pl-PL" -> "pl")
  const browserLang = acceptLanguage.split(",")[0]?.split("-")[0]?.toLowerCase();

  // If browser language is Polish, redirect to /pl, otherwise /en
  const locale = browserLang === "pl" ? "pl" : "en";

  // Redirect to localized path
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!_next|api|demo|previews|icon|apple-icon|sitemap\\.xml|llms\\.txt|.*\\..*).*)"],
};
