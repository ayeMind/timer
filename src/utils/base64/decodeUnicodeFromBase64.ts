export function decodeUnicodeFromBase64(base64Encoded: string): string {
    return decodeURIComponent(atob(base64Encoded).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}