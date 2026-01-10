import {
  lightboxImages,
  lightboxIndex,
  setLightboxImages,
  setLightboxIndex
} from "./state.js";

const lb = document.getElementById("lightbox");
const imgEl = document.getElementById("lightboxImage");
const btnPrev = document.getElementById("lightboxPrev");
const btnNext = document.getElementById("lightboxNext");
const btnClose = document.getElementById("lightboxClose");
 
//open
export function openLightbox(index = 0, images = []) {
  if (!images.length) return;

  setLightboxImages(images);
  setLightboxIndex(index);

  imgEl.src = lightboxImages[lightboxIndex];
  lb.style.display = "flex";
}

// close
export function closeLightbox() {
  lb.style.display = "none";
  imgEl.src = "";

  // reset stanu
  setLightboxImages([]);
  setLightboxIndex(0);
}

//next
export function nextLightbox() {
  if (!lightboxImages.length) return;

  const newIndex = (lightboxIndex + 1) % lightboxImages.length;
  setLightboxIndex(newIndex);

  imgEl.src = lightboxImages[newIndex];
}

//prev
export function prevLightbox() {
  if (!lightboxImages.length) return;

  const newIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  setLightboxIndex(newIndex);

  imgEl.src = lightboxImages[newIndex];
}

btnPrev.onclick = prevLightbox;
btnNext.onclick = nextLightbox;
btnClose.onclick = closeLightbox;
