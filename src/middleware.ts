import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "no"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip if path already has locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  if (pathnameHasLocale) return;

  // Skip static files, API, demo pages, and previews
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/demo") ||
    pathname.startsWith("/previews") ||
    pathname.includes(".")
  ) {
    return;
  }

  // Detect country from Vercel header (production) or default to EN
  const country = request.headers.get("x-vercel-ip-country");
  const locale = country === "NO" ? "no" : defaultLocale;

  // Redirect to localized path
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!_next|api|demo|previews|.*\\..*).*)"],
};
