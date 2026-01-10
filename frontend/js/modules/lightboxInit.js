import { closeLightbox, nextLightbox, prevLightbox } from "../lightbox.js";

export function setupLightbox(){
  document.getElementById("lightboxClose").onclick = () => closeLightbox();
  document.getElementById("lightboxNext").onclick = () => nextLightbox();
  document.getElementById("lightboxPrev").onclick = () => prevLightbox();
}
