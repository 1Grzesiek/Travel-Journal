export function confirmModal(message) { //dodanie modal zamiast confirm
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "confirm-overlay";

    const modal = document.createElement("div");
    modal.className = "confirm-modal";

    const text = document.createElement("p");
    text.textContent = message;

    const actions = document.createElement("div");
    actions.className = "confirm-actions";

    const okBtn = document.createElement("button");
    okBtn.textContent = "OK";
    okBtn.className = "danger";

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Anuluj";

    actions.append(cancelBtn, okBtn);
    modal.append(text, actions);
    overlay.append(modal);
    document.body.append(overlay);

    const close = (result) => {
      overlay.remove();
      resolve(result);
    };

    okBtn.onclick = () => close(true);
    cancelBtn.onclick = () => close(false);
    overlay.onclick = (e) => {
      if (e.target === overlay) close(false);
    };
  });
}
