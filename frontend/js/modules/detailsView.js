import { showView } from "../ui.js";
import { removeEntryById, refreshEntries } from "../entries.js";
import { entriesCache, currentDetailIndex, setCurrentEditId } from "../state.js";
import { fillEditForm } from "./entryForm.js";

export function setupDetailsView() {

  const btnEdit   = document.getElementById("editDetail");
  const btnDelete = document.getElementById("deleteDetail");
  const btnBack   = document.getElementById("backToHistory");

 //Edycja wpisu
  btnEdit.onclick = () => {
    const entry = entriesCache[currentDetailIndex];
    if (!entry) return;

    setCurrentEditId(entry._id);
    fillEditForm(entry);

    showView("add-view");
  };

  //Usuwanie wpisu
  btnDelete.onclick = async () => {
    const entry = entriesCache[currentDetailIndex];
    if (!entry) return;

    if (!confirm("Usunąć ten wpis?")) return;

    await removeEntryById(entry._id);
    await refreshEntries();

    showView("history-view");
  };

  btnBack.onclick = () => {
    showView("history-view");
  };
}
