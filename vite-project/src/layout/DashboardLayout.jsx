import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState("")
  console.log(search, " parent")
  return (
    <div className="md:flex min-h-screen sm:over:hidden sm:h-screen">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header setIsSidebarOpen={setIsSidebarOpen} search={search} setSearch={setSearch} />
        <main className="p-4 overflow-auto bg-gray-100 h-full">
          <Outlet context={{ search }} />
        </main>
      </div>
    </div>
  );
}