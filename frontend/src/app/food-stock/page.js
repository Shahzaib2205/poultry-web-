"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Edit, Search, X } from "lucide-react";
import { stockService } from "@/services/stockService";

export default function FoodStockPage() {
  const [search, setSearch] = useState("");
  const [stockItems, setStockItems] = useState([]);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentItem, setCurrentItem] = useState({
    id: null,
    productName: "",
    quantity: "",
    unit: "kg",
    quiz: ""
  });

  // Delete state
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });
  const [deleting, setDeleting] = useState(false);

  // Fetch stocks on mount
  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const data = await stockService.getAll();
      setStockItems(data);
    } catch (err) {
      console.error("Failed to fetch stocks:", err.message);
    }
  };

  const openAddModal = () => {
    setModalMode("add");
    setCurrentItem({
      id: null,
      productName: "",
      quantity: "",
      unit: "kg",
      quiz: ""
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setModalMode("edit");
    setCurrentItem({
      ...item,
      quantity: item.quantity.toString(),
      quiz: item.quiz || ""
    });
    setModalOpen(true);
  };

  const saveItem = async () => {
    if (!currentItem.productName || !currentItem.quantity) {
      alert("Please fill all required fields");
      return;
    }

    try {
      if (modalMode === "add") {
        const created = await stockService.create({
          productName: currentItem.productName,
          quantity: Number(currentItem.quantity),
          quiz: currentItem.quiz
        });
        setStockItems((prev) => [...prev, created]);
      } else {
        const updated = await stockService.update(currentItem.id, {
          productName: currentItem.productName,
          quantity: Number(currentItem.quantity),
          quiz: currentItem.quiz
        });
        setStockItems((prev) =>
          prev.map((item) => (item.id === currentItem.id ? updated : item))
        );
      }
      setModalOpen(false);
    } catch (err) {
      console.error("Failed to save stock:", err.message);
      alert("Error saving stock. Check console.");
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirm.id) return;
    setDeleting(true);
    try {
      await stockService.delete(deleteConfirm.id);
      setStockItems((prev) => prev.filter((item) => item.id !== deleteConfirm.id));
      setDeleteConfirm({ open: false, id: null });
    } catch (err) {
      console.error("Failed to delete stock:", err.message);
      alert("Error deleting stock. Check console.");
    } finally {
      setDeleting(false);
    }
  };

  const filteredStock = stockItems.filter((item) =>
    item.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition">
        <TopBar />

        <h1 className="text-3xl font-bold mb-6 dark:text-white flex items-center gap-2">
          <Plus size={28} /> Food Stock
        </h1>

        {/* Search + Add */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex items-center bg-white dark:bg-gray-800 border rounded-lg px-3 py-2 w-full shadow-sm">
            <Search className="text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ml-2 w-full bg-transparent outline-none dark:text-white"
            />
          </div>
          <Button className="bg-green-600 hover:bg-green-700" onClick={openAddModal}>
            Add New Item
          </Button>
        </div>

        {/* Stock Table */}
        <Card className="bg-white dark:bg-gray-800 dark:text-white p-4 transition">
          {filteredStock.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredStock.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center py-3 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition"
                >
                  <div>
                    <p className="font-medium dark:text-white">{item.productName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.quantity} {item.unit} | Quiz: {item.quiz}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button className="text-blue-500 hover:text-blue-700 p-1" onClick={() => openEditModal(item)}>
                      <Edit size={18} />
                    </Button>
                    <Button className="text-red-500 hover:text-red-700 p-1" onClick={() => setDeleteConfirm({ open: true, id: item.id })}>
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center py-10 text-gray-500 dark:text-gray-400">No food stock available.</p>
          )}
        </Card>

        {/* Add/Edit Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-lg relative">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-white" onClick={() => setModalOpen(false)}>
                <X size={20} />
              </button>
              <h2 className="text-xl font-bold mb-4 dark:text-white">{modalMode === "add" ? "Add New Item" : "Edit Item"}</h2>
              <input type="text" placeholder="Food Name" value={currentItem.productName} onChange={(e) => setCurrentItem({ ...currentItem, productName: e.target.value })} className="w-full mb-3 px-3 py-2 rounded-lg outline-none dark:bg-gray-700 dark:text-white" />
              <input type="number" placeholder="Quantity" value={currentItem.quantity} onChange={(e) => setCurrentItem({ ...currentItem, quantity: e.target.value })} className="w-full mb-3 px-3 py-2 rounded-lg outline-none dark:bg-gray-700 dark:text-white" />
              <input type="text" placeholder="Quiz" value={currentItem.quiz} onChange={(e) => setCurrentItem({ ...currentItem, quiz: e.target.value })} className="w-full mb-3 px-3 py-2 rounded-lg outline-none dark:bg-gray-700 dark:text-white" />
              <div className="flex justify-end gap-2 mt-4">
                <Button onClick={() => setModalOpen(false)} variant="outline">Cancel</Button>
                <Button className="bg-green-600 hover:bg-green-700" onClick={saveItem}>{modalMode === "add" ? "Add" : "Save"}</Button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm.open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-lg">
              <p className="text-lg mb-4 dark:text-white">Are you sure you want to delete this item?</p>
              <div className="flex justify-end gap-2">
                <Button onClick={() => setDeleteConfirm({ open: false, id: null })} variant="outline">Cancel</Button>
                <Button className="bg-red-600 hover:bg-red-700" onClick={confirmDelete} disabled={deleting}>Delete</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
