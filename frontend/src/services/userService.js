const BASE_URL = "http://localhost:3000/users"; // Backend URL

export const userService = {
  // CREATE
  async create(userData) {
    try {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      return res.ok ? await res.json() : null;
    } catch (err) {
      console.error("Create User Error:", err);
      return null;
    }
  },

  // READ (Get All Users)
  async getAll() {
    try {
      const res = await fetch(BASE_URL, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return res.ok ? await res.json() : [];
    } catch (err) {
      console.error("Get Users Error:", err);
      return [];
    }
  },

  // READ ONE (by ID)
  async getById(id) {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return res.ok ? await res.json() : null;
    } catch (err) {
      console.error("Get User Error:", err);
      return null;
    }
  },

  // UPDATE
  async update(id, userData) {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      return res.ok ? await res.json() : null;
    } catch (err) {
      console.error("Update User Error:", err);
      return null;
    }
  },

  // DELETE
  async remove(id) {
    try {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      return res.ok;
    } catch (err) {
      console.error("Delete User Error:", err);
      return false;
    }
  },
};
