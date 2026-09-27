"use client";

import { Search, Mail, Bell } from "lucide-react";

export default function TopBar() {
  return (
    <div className="flex items-center justify-between bg-white px-6 py-4 rounded-lg shadow-sm mb-6">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-1/3">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search task"
          className="ml-2 bg-transparent outline-none text-sm w-full"
        />
        <span className="bg-white text-gray-500 text-xs px-2 py-1 rounded-md border">
          ⌘F
        </span>
      </div>

      {/* Icons + Profile */}
      <div className="flex items-center gap-4">
        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
          <Mail size={18} />
        </button>

        <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
          <Bell size={18} />
        </button>

        <div className="flex items-center gap-3 bg-gray-100 py-2 px-3 rounded-full">
          <img
            src="/Images/bird 2.png"   // Replace with your avatar image
            alt="user"
            className="w-9 h-9 rounded-full"
          />
          <div className="text-sm">
            <p className="font-semibold">Sufian Rafiq</p>
            <p className="text-gray-500 text-xs">sufianrafiq1136@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
