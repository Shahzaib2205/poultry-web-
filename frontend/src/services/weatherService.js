"use client";
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY; // for Next.js
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeather(lat, lon) {
  try {
    const url = `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

    const res = await fetch(url);

    if (!res.ok) throw new Error("Weather fetch failed");

    const data = await res.json();

    return {
      temp: data.main.temp,
      humidity: data.main.humidity,
      city: data.name,
      feelsLike: data.main.feels_like,
    };
  } catch (err) {
    console.error("Weather Error:", err);
    return null;
  }
}
