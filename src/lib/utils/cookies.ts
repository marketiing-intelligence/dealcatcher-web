/**
 * Cookie utilities for Meta Pixel tracking
 */

/**
 * Get cookie value by name
 */
export function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
  return undefined;
}

/**
 * Get Meta Pixel cookies for CAPI
 * @returns Object with fbp and fbc values
 */
export function getMetaCookies(): { fbp?: string; fbc?: string } {
  return {
    fbp: getCookie("_fbp"), // Facebook Browser ID
    fbc: getCookie("_fbc"), // Facebook Click ID
  };
}
