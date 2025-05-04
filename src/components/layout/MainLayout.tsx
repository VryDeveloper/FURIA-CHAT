
import React from "react";
import Sidebar from "./Sidebar";
import { Toaster } from "@/components/ui/toaster";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex bg-furia-black overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col animate-fade-in relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-furia-black via-furia-red to-furia-black"></div>
        {children}
      </main>
      <Toaster />
    </div>
  );
};

export default MainLayout;
