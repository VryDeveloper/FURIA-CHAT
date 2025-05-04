
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
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>("chat");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  // Connect to WebSocket on component mount
  useEffect(() => {
    websocketService.connect();
    
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    
    return () => {
      websocketService.disconnect();
      clearTimeout(timer);
    };
  }, []);
  
  const renderSection = () => {
    if (!isLoaded) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          </div>
          <p className="text-white text-xl font-medium">Loading...</p>
        </div>
      );
    }
    
    switch (activeSection) {
      case "chat":
        return (
          <div className="animate-fade-in">
            <ChatInterface />
          </div>
        );
      case "calendar":
        return (
          <div className="animate-fade-in">
            <MatchCalendar />
          </div>
        );
      case "streams":
        return (
          <div className="animate-fade-in">
            <StreamsSection />
          </div>
        );
      case "players":
        return (
          <div className="animate-fade-in space-y-8">
            <PlayerStats />
            <PlayerComparison />
          </div>
        );
      case "tournaments":
        return (
          <div className="animate-fade-in">
            <NewsFeed />
          </div>
        );
      case "fan":
        return (
          <div className="animate-fade-in">
            <FanChants />
          </div>
        );
      default:
        return (
          <div className="animate-fade-in">
            <ChatInterface />
          </div>
        );
    }
  };
  
  return (
    <MainLayout activeTab={activeSection} onTabChange={setActiveSection}>
      <Card className="w-full bg-black border border-gray-800 rounded-lg overflow-hidden shadow-2xl">
        <CardContent className="p-0">
          <div className="min-h-[80vh]">
            {renderSection()}
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Index;
