import {
  galleryPreview,
  galleryFiles,
  setGalleryFiles,
  setGalleryPreview
} from "./state.js";

export function renderGalleryPreview(container) {
  if (!container) return;

  container.innerHTML = "";

  galleryPreview.forEach((src, idx) => {
    const item = document.createElement("div");
    item.className = "gallery-item";

    const img = document.createElement("img");
    img.src = src;

    const btn = document.createElement("button");
    btn.className = "removeGalleryPhoto";
    btn.textContent = "✖";

    // usuwanie jednego zdjęcia
    btn.onclick = () => removeGalleryItem(idx, container);

    item.appendChild(img);
    item.appendChild(btn);
    container.appendChild(item);
  });
}

// Usuniecie po id
function removeGalleryItem(index, container) {
  const newFiles = galleryFiles.slice();     
  const newPreview = galleryPreview.slice();

  newFiles.splice(index, 1);
  newPreview.splice(index, 1);

  setGalleryFiles(newFiles);
  setGalleryPreview(newPreview);

  renderGalleryPreview(container);
}
