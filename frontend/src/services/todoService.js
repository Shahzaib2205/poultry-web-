const BASE_URL = "http://localhost:3000/todo";

export const todoService = {
  getAll: async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch tasks");
    return res.json();
  },

  getById: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch task");
    return res.json();
  },

  create: async (data) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create task");
    return res.json();
  },

  update: async (id, data) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update task");
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete task");
    // DELETE might return empty response, return id for convenience
    return { id };
  },
};
