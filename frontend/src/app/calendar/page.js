"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function CalendarPage() {
  const [events, setEvents] = useState([
    { title: "Feed Chickens", date: "2025-11-11" },
    { title: "Vaccination Day", date: "2025-11-15" },
  ]);

  const handleDateClick = (info) => {
    const title = prompt("Enter event name:");
    if (title) {
      setEvents([...events, { title, date: info.dateStr }]);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-gray-100 p-6">

        {/* TopBar */}
        <TopBar />

        <h1 className="text-3xl font-bold mb-6">Calendar</h1>

        <div className="bg-white shadow rounded-lg p-4">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            dateClick={handleDateClick}
            height="auto"
          />
        </div>
      </div>
    </div>
  );
}
