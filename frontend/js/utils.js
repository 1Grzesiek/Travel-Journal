export function bufferToDataURL(obj) {
  if (!obj) return "";
  const raw = obj.data?.data || obj.data;
  if (!raw || !Array.isArray(raw)) return "";

  // konwersja buffer -> uint8array -> blob
  const u8 = new Uint8Array(raw);
  const blob = new Blob([u8], {
    type: obj.contentType || "image/jpeg"
  });

  return URL.createObjectURL(blob);
}
