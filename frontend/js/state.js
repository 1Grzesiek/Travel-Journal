export let currentDetailIndex = null; 
export function setCurrentDetailIndex(v) {
  currentDetailIndex = v;
}

export let currentEditId = null; //(id z bc)
export function setCurrentEditId(v) {
  currentEditId = v;
}

// Miniatura
export let mainImageFile = null;
export let mainImagePreview = "";
export function setMainImageFile(f) {
  mainImageFile = f;
}
export function setMainImagePreview(p) {
  mainImagePreview = p;
}

// Galeria
export let galleryFiles = [];
export let galleryPreview = [];
export function setGalleryFiles(arr) {
  galleryFiles = Array.isArray(arr) ? arr : [];
}
export function setGalleryPreview(arr) {
  galleryPreview = Array.isArray(arr) ? arr : [];
}

// Reset formularza
export function resetImages() {
  mainImageFile = null;
  mainImagePreview = "";
  galleryFiles = [];
  galleryPreview = [];
}

//Entries cache
export let entriesCache = [];
export function setEntriesCache(arr) {
  entriesCache = Array.isArray(arr) ? arr : [];
}

//Lightbox
export let lightboxImages = [];
export let lightboxIndex = 0;

export function setLightboxImages(arr) {
  lightboxImages = Array.isArray(arr) ? arr : [];
}
export function setLightboxIndex(i) {
  lightboxIndex = Number(i) || 0;
}
