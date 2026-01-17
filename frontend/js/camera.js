import { setMainImageFile, setMainImagePreview } from "./state.js";

//obsługa przyciskow aparatu i galerii
export function setupCameraInputs(previewEl, removeBtnEl) {
  const nativeCamera = document.getElementById("nativeCamera");
  const fileInput = document.getElementById("fileInput");

  const handleMainPhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    // podgląd
    previewEl.src = url;
    removeBtnEl.style.display = "flex";

    previewEl.onload = () => { //zwolnienie pamięci
    URL.revokeObjectURL(url);
    };

    // stan
    setMainImageFile(file);
  };

  nativeCamera.onchange = handleMainPhoto;
  fileInput.onchange = handleMainPhoto;
}

export function setupGalleryInputs(callback) {
  const cam = document.getElementById("galleryCamera");
  const gal = document.getElementById("galleryFileInput");

  cam.onchange = (e) => callback(e.target.files || []);
  gal.onchange = (e) => callback(e.target.files || []);
}
