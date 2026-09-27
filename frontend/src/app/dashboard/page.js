"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, ClipboardList, Calendar, Thermometer, Droplet, Bird, Plus } from "lucide-react";
import { getWeather } from "@/services/weatherService";
import { birdService } from "@/services/birdService";
import { todoService } from "@/services/todoService";
import { userService } from "@/services/userService";

export default function HomePage() {
  const [weather, setWeather] = useState({ temp: "--", humidity: "--" });
  const [totalBirds, setTotalBirds] = useState("---");
  const [pendingTasks, setPendingTasks] = useState("---");
  const [totalUsers, setTotalUsers] = useState("---");

  // User form states
  const [showUserForm, setShowUserForm] = useState(false);
  const [userFormData, setUserFormData] = useState({ name: "", email: "", role: "team member" });
  const [submittingUser, setSubmittingUser] = useState(false);

  // Task form states
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskFormData, setTaskFormData] = useState({ title: "", content: "" });
  const [submittingTask, setSubmittingTask] = useState(false);

  const roles = ["admin", "team member", "shift incharge", "sweeper", "worker", "helper"];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    // Weather
    const weatherData = await getWeather(31.5204, 74.3587);
    if (weatherData) setWeather({ temp: weatherData.temp, humidity: weatherData.humidity });

    // Birds
    const birds = await birdService.getAll();
    if (birds && birds.length) {
      const total = birds.reduce((sum, bird) => sum + bird.totalbirds, 0);
      setTotalBirds(total);
    } else setTotalBirds(0);

    // Tasks
    const tasks = await todoService.getAll();
    if (tasks && tasks.length) {
      const pending = tasks.filter(task => !task.completed).length;
      setPendingTasks(pending);
    } else setPendingTasks(0);

    // Users
    const users = await userService.getAll();
    if (users && users.length) {
      setTotalUsers(users.length);
    } else setTotalUsers(0);
  };

  // Add User
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    if (!userFormData.name || !userFormData.email) return;

    try {
      setSubmittingUser(true);
      const created = await userService.create(userFormData);
      if (created) {
        alert("User added successfully!");
        fetchDashboardData();
        setShowUserForm(false);
        setUserFormData({ name: "", email: "", role: "team member" });
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add user");
    } finally {
      setSubmittingUser(false);
    }
  };

  // Add Task
  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    if (!taskFormData.title) return;

    try {
      setSubmittingTask(true);
      const created = await todoService.create(taskFormData);
      if (created) {
        alert("Task added successfully!");
        fetchDashboardData();
        setShowTaskForm(false);
        setTaskFormData({ title: "", content: "" });
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add task");
    } finally {
      setSubmittingTask(false);
    }
  };

  // View Calendar placeholder
  const handleViewCalendar = () => {
    alert("View Calendar clicked! Integrate your calendar page/modal here.");
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gray-100 dark:bg-[#0d1117] p-6 transition">
        <TopBar />

        {/* Welcome Section */}
        <div className="bg-white dark:bg-[#1c1f26] shadow rounded-xl p-6 mb-6">
          <h1 className="text-3xl font-bold dark:text-white">Welcome Back 👋</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track your farm activity, tasks, users and feeding schedule easily.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="bg-white dark:bg-[#1c1f26] p-4 shadow-md">
            <CardContent className="flex items-center gap-4">
              <Thermometer size={40} className="text-red-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Temperature</p>
                <h2 className="text-2xl font-bold dark:text-white">{weather.temp} °C</h2>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#1c1f26] p-4 shadow-md">
            <CardContent className="flex items-center gap-4">
              <Droplet size={40} className="text-blue-500" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
                <h2 className="text-2xl font-bold dark:text-white">{weather.humidity} %</h2>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#1c1f26] p-4 shadow-md">
            <CardContent className="flex items-center gap-4">
              <Bird size={40} className="text-yellow-600" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Chickens</p>
                <h2 className="text-2xl font-bold dark:text-white">{totalBirds}</h2>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#1c1f26] p-4 shadow-md">
            <CardContent className="flex items-center gap-4">
              <ClipboardList size={40} className="text-green-600" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pending Tasks</p>
                <h2 className="text-2xl font-bold dark:text-white">{pendingTasks}</h2>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-[#1c1f26] p-4 shadow-md">
            <CardContent className="flex items-center gap-4">
              <Bell size={40} className="text-purple-600" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
                <h2 className="text-2xl font-bold dark:text-white">{totalUsers}</h2>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3 dark:text-white">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => setShowUserForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-4 flex items-center justify-center gap-2 transition"
            >
              <Bell size={20} /> Add User
            </button>

            <button

              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-4 flex items-center justify-center gap-2 transition"
            >
              <Link href="/calendar" className="flex items-center gap-3 p-2 rounded-md hover:cursor-pointer">
                <Calendar size={20} /> View Calendar
              </Link>
              
            </button>

            <button
              onClick={() => setShowTaskForm(true)}
              className="bg-gray-800 hover:bg-gray-900 text-white rounded-lg p-4 flex items-center justify-center gap-2 transition"
            >
              <Plus size={20} /> Add Task
            </button>
          </div>
        </div>

        {/* Add User Form */}
        {showUserForm && (
          <form
            onSubmit={handleUserSubmit}
            className="mb-6 bg-white p-6 rounded shadow-md max-w-md mt-6"
          >
            <h2 className="text-lg font-bold mb-3">Add User</h2>
            <input
              type="text"
              placeholder="Name"
              value={userFormData.name}
              onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={userFormData.email}
              onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
              required
            />
            <select
              value={userFormData.role}
              onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={submittingUser}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                {submittingUser ? "Adding..." : "Add User"}
              </button>
              <button
                type="button"
                onClick={() => setShowUserForm(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Add Task Form */}
        {showTaskForm && (
          <form
            onSubmit={handleTaskSubmit}
            className="mb-6 bg-white p-6 rounded shadow-md max-w-md mt-6"
          >
            <h2 className="text-lg font-bold mb-3">Add Task</h2>
            <input
              type="text"
              placeholder="Task Title"
              value={taskFormData.title}
              onChange={(e) => setTaskFormData({ ...taskFormData, title: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
              required
            />
            <textarea
              placeholder="Task Content"
              value={taskFormData.content}
              onChange={(e) => setTaskFormData({ ...taskFormData, content: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={submittingTask}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition"
              >
                {submittingTask ? "Adding..." : "Add Task"}
              </button>
              <button
                type="button"
                onClick={() => setShowTaskForm(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
