const BASE_URL = "http://localhost:3000/birds"; // replace with your backend URL

export const birdService = {
  // CREATE a new bird entry
  async create(birdData) {
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(birdData),
      });
      return await res.json();
    } catch (err) {
      console.error("Create Bird Error:", err);
      return null;
    }
  },

  // READ all birds
  async getAll() {
    try {
      const res = await fetch(BASE_URL);
      return await res.json();
    } catch (err) {
      console.error("Get Birds Error:", err);
      return [];
    }
  },

  // READ a single bird by ID
  async getById(id) {
    try {
      const res = await fetch(`${BASE_URL}/${id}`);
      return await res.json();
    } catch (err) {
      console.error("Get Bird By ID Error:", err);
      return null;
    }
  },

  // UPDATE a bird by ID
  async update(id, birdData) {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT", // or PATCH depending on your backend
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(birdData),
      });
      return await res.json();
    } catch (err) {
      console.error("Update Bird Error:", err);
      return null;
    }
  },

  // DELETE a bird by ID
  async delete(id) {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      return res.ok;
    } catch (err) {
      console.error("Delete Bird Error:", err);
      return false;
    }
  },
};
