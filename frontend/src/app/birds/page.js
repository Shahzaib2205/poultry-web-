"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { birdService } from "@/services/birdService";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2, Pencil } from "lucide-react";

export default function BirdsCrudPage() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form States
  const [formData, setFormData] = useState({
    breedname: "",
    totalbirds: "",
    dateAdded: "",
    university: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch Birds From Backend
  const fetchBatches = async () => {
    try {
      setLoading(true);
      const data = await birdService.getAll();
      setBatches(data);
    } catch (err) {
      console.error("Fetch Birds Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  // Handle Form Submit (Create or Update)
  const handleSubmit = async () => {
    if (!formData.breedname || !formData.totalbirds || !formData.dateAdded || !formData.university) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editingId) {
        // Update
        const updated = await birdService.update(editingId, {
          breedname: formData.breedname,
          totalbirds: parseInt(formData.totalbirds),
          dateAdded: formData.dateAdded,
          university: formData.university,
        });
        setBatches(batches.map((b) => (b.id === editingId ? updated : b)));
        setEditingId(null);
      } else {
        // Create
        const created = await birdService.create({
          breedname: formData.breedname,
          totalbirds: parseInt(formData.totalbirds),
          dateAdded: formData.dateAdded,
          university: formData.university,
        });
        setBatches([...batches, created]);
      }

      // Reset form
      setFormData({
        breedname: "",
        totalbirds: "",
        dateAdded: "",
        university: "",
      });
    } catch (err) {
      console.error("Submit Error:", err);
    }
  };

  // Edit Batch
  const handleEdit = (batch) => {
    setFormData({
      breedname: batch.breedname,
      totalbirds: batch.totalbirds,
      dateAdded: batch.dateAdded.split("T")[0],
      university: batch.university,
    });
    setEditingId(batch.id);
  };

  // Delete Batch
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this batch?")) return;

    try {
      const deleted = await birdService.delete(id);
      if (deleted) setBatches(batches.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gray-100 dark:bg-[#0d1117] p-6 transition">
        <TopBar />

        {/* Page Header */}
        <div className="bg-white dark:bg-[#1c1f26] shadow rounded-xl p-6 mb-6">
          <h1 className="text-3xl font-bold dark:text-white">Bird Batch Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your chicken batches, breeds, and inventory.
          </p>
        </div>

        {/* Add / Edit Form */}
        <Card className="bg-white dark:bg-[#1c1f26] shadow-md mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">
              {editingId ? "Edit Batch" : "Add New Batch"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Breed Name"
                value={formData.breedname}
                onChange={(e) => setFormData({ ...formData, breedname: e.target.value })}
                className="border dark:border-gray-600 dark:bg-[#0d1117] dark:text-white p-3 rounded-lg w-full"
              />
              <input
                type="number"
                placeholder="Total Birds"
                value={formData.totalbirds}
                onChange={(e) => setFormData({ ...formData, totalbirds: e.target.value })}
                className="border dark:border-gray-600 dark:bg-[#0d1117] dark:text-white p-3 rounded-lg w-full"
              />
              <input
                type="date"
                placeholder="Date Added"
                value={formData.dateAdded}
                onChange={(e) => setFormData({ ...formData, dateAdded: e.target.value })}
                className="border dark:border-gray-600 dark:bg-[#0d1117] dark:text-white p-3 rounded-lg w-full"
              />
              <input
                type="text"
                placeholder="University"
                value={formData.university}
                onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                className="border dark:border-gray-600 dark:bg-[#0d1117] dark:text-white p-3 rounded-lg w-full"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition"
            >
              <Plus size={20} />
              {editingId ? "Update Batch" : "Add Batch"}
            </button>
          </CardContent>
        </Card>

        {/* Batches List */}
        <div className="space-y-4">
          {loading ? (
            <Card className="bg-white dark:bg-[#1c1f26] p-6">
              <p className="text-center text-gray-500 dark:text-gray-400">Loading Batches...</p>
            </Card>
          ) : batches.length === 0 ? (
            <Card className="bg-white dark:bg-[#1c1f26] p-6">
              <p className="text-center text-gray-500 dark:text-gray-400">No batches found</p>
            </Card>
          ) : (
            batches.map((batch) => (
              <Card key={batch.id} className="bg-white dark:bg-[#1c1f26] shadow-md">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Batch ID</p>
                        <p className="font-semibold dark:text-white">{batch.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Breed</p>
                        <p className="font-semibold dark:text-white">{batch.breedname}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Birds</p>
                        <p className="font-semibold dark:text-white">{batch.totalbirds}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Added On</p>
                        <p className="font-semibold dark:text-white">
                          {new Date(batch.dateAdded).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">University</p>
                        <p className="font-semibold dark:text-white">{batch.university}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(batch)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex gap-2 items-center transition"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(batch.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex gap-2 items-center transition"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
