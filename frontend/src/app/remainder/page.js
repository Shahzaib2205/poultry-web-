"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Check, Search } from "lucide-react";

export default function ReminderPage() {
  const [search, setSearch] = useState("");
  const [reminders, setReminders] = useState([
    { id: 1, title: "Feed Chickens", date: "2025-12-01", time: "08:00 AM", done: false },
    { id: 2, title: "Vaccination", date: "2025-12-02", time: "10:00 AM", done: false },
    { id: 3, title: "Clean Coop", date: "2025-12-03", time: "05:00 PM", done: false },
  ]);

  const [newReminder, setNewReminder] = useState({ title: "", date: "", time: "" });

  const addReminder = () => {
    if (!newReminder.title || !newReminder.date || !newReminder.time) return;
    setReminders([
      ...reminders,
      { id: Date.now(), ...newReminder, done: false }
    ]);
    setNewReminder({ title: "", date: "", time: "" });
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const toggleDone = (id) => {
    setReminders(
      reminders.map(r => r.id === id ? { ...r, done: !r.done } : r)
    );
  };

  const filteredReminders = reminders.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition">
        <TopBar />

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold dark:text-white flex items-center gap-2">
            <Plus size={28} /> Reminders
          </h1>
        </div>

        {/* Search & Add */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex items-center bg-white dark:bg-gray-800 border rounded-lg px-3 py-2 w-full shadow-sm">
            <Search className="text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search reminders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ml-2 w-full bg-transparent outline-none dark:text-white"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <input
              type="text"
              placeholder="Reminder Title"
              value={newReminder.title}
              onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
              className="px-3 py-2 rounded-lg outline-none dark:bg-gray-800 dark:text-white"
            />
            <input
              type="date"
              value={newReminder.date}
              onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
              className="px-3 py-2 rounded-lg outline-none dark:bg-gray-800 dark:text-white"
            />
            <input
              type="time"
              value={newReminder.time}
              onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
              className="px-3 py-2 rounded-lg outline-none dark:bg-gray-800 dark:text-white"
            />
            <Button className="bg-green-600 hover:bg-green-700" onClick={addReminder}>
              Add
            </Button>
          </div>
        </div>

        {/* Reminder List */}
        <Card className="bg-white dark:bg-gray-800 dark:text-white p-4 transition">
          {filteredReminders.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredReminders.map(r => (
                <li
                  key={r.id}
                  className="flex justify-between items-center py-3 px-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition"
                >
                  <div>
                    <p className={'font-medium ${r.done ? "line-through text-gray-400 dark:text-gray-500" : "dark:text-white"}'}>
                      {r.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {r.date} — {r.time}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className={'p-1 ${r.done ? "text-yellow-500 hover:text-yellow-700" : "text-green-500 hover:text-green-700"}'}
                      onClick={() => toggleDone(r.id)}
                    >
                      <Check size={18} />
                    </Button>
                    <Button
                      className="text-red-500 hover:text-red-700 p-1"
                      onClick={() => deleteReminder(r.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center py-10 text-gray-500 dark:text-gray-400">
              No reminders available.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}