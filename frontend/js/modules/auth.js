import { apiLogin, apiRegister } from "../api.js";
import { refreshEntries } from "../entries.js";
import { showView } from "../ui.js";

export function setupAuth() {

  const loginBtn     = document.getElementById("loginBtn");
  const registerBtn  = document.getElementById("registerBtn");
  const logoutBtn    = document.getElementById("logoutBtn");

  const goToRegister = document.getElementById("goToRegister");
  const goToLogin    = document.getElementById("goToLogin");

  goToRegister.onclick = () => showView("register-view");
  goToLogin.onclick    = () => showView("login-view");


  //Logoanie
  loginBtn.onclick = async () => {

    const email    = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const data = await apiLogin(email, password);
      if (!data.token) {
        alert(data.message || "Błąd logowania");
        return;
      }

      localStorage.setItem("token", data.token);

      await refreshEntries();
      showView("history-view");

    } catch (err) {
      console.error(err);
      alert("Błąd logowania");
    }
  };

  //Rejestracja
  registerBtn.onclick = async () => {

    const email    = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const password2 = document.getElementById("regPassword2").value;

    if (password !== password2) {
      alert("Hasła muszą być takie same.");
      return;
    }

    try {
      const data = await apiRegister(email, password, name);
      if (!data.token) {
        alert(data.message || "Błąd rejestracji");
        return;
      }

      localStorage.setItem("token", data.token);

      await refreshEntries();
      showView("login-view");

    } catch (err) {
      console.error(err);
      alert("Błąd rejestracji");
    }
  };

  logoutBtn.onclick = () => {
    localStorage.removeItem("token");
    showView("login-view");
  };
}
