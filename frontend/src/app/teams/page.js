"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { userService } from "@/services/userService";

export default function Page() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "team member" });
  const [submitting, setSubmitting] = useState(false);

  const colors = [
    "bg-blue-200 text-blue-700",
    "bg-green-200 text-green-700",
    "bg-purple-200 text-purple-700",
    "bg-pink-200 text-pink-700",
    "bg-yellow-200 text-yellow-700",
    "bg-indigo-200 text-indigo-700",
    "bg-red-200 text-red-700",
    "bg-teal-200 text-teal-700",
  ];

  const roles = [
    "admin",
    "team member",
    "shift incharge",
    "sweeper",
    "worker",
    "helper",
  ];

  // Fetch team members
  const fetchTeam = async () => {
    try {
      setLoading(true);
      const data = await userService.getAll();
      setTeamMembers(data);
    } catch (err) {
      console.error("Error fetching team:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  // Get initials
  const getInitials = (name) => {
    if (!name) return "??";
    const parts = name.split(" ");
    if (parts.length === 1) return name.substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  // Open add/edit form
  const openForm = (member = null) => {
    if (member) {
      setEditingMember(member);
      setFormData({ name: member.name, email: member.email, role: member.role });
    } else {
      setEditingMember(null);
      setFormData({ name: "", email: "", role: "team member" });
    }
    setShowForm(true);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    try {
      setSubmitting(true);
      if (editingMember) {
        const updated = await userService.update(editingMember.id, formData);
        if (updated) {
          setTeamMembers(teamMembers.map((m) => (m.id === updated.id ? updated : m)));
        }
      } else {
        const created = await userService.create(formData);
        if (created) setTeamMembers([...teamMembers, created]);
      }
      setShowForm(false);
      setEditingMember(null);
      setFormData({ name: "", email: "", role: "team member" });
    } catch (err) {
      console.error("Submit Error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (member) => {
    if (!confirm(`Are you sure you want to delete ${member.name}?`)) return;
    try {
      const success = await userService.remove(member.id);
      if (success) setTeamMembers(teamMembers.filter((m) => m.id !== member.id));
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  // Badge styling based on role
  const getBadgeStyle = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-purple-100 text-purple-800";
      case "team member":
        return "bg-green-100 text-green-800";
      case "shift incharge":
        return "bg-blue-100 text-blue-800";
      case "sweeper":
        return "bg-yellow-100 text-yellow-800";
      case "worker":
        return "bg-indigo-100 text-indigo-800";
      case "helper":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-4">Our Team</h1>

        {/* Add / Edit Button */}
        <button
          onClick={() => openForm()}
          className="mb-6 px-4 py-2 bg-green-900 text-white rounded hover:bg-green-700 transition"
        >
          Add Member
        </button>

        {/* Add/Edit Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-6 bg-white p-6 rounded shadow-md max-w-md"
          >
            <h2 className="text-lg font-bold mb-3">
              {editingMember ? "Edit Member" : "Add Member"}
            </h2>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
              required
            />
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full mb-3 p-2 border rounded"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              {submitting ? (editingMember ? "Updating..." : "Adding...") : editingMember ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="ml-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </form>
        )}

        {/* Team Members */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-b-transparent rounded-full mx-auto"></div>
            <p className="text-gray-600 mt-3">Loading team members...</p>
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="text-center bg-white shadow p-6 rounded-xl">
            <p className="text-gray-500">No team members found.</p>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={member.id} className="shadow-md hover:shadow-lg transition">
                <CardContent className="p-6 text-center">
                  {/* Avatar with initials */}
                  <div
                    className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-3xl font-bold shadow-sm ${
                      colors[index % colors.length]
                    }`}
                  >
                    {getInitials(member.name)}
                  </div>

                  <h2 className="text-lg font-semibold mt-4">{member.name}</h2>

                  {/* Role Badge */}
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getBadgeStyle(
                      member.role
                    )}`}
                  >
                    {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                  </span>

                  <p className="text-xs text-gray-400 mt-2 break-all">{member.email}</p>

                  {/* Edit/Delete buttons */}
                  <div className="mt-4 flex justify-center gap-2">
                    <button
                      onClick={() => openForm(member)}
                      className="px-3 py-1 bg-green-950 text-white rounded hover:bg-green-800 transition text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member)}
                      className="px-3 py-1 bg-black text-white rounded hover:bg-gray-600 transition text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
