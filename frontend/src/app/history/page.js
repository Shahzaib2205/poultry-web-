"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { Search, Trash2, History } from "lucide-react";
import { Card } from "@/components/ui/card";

// Helper function to get last 7 days
const getLast7Days = () => {
  const today = new Date();
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push({
      id: i + 1,
      date: d.toISOString().split("T")[0],
      temperature: (20 + Math.random() * 10).toFixed(1), // Example temp 20-30°C
      humidity: (50 + Math.random() * 20).toFixed(1),    // Example humidity 50-70%
    });
  }
  return days;
};

export default function HistoryPage() {
  const [search, setSearch] = useState("");
  const [historyItems, setHistoryItems] = useState(getLast7Days());

  const deleteHistory = (id) => {
    setHistoryItems(historyItems.filter(item => item.id !== id));
  };

  const filteredHistory = historyItems.filter(item =>
    item.date.includes(search)
  );

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-gray-100 dark:bg-[#0d1117] p-6 transition">
        <TopBar />

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold dark:text-white flex items-center gap-2">
            <History size={30} /> Last 7 Days History
          </h1>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center bg-white dark:bg-[#1c1f26] border rounded-lg px-3 py-2 w-full shadow-sm">
            <Search className="text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search by date (YYYY-MM-DD)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="ml-2 w-full bg-transparent outline-none dark:text-white"
            />
          </div>
        </div>

        {/* History List */}
        <Card className="bg-white dark:bg-[#1c1f26] p-4">
          {filteredHistory.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredHistory.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center py-3 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition"
                >
                  <div>
                    <p className="font-medium dark:text-white">
                      {item.date}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Temperature: {item.temperature} °C | Humidity: {item.humidity} %
                    </p>
                  </div>

                  <button
                    onClick={() => deleteHistory(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={22} />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center py-10 text-gray-500 dark:text-gray-400">
              No history available.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}