"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { Plus, Trash2, CheckCircle, Search, X, Edit } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { todoService } from "@/services/todoService";

export default function TodoPage() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // add or edit
  const [currentTask, setCurrentTask] = useState({ id: null, title: "", content: "" });

  // Delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });
  const [deleting, setDeleting] = useState(false);

  // Fetch tasks
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await todoService.getAll();
      setTasks(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Open Add modal
  const openAddModal = () => {
    setModalMode("add");
    setCurrentTask({ id: null, title: "", content: "" });
    setModalOpen(true);
  };

  // Open Edit modal
  const openEditModal = (task) => {
    setModalMode("edit");
    setCurrentTask({ ...task });
    setModalOpen(true);
  };

  // Save Add/Edit
  const saveTask = async () => {
    if (!currentTask.title.trim()) return;
    try {
      if (modalMode === "add") {
        const created = await todoService.create(currentTask);
        setTasks((prev) => [...prev, created]);
      } else if (modalMode === "edit") {
        const updated = await todoService.update(currentTask.id, currentTask);
        setTasks((prev) => prev.map((t) => (t.id === currentTask.id ? updated : t)));
      }
      setModalOpen(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Delete task
  const confirmDelete = async () => {
    if (!deleteConfirm.id) return;
    setDeleting(true);
    try {
      await todoService.delete(deleteConfirm.id);
      setTasks((prev) => prev.filter((t) => t.id !== deleteConfirm.id));
      setDeleteConfirm({ open: false, id: null });
    } catch (err) {
      console.error(err.message);
    } finally {
      setDeleting(false);
    }
  };

  // Toggle complete (optimistic update)
  const toggleComplete = async (task) => {
    try {
      const updated = await todoService.update(task.id, {
        ...task,
        completed: !task.completed,
      });
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    } catch (err) {
      console.error(err.message);
    }
  };

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100 dark:bg-[#0d1117] p-6 transition">
        <TopBar />

        <h1 className="text-3xl font-bold dark:text-white mb-6">To-Do Tasks</h1>

        {/* Add Task Button */}
        <div className="flex mb-5 gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2" onClick={openAddModal}>
            <Plus size={18} /> Add New Task
          </Button>
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-white dark:bg-[#1c1f26] border rounded-xl px-3 py-2 mb-6 shadow-sm">
          <Search className="text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-2 w-full bg-transparent outline-none dark:text-white"
          />
        </div>

        {/* Task List */}
        <Card className="p-4 bg-white dark:bg-[#1c1f26]">
          {filteredTasks.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTasks.map((t) => (
                <li
                  key={t.id}
                  className="flex justify-between items-center py-3 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleComplete(t)}
                      className={t.completed ? "text-green-500" : "text-gray-400 hover:text-green-500"}
                    >
                      <CheckCircle size={22} />
                    </button>
                    <p className={`dark:text-white ${t.completed ? "line-through text-gray-500" : ""}`}>
                      {t.title}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button className="text-blue-500 hover:text-blue-700 p-1" onClick={() => openEditModal(t)}>
                      <Edit size={18} />
                    </Button>
                    <Button
                      className="text-red-500 hover:text-red-700 p-1"
                      onClick={() => setDeleteConfirm({ open: true, id: t.id })}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center py-10 text-gray-500 dark:text-gray-400">
              No tasks found.
            </p>
          )}
        </Card>

        {/* Add/Edit Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-lg relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-white"
                onClick={() => setModalOpen(false)}
              >
                <X size={20} />
              </button>
              <h2 className="text-xl font-bold mb-4 dark:text-white">
                {modalMode === "add" ? "Add New Task" : "Edit Task"}
              </h2>
              <input
                type="text"
                placeholder="Task Title"
                value={currentTask.title}
                onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
                className="w-full mb-3 px-3 py-2 rounded-lg outline-none dark:bg-gray-700 dark:text-white"
              />
              <textarea
                placeholder="Task Content"
                value={currentTask.content || ""}
                onChange={(e) => setCurrentTask({ ...currentTask, content: e.target.value })}
                className="w-full mb-3 px-3 py-2 rounded-lg outline-none dark:bg-gray-700 dark:text-white"
              />
              <div className="flex justify-end gap-2 mt-4">
                <Button onClick={() => setModalOpen(false)} variant="outline">Cancel</Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={saveTask}>
                  {modalMode === "add" ? "Add" : "Save"}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm.open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-lg">
              <p className="text-lg mb-4 dark:text-white">Are you sure you want to delete this task?</p>
              <div className="flex justify-end gap-2">
                <Button onClick={() => setDeleteConfirm({ open: false, id: null })} variant="outline">
                  Cancel
                </Button>
                <Button
                  className="bg-red-600 hover:bg-red-700"
                  onClick={confirmDelete}
                  disabled={deleting}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
