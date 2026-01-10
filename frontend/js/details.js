import { setCurrentDetailIndex, entriesCache } from "./state.js";
import { openLightbox } from "./lightbox.js";

export function showDetails(index) {
  setCurrentDetailIndex(index);

  const entry = entriesCache[index];
  if (!entry) return;

  fillDetailFields(entry);
  renderDetailGallery(entry.gallerySrc);
}
//wypelnianie
function fillDetailFields(entry) {
  document.getElementById("detailTitle").textContent = entry.title;
  document.getElementById("detailImage").src = entry.imageSrc || "";
  document.getElementById("detailDesc").textContent = entry.desc;
  document.getElementById("detailLocation").textContent = entry.location || "";

  const created = entry.createdAt ? new Date(entry.createdAt) : null;
  document.getElementById("detailDate").textContent =
    created ? created.toLocaleString() : "";
}

//szczegoly galerii
function renderDetailGallery(gallerySrc = []) {
  const container = document.getElementById("detailGallery");
  container.innerHTML = "";

  gallerySrc.forEach((src, idx) => {
    const img = document.createElement("img");
    img.src = src;
    img.onclick = () => openLightbox(idx, gallerySrc);
    container.appendChild(img);
  });
}
