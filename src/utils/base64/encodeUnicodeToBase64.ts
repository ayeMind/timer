export function encodeUnicodeToBase64(text: string): string {
  return btoa(encodeURIComponent(text));
}