"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { Card, CardContent } from "@/components/ui/card";
import { Thermometer, Droplet } from "lucide-react";
import { getWeather } from "@/services/weatherService";


export default function HomePage() {

  const [temperature, setTemperature] = useState("--");
  const [humidity, setHumidity] = useState("--");

  useEffect(() => {
    // Lahore Coordinates - change if needed
    getWeather(31.5204, 74.3587).then((res) => {
      if (res) {
        setTemperature(`${res.temp}°C`);
        setHumidity(`${res.humidity}%`);
      }
    });
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-gray-100 p-6">

        <div className="w-full h-44 rounded-lg overflow-hidden shadow-md mb-6">
          <img
            src="/Images/bird 2.png"
            alt="Farm Banner"
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-3xl font-semibold mb-8 text-gray-800">
          Poultry Monitoring
        </h1>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">

          {/* Temperature */}
          <Card className="w-64 bg-white shadow-md">
            <CardContent className="flex flex-col items-center p-6 gap-3">
              <Thermometer size={40} className="text-red-500" />
              <p className="text-sm text-gray-500">Temperature</p>
              <h2 className="text-2xl font-bold text-gray-900">{temperature}</h2>
            </CardContent>
          </Card>

          {/* Humidity */}
          <Card className="w-64 bg-white shadow-md">
            <CardContent className="flex flex-col items-center p-6 gap-3">
              <Droplet size={40} className="text-blue-500" />
              <p className="text-sm text-gray-500">Humidity</p>
              <h2 className="text-2xl font-bold text-gray-900">{humidity}</h2>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
