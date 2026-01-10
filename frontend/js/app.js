import { setupAuth } from "./modules/auth.js";
import { setupEntryForm } from "./modules/entryForm.js";
import { setupLightbox } from "./modules/lightboxInit.js";
import { setupEntriesList } from "./modules/entriesList.js";
import { setupDetailsView } from "./modules/detailsView.js";

import { refreshEntries } from "./entries.js";
import { showView } from "./ui.js";

async function init() {

  // ui
  setupAuth();
  setupEntryForm();
  setupEntriesList();
  setupLightbox();
  setupDetailsView();

  // sw
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  }

  // auth
  const token = localStorage.getItem("token");

  if (!token) {
    showView("login-view");
    return;
  }

  // logowanie
  try {
    const entries = await refreshEntries();
    showView("history-view");

  } catch (err) {
    console.warn("Token invalid, logging out:", err);
    localStorage.removeItem("token");
    showView("login-view");
  }
}

init();
