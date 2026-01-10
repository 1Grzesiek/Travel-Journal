import {
  apiGetEntries,
  apiCreateEntry,
  apiUpdateEntry,
  apiDeleteEntry
} from "./api.js";

import { bufferToDataURL } from "./utils.js";
import { setEntriesCache } from "./state.js";
import { renderEntries } from "./modules/entriesList.js";


//normalizacja danych z bc
function normalizeEntry(e) {
  return {
    ...e,
    imageSrc: e.image ? bufferToDataURL(e.image) : "",
    gallerySrc: (e.gallery || []).map(g => bufferToDataURL(g))
  };
}


//pobieranie wpisow
export async function loadEntries() {
  const raw = await apiGetEntries();
  const normalized = raw.map(normalizeEntry);

  setEntriesCache(normalized);
  return normalized;
}


//create/update
export async function createOrUpdateEntry(entryObj, editId = null) {
  const fd = new FormData();

  fd.append("title", entryObj.title);
  fd.append("desc", entryObj.desc);
  fd.append("date", entryObj.date);
  fd.append("location", entryObj.location || "");

  if (entryObj.imageFile) {
    fd.append("image", entryObj.imageFile);
  } else if (entryObj.removeMainImage) {
    fd.append("removeMainImage", "true");
  }

  (entryObj.galleryFiles || []).forEach(f =>
    fd.append("gallery", f)
  );

  if (entryObj.removeGalleryIndexes?.length) {
    fd.append("removeGalleryIndexes", JSON.stringify(entryObj.removeGalleryIndexes));
  }

  return editId
    ? apiUpdateEntry(editId, fd)
    : apiCreateEntry(fd);
}


//usuniecie wpisu
export async function removeEntryById(id) {
  return apiDeleteEntry(id);
}

//refresh i render
export async function refreshEntries() {
  const entries = await loadEntries();
  renderEntries(entries);
  return entries;
}
