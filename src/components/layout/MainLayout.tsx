
import React from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { Toaster } from "@/components/ui/toaster";
import NotificationCenter from "@/components/notification/NotificationCenter";
import { useAuth } from "@/context/AuthContext";

interface MainLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MainLayout = ({ children, activeTab, onTabChange }: MainLayoutProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex bg-black overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar activeTab={activeTab} onTabChange={onTabChange} />
      </div>
      
      <main className="flex-1 flex flex-col animate-fade-in relative">
        {/* Animated top border */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black via-white to-black"></div>
        
        {/* Header for mobile */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 border-b border-gray-800/30 bg-black/90 backdrop-blur-sm sticky top-0 z-10">
          <MobileNav activeTab={activeTab} onTabChange={onTabChange} />
          
          <div className="flex items-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/FURIA_Logo.svg/1200px-FURIA_Logo.svg.png" 
              alt="FURIA Logo" 
              className="h-8" 
            />
            <span className="ml-2 font-bold text-xl text-white">FURIA</span>
          </div>
          
          {isAuthenticated && <NotificationCenter />}
        </header>
        
        {/* Header for desktop */}
        <header className="hidden md:flex items-center justify-end px-6 py-3 border-b border-gray-800/30 bg-black/90 backdrop-blur-sm sticky top-0 z-10">
          {isAuthenticated && <NotificationCenter />}
        </header>
        
        {/* Main content */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default MainLayout;
