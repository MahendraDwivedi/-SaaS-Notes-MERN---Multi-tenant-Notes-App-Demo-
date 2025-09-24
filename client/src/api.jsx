

  const API_BASE = "https://saas-notes-backend-qtzu.onrender.com/api";

// const API_BASE = "https://saa-s-notes-mern-multi-tenant-notes.vercel.app/api"

// 🔹 Auth
export async function login(email, password) {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Login failed");
    return await res.json();
  } catch (err) {
    console.error("Login error:", err);
    throw err;
  }
}

export async function me(token) {
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Unauthorized");
    return await res.json();
  } catch (err) {
    console.error("Me error:", err);
    throw err;
  }
}

// 🔹 Notes CRUD
export async function getNotes(token) {
  try {
    const res = await fetch(`${API_BASE}/notes`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch notes");
    return await res.json();
  } catch (err) {
    console.error("Get notes error:", err);
    throw err;
  }
}

export async function getNote(token, id) {
  try {
    const res = await fetch(`${API_BASE}/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Note not found");
    return await res.json();
  } catch (err) {
    console.error("Get note error:", err);
    throw err;
  }
}

export async function createNote(token, note) {
  try {
    const res = await fetch(`${API_BASE}/notes`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Failed to create note");
    }
    return await res.json();
  } catch (err) {
    console.error("Create note error:", err);
    throw err;
  }
}

export async function updateNote(token, id, note) {
  try {
    const res = await fetch(`${API_BASE}/notes/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    if (!res.ok) throw new Error("Failed to update note");
    return await res.json();
  } catch (err) {
    console.error("Update note error:", err);
    throw err;
  }
}

export async function deleteNote(token, id) {
  try {
    const res = await fetch(`${API_BASE}/notes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to delete");
    return await res.json();
  } catch (err) {
    console.error("Delete note error:", err);
    throw err;
  }
}

// 🔹 Tenant Management
export async function upgradeTenant(token, slug) {
  try {
    const res = await fetch(`${API_BASE}/tenants/${slug}/upgrade`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to upgrade tenant");
    return await res.json();
  } catch (err) {
    console.error("Upgrade tenant error:", err);
    throw err;
  }
}

export async function inviteUser(token, slug, email) {
  try {
    const res = await fetch(`${API_BASE}/tenants/${slug}/invite`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error("Failed to invite user");
    return await res.json();
  } catch (err) {
    console.error("Invite user error:", err);
    throw err;
  }
}

// 🔹 Get Tenant Plan
export async function getTenantPlan(token, slug) {
  try {
    const res = await fetch(`${API_BASE}/tenants/${slug}/plan`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 404) {
      console.warn(`No plan found for tenant ${slug}, defaulting to free`);
      return { plan: "free" }; // 👈 safe fallback
    }
    if (!res.ok) throw new Error("Failed to fetch tenant plan");
    return res.json();
  } catch (err) {
    console.error("Get tenant plan error:", err);
    return { plan: "free" }; // 👈 don’t block app
  }
}
