const API_URL = "http://localhost:3001/users";

export async function login(email, password) {
  const res = await fetch(API_URL);
  const users = await res.json();

  const found = users.find(
    u => u.email === email && u.passwordHash === password
  );

  if (!found) return null;

  localStorage.setItem("authUser", JSON.stringify(found));
  return found;
}

export async function registerUser(user) {
  const res = await fetch(API_URL);
  const users = await res.json();

  if (users.some(u => u.email === user.email)) {
    return { error: "Email už existuje" };
  }

  const newUser = {
    ...user,
    id: "user" + (users.length + 1),
    createdAt: new Date().toISOString()
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser)
  });

  return { success: true };
}

export function logout() {
  localStorage.removeItem("authUser");
}

export function getUser() {
  const data = localStorage.getItem("authUser");
  return data ? JSON.parse(data) : null;
}
