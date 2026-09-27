"use client";

import { Bird,LayoutDashboard,Home, History, ClipboardList, Calendar, Users, Info, HelpCircle, LogOut, Bell, Archive } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="w-64 h-screen bg-white border-r flex flex-col justify-between">
            <div>
                <div className="p-6  text-xl flex items-center gap-2 font-bold">
                    FarmCare
                    <div className="w-8     h-8 bg-green-950 rounded-full flex items-center justify-center text-white font-bold text-2xl pb-1.5">+</div>

                </div>

                <div className="text-gray-500 text-xs px-6 mt-4 mb-2">MENU</div>

                <ul className="space-y-2 px-4">
                
                    <li>
                    <Link href="/" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                            <Home size={18} />
                            Home 
                        </Link>
                        
                    </li>
                    <li>
                        <Link href="/dashboard" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                            <LayoutDashboard size={18} />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/birds" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                            <Bird size={18} />
                            Batch data
                        </Link>
                    </li>
                    <li>
                        <Link href="/remainder" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                            <Bell size={18} />
                            Remainder
                        </Link>
                    </li>
                    <li>
                        <Link href="/todo" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                            <ClipboardList size={18} />
                            Todo
                        </Link>
                    </li>
                    <li>
                        <Link href="/calendar" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                            <Calendar size={18} />
                            Calendar
                        </Link>
                    </li>
                    <li>
                        <Link href="/history" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                            <History size={18} />
                            History
                        </Link>
                    </li>

                    <li>
                        <Link href="/food-stock" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                            <Archive size={18} />
                            Food Stock
                        </Link>
                    </li>
                    <li>
                        <Link href="/teams" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                            <Users size={18} />
                            User
                        </Link>
                    </li>

                </ul>

                <div className="text-gray-500 text-xs px-6 mt-6 mb-2">GENERAL</div>

                <ul className="space-y-2 px-4">
                    <li className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                        <Info size={18} /> About us
                    </li>
                    <li className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                        <HelpCircle size={18} /> Help
                    </li>
                    .
                     <li>
                        <Link href="/login" className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                            <LogOut size={18} />
                            User
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
}