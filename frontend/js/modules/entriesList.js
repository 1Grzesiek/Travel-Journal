import { showView } from "../ui.js";
import { showDetails } from "../details.js";
import { removeEntryById } from "../entries.js";
import { confirmModal } from "../confirmModal.js"


export function setupEntriesList() {
  
}

//Render listy
export function renderEntries(entries = []) {
  const ul = document.getElementById("entriesList");
  ul.innerHTML = "";

  entries.forEach((entry, index) => {
    const li = document.createElement("li");
    li.className = "entry-tile";

    li.innerHTML = `
      <img class="entry-img" src="${entry.imageSrc || ""}">
      <div class="entry-meta">
        <strong>${entry.title}</strong><br>
        <small>${new Date(entry.createdAt).toLocaleString()}</small>
      </div>
      <button class="deleteEntryBtn">Usuń</button>
    `;

    li.onclick = () => {
      showDetails(index);
      showView("details-view");
    };

    //Delete
    const delBtn = li.querySelector(".deleteEntryBtn");

    delBtn.onclick = async (ev) => {
      ev.stopPropagation(); 

      const ok = await confirmModal("Usunąć ten wpis?"); //modal zamiast confirm
      if (!ok) return;

      await removeEntryById(entry._id);

      const mod = await import("../entries.js");
      await mod.refreshEntries();
    };

    ul.appendChild(li);
  });
}
