export function encodeUnicodeToBase64(text: string): string {
    return btoa(encodeURIComponent(text).replace(/%([0-9A-F]{2})/g,
      (_, p1) => {
        return String.fromCharCode(parseInt('0x' + p1, 16)); 
    }));
}

