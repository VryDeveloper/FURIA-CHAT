
import React from "react";
import Sidebar from "./Sidebar";
import { Toaster } from "@/components/ui/toaster";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex bg-furia-black">
      <Sidebar />
      <main className="flex-1 flex flex-col">{children}</main>
      <Toaster />
    </div>
  );
};

export default MainLayout;
