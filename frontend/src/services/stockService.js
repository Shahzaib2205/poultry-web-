const BASE_URL = "http://localhost:3000/stocks"; // change port if needed

export const stockService = {
  getAll: async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch stocks");
    return await res.json();
  },

  getById: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error("Stock not found");
    return await res.json();
  },

  create: async (data) => {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create stock");
    return await res.json();
  },

  update: async (id, data) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update stock");
    return await res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete stock");
   
  },
};
