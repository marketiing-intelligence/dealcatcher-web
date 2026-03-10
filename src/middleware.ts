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

  // Parse the first language from Accept-Language header
  // Handle formats like: "pl-PL,en-US;q=0.9" or "pl-PL;q=1.0,en;q=0.8"
  const firstLang = acceptLanguage
    .split(",")[0]           // Get first language
    ?.trim()                  // Remove whitespace
    .split(";")[0]            // Remove quality value (q=0.9)
    ?.split("-")[0]           // Get language code (pl from pl-PL)
    ?.toLowerCase();          // Normalize to lowercase

  // Default to Polish (main audience), only use English if explicitly requested
  const locale = firstLang === "en" ? "en" : "pl";

  // Redirect to localized path
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!_next|api|demo|previews|icon|apple-icon|sitemap\\.xml|llms\\.txt|.*\\..*).*)"],
};
