import { setupCameraInputs, setupGalleryInputs } from "../camera.js";
import { renderGalleryPreview } from "../gallery.js";
import { getLocation } from "../location.js";
import { createOrUpdateEntry, refreshEntries } from "../entries.js";
import { showToast } from "../toast.js"; //zamiast alert
import { showView } from "../ui.js";

import {
  mainImageFile, mainImagePreview,
  galleryFiles, galleryPreview,
  currentEditId, entriesCache,

  setMainImageFile, setMainImagePreview,
  setGalleryFiles, setGalleryPreview,
  resetImages, setCurrentEditId
} from "../state.js";


const previewEl = document.getElementById("preview");
const removeMainBtn = document.getElementById("removePhoto");
const galleryContainer = document.getElementById("gallery");

let removeMainImageFlag = false;

export function setupEntryForm() {
  initNewEntryButton();
  initNavigationButtons();

  initPhotoModal();
  initGalleryModal();

  initCameraInputs();
  initGalleryInputs();

  document.getElementById("saveEntry").onclick = saveHandler;
}

function initNewEntryButton() {
  const btn = document.getElementById("addEntryBtn");
  if (!btn) return;

  btn.onclick = () => {
    setCurrentEditId(null);
    resetForm();
    showView("add-view");
  };
}

function initNavigationButtons() {
  document.getElementById("cancelAdd").onclick = () => showView("history-view");
  document.getElementById("backToHistory").onclick = () => showView("history-view");
}

function initPhotoModal() {
  const modal = document.getElementById("photoModal");

  document.getElementById("changePhotoBtn").onclick = () => modal.style.display = "flex";
  document.getElementById("modalClose").onclick = () => modal.style.display = "none";

  document.getElementById("modalCamera").onclick = () => {
    modal.style.display = "none";
    document.getElementById("nativeCamera").click();
  };

  document.getElementById("modalGallery").onclick = () => {
    modal.style.display = "none";
    document.getElementById("fileInput").click();
  };
}

function initGalleryModal() {
  const modal = document.getElementById("galleryModal");

  document.getElementById("addGalleryPhotos").onclick = () => modal.style.display = "flex";
  document.getElementById("galleryModalClose").onclick = () => modal.style.display = "none";

  document.getElementById("galleryModalCamera").onclick = () => {
    modal.style.display = "none";
    document.getElementById("galleryCamera").click();
  };

  document.getElementById("galleryModalGallery").onclick = () => {
    modal.style.display = "none";
    document.getElementById("galleryFileInput").click();
  };
}

function initCameraInputs() {
  setupCameraInputs(previewEl, removeMainBtn);

  removeMainBtn.onclick = () => {
    previewEl.src = "";
    removeMainBtn.style.display = "none";
    removeMainImageFlag = true;
    setMainImageFile(null);
    setMainImagePreview("");
  };
}

function initGalleryInputs() {
  setupGalleryInputs(handleGalleryPhotos);
}

//Galreia
function handleGalleryPhotos(files) {
  const updatedFiles = [...galleryFiles];
  const updatedPreview = [...galleryPreview];

  for (let f of files) {
    const url = URL.createObjectURL(f);

    updatedFiles.push(f);
    updatedPreview.push(url);

    const img = new Image();
    img.src = url;
    img.onload = () => URL.revokeObjectURL(url); //zwolnienie pamięci
  }

  setGalleryFiles(updatedFiles);
  setGalleryPreview(updatedPreview);

  renderGalleryPreview(galleryContainer);
}




//zapis
async function saveHandler() {
  const title = document.getElementById("title").value.trim();
  const desc = document.getElementById("desc").value.trim();

  if (!title || !desc) return showToast("Wpisz tytuł oraz opis"); //toast zamiast alert

  let coords;
  try { coords = await getLocation(); }
  catch { coords = { latitude: 0, longitude: 0 }; }

  const removeGalleryIndexes = getRemovedGalleryIndexes();

  const entryObj = prepareEntryObject(coords, removeGalleryIndexes);

  await createOrUpdateEntry(entryObj, currentEditId);

  resetForm();
  await refreshEntries();
  showView("history-view");
}

function getRemovedGalleryIndexes() {
  if (!currentEditId) return [];

  const entry = entriesCache.find(e => e._id === currentEditId);
  if (!entry) return [];

  const removed = [];

  entry.gallerySrc.forEach((src, idx) => {
    if (!galleryPreview.includes(src)) removed.push(idx);
  });

  return removed;
}

function prepareEntryObject(coords, removedIndexes) {
  return {
    title: document.getElementById("title").value.trim(),
    desc: document.getElementById("desc").value.trim(),
    date: new Date().toISOString(),
    location: `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`,

    imageFile: mainImageFile || null,
    galleryFiles: galleryFiles,

    removeMainImage: removeMainImageFlag,
    removeGalleryIndexes: removedIndexes
  };
}


//reset
function resetForm() {
  document.getElementById("title").value = "";
  document.getElementById("desc").value = "";

  previewEl.src = "";
  removeMainBtn.style.display = "none";
  galleryContainer.innerHTML = "";

  removeMainImageFlag = false;


  resetImages(); 
  setGalleryFiles([]);     
  setGalleryPreview([]);

  setCurrentEditId(null);
}

export function fillEditForm(entry) {
  setCurrentEditId(entry._id);

  document.getElementById("title").value = entry.title;
  document.getElementById("desc").value = entry.desc;

  previewEl.src = entry.imageSrc || "";
  setMainImagePreview(entry.imageSrc || "");
  setMainImageFile(null);
  removeMainBtn.style.display = entry.imageSrc ? "flex" : "none";

  setGalleryFiles([]);
  setGalleryPreview([...entry.gallerySrc]);

  renderGalleryPreview(galleryContainer);

  removeMainImageFlag = false;
}
