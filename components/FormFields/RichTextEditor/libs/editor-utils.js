import { useRef } from "react";

// Debounce utility
export function useDebounce(callback, delay) {
  const timeoutRef = useRef(null);

  function debouncedFn(...args) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }

  return debouncedFn;
}

// Function to convert bytes to human-readable format
export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

// Convert base64 to File object
export const base64ToFile = (base64String, filename = "image.png") => {
  if (typeof window === "undefined") return null;

  const base64Regex = /^data:image\/([a-zA-Z]*);base64,([^\s]*)$/;
  const matches = base64String.match(base64Regex);

  if (!matches) return null;

  const mimeType = matches[1];
  const base64Data = matches[2];

  try {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: `image/${mimeType}` });
    return new File([blob], filename, { type: `image/${mimeType}` });
  } catch (error) {
    console.error("Error converting base64 to file:", error);
    return null;
  }
};

// Safe DOM removal function
export const safeRemoveChild = (parent, child) => {
  if (parent && child && parent.contains(child)) {
    parent.removeChild(child);
  }
};