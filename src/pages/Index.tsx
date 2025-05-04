
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ChatInterface from "@/components/chat/ChatInterface";
import MatchCalendar from "@/components/calendar/MatchCalendar";
import StreamsSection from "@/components/streams/StreamsSection";
import PlayerStats from "@/components/players/PlayerStats";
import NewsFeed from "@/components/news/NewsFeed";
import FanChants from "@/components/fan/FanChants";

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>("chat");
  
  const renderSection = () => {
    switch (activeSection) {
      case "chat":
        return <ChatInterface />;
      case "calendar":
        return <MatchCalendar />;
      case "streams":
        return <StreamsSection />;
      case "players":
        return <PlayerStats />;
      case "news":
        return <NewsFeed />;
      case "fan":
        return <FanChants />;
      default:
        return <ChatInterface />;
    }
  };
  
  // Listen for sidebar button clicks
  React.useEffect(() => {
    const handleSidebarClick = (e: MouseEvent) => {
      const target = e.target as Element;
      const sidebarButton = target.closest('button');
      
      if (sidebarButton) {
        // Check if this is a sidebar navigation button
        const sidebarItems = ["chat", "calendar", "streams", "players", "tournaments"];
        const sidebarText = sidebarButton.textContent?.toLowerCase() || "";
        
        if (sidebarText.includes("agenda")) {
          setActiveSection("calendar");
        } else if (sidebarText.includes("transmissões")) {
          setActiveSection("streams");
        } else if (sidebarText.includes("jogadores")) {
          setActiveSection("players");
        } else if (sidebarText.includes("torneios")) {
          setActiveSection("news");
        } else if (sidebarText.includes("chat")) {
          setActiveSection("chat");
        }
      }
    };
    
    document.addEventListener("click", handleSidebarClick);
    
    return () => {
      document.removeEventListener("click", handleSidebarClick);
    };
  }, []);
  
  return (
    <MainLayout>
      {renderSection()}
    </MainLayout>
  );
};

export default Index;
