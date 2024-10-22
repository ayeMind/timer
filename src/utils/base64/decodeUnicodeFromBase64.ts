export function decodeUnicodeFromBase64(base64Encoded: string): string {
  try {
    const binaryString = atob(base64Encoded);
    let decodedString = '';
    for (let i = 0; i < binaryString.length; i++) {
      decodedString += String.fromCharCode(binaryString.charCodeAt(i));
    }
    return decodedString;
  } catch (error) {
    console.error("Error decoding base64:", error);
    return ''; 
  }
}