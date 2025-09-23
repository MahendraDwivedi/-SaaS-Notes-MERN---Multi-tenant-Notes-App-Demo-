// const API_BASE = process.env.REACT_APP_API_URL || '/api';

// export async function login(email, password) {
//   const res = await fetch(`${API_BASE}/auth/login`, {
//     method: 'POST',
//     headers: { 'Content-Type':'application/json' },
//     body: JSON.stringify({ email, password })
//   });
//   if (!res.ok) {
//     const data = await res.json().catch(()=>({ error: 'unknown' }));
//     throw new Error(data.error || 'Login failed');
//   }
//   return res.json();
// }

// export async function me(token) {
//   const res = await fetch(`${API_BASE}/auth/me`, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   if (!res.ok) throw new Error('Failed to fetch user');
//   return res.json();
// }

// export async function getNotes(token) {
//   const res = await fetch(`${API_BASE}/notes`, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   if (!res.ok) throw new Error('Failed to fetch notes');
//   return res.json();
// }

// export async function createNote(token, note) {
//   const res = await fetch(`${API_BASE}/notes`, {
//     method: 'POST',
//     headers: { Authorization: `Bearer ${token}`, 'Content-Type':'application/json' },
//     body: JSON.stringify(note)
//   });
//   if (!res.ok) {
//     const data = await res.json().catch(()=>({ error: 'unknown' }));
//     throw new Error(data.error || 'Failed to create note');
//   }
//   return res.json();
// }

// export async function deleteNote(token, id) {
//   const res = await fetch(`${API_BASE}/notes/${id}`, {
//     method: 'DELETE',
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   if (!res.ok) throw new Error('Failed to delete');
//   return res.json();
// }

// export async function upgradeTenant(token, tenantSlug) {
//   const res = await fetch(`${API_BASE}/tenants/${tenantSlug}/upgrade`, {
//     method: 'POST',
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   if (!res.ok) {
//     const data = await res.json().catch(()=>({ error: 'unknown' }));
//     throw new Error(data.error || 'Failed to upgrade');
//   }
//   return res.json();
// }


// const API_BASE = "http://localhost:4000/api";

// // existing login
// export async function login(email, password) {
//   const res = await fetch(`${API_BASE}/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });
//   if (!res.ok) throw new Error("Login failed");
//   return res.json();
// }

// export async function me(token) {
//   const res = await fetch(`${API_BASE}/auth/me`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) throw new Error("Unauthorized");
//   return res.json();
// }

// // 🔹 Notes CRUD
// export async function getNotes(token) {
//   const res = await fetch(`${API_BASE}/notes`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) throw new Error("Failed to fetch notes");
//   return res.json();
// }


// export async function getNote(token, id) {
//   const res = await fetch(`${API_BASE}/notes/${id}`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) throw new Error("Note not found");
//   return res.json();
// }

// export async function createNote(token, note) {
//   const res = await fetch(`${API_BASE}/notes`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(note),
//   });
//   if (!res.ok) {
//     const data = await res.json().catch(() => ({}));
//     throw new Error(data.error || "Failed to create note");
//   }
//   return res.json();
// }

// export async function updateNote(token, id, note) {
//   const res = await fetch(`${API_BASE}/notes/${id}`, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(note),
//   });
//   if (!res.ok) throw new Error("Failed to update note");
//   return res.json();
// }

// export async function deleteNote(token, id) {
//   const res = await fetch(`${API_BASE}/notes/${id}`, {
//     method: "DELETE",
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) throw new Error("Failed to delete");
//   return res.json();
// }

// // 🔹 Tenant Management
// export async function upgradeTenant(token, slug) {
//   const res = await fetch(`${API_BASE}/tenants/${slug}/upgrade`, {
//     method: "POST",
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) throw new Error("Failed to upgrade tenant");
//   return res.json();
// }

// export async function inviteUser(token, slug, email) {
//   const res = await fetch(`${API_BASE}/tenants/${slug}/invite`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email }),
//   });
//   if (!res.ok) throw new Error("Failed to invite user");
//   return res.json();
// }


const API_BASE = "http://localhost:4000/api";

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
