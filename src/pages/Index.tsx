
import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ChatInterface from "@/components/chat/ChatInterface";
import MatchCalendar from "@/components/calendar/MatchCalendar";
import StreamsSection from "@/components/streams/StreamsSection";
import PlayerStats from "@/components/players/PlayerStats";
import NewsFeed from "@/components/news/NewsFeed";
import FanChants from "@/components/fan/FanChants";
import PlayerComparison from "@/components/players/PlayerComparison";
import { websocketService } from "@/services/websocket";

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>("chat");
  
  // Connect to WebSocket on component mount
  useEffect(() => {
    websocketService.connect();
    
    return () => {
      websocketService.disconnect();
    };
  }, []);
  
  const renderSection = () => {
    switch (activeSection) {
      case "chat":
        return <ChatInterface />;
      case "calendar":
        return <MatchCalendar />;
      case "streams":
        return <StreamsSection />;
      case "players":
        return (
          <div className="space-y-8">
            <PlayerStats />
            <PlayerComparison />
          </div>
        );
      case "tournaments":
        return <NewsFeed />;
      case "fan":
        return <FanChants />;
      default:
        return <ChatInterface />;
    }
  };
  
  return (
    <MainLayout activeTab={activeSection} onTabChange={setActiveSection}>
      <div className="animate-fade-in">
        {renderSection()}
      </div>
    </MainLayout>
  );
};

export default Index;
