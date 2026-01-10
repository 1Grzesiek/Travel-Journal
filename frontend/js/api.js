const API_BASE = "https://travel-journal-36fb.onrender.com/api"


function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function send(url, options = {}) {
  const res = await fetch(url, options);

  let data = null;
  try {
    data = await res.json();
  } catch (_) {
    data = null;
  }

  if (!res.ok) {
    throw new Error(data?.message || `Request failed: ${res.status}`);
  }

  return data;
}

//Auth
export function apiRegister(email, password) {
  return send(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
}

export function apiLogin(email, password) {
  return send(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
}

//Entries
export function apiGetEntries() {
  return send(`${API_BASE}/entries`, {
    headers: { ...authHeader() }
  });
}

export function apiCreateEntry(fd) {
  return send(`${API_BASE}/entries`, {
    method: "POST",
    headers: { ...authHeader() },
    body: fd
  });
}

export function apiUpdateEntry(id, fd) {
  return send(`${API_BASE}/entries/${id}`, {
    method: "PUT",
    headers: { ...authHeader() },
    body: fd
  });
}

export function apiDeleteEntry(id) {
  return send(`${API_BASE}/entries/${id}`, {
    method: "DELETE",
    headers: { ...authHeader() }
  });
}
