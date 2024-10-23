export function decodeUnicodeFromBase64(base64Encoded: string): string {
  try {
    return decodeURIComponent(atob(base64Encoded));
  } catch (error) {
    console.error("Ошибка декодирования Base64:", error);
    return "";
  }
}