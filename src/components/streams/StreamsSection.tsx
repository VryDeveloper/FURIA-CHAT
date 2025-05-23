
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Youtube, Video } from "lucide-react";

// Mock data for streams
const streams = [
  {
    id: "1",
    title: "FURIA vs Team Liquid - ESL Pro League",
    platform: "YouTube",
    url: "https://www.youtube.com/c/furiagg",
    live: true,
    thumbnail: "src/assets/images/furiavsteamliquid.webp",
    viewers: "23.5K"
  },
  {
    id: "2",
    title: "FURIA eSports - Treino de CS2",
    platform: "Twitch",
    url: "https://www.twitch.tv/furiatv",
    live: false,
    thumbnail: "src/assets/images/FURIA-CS.jpg",
    scheduledTime: "Hoje às 20:00"
  },
  {
    id: "3",
    title: "KSCERATO - Stream Pessoal",
    platform: "Twitch",
    url: "https://www.twitch.tv/kscerato",
    live: true,
    thumbnail: "src/assets/images/kscerato.png",
    viewers: "5.2K"
  }
];

const StreamsSection = () => {
  return (
    <div className="p-6 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-white">Transmissões</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {streams.map((stream, index) => (
          <Card 
            key={stream.id} 
            className="bg-gray-900 text-white border-gray-800 overflow-hidden hover:border-white hover-glow group animate-fade-in"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="relative overflow-hidden">
              <img 
                src={stream.thumbnail} 
                alt={stream.title} 
                className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              {stream.live && (
                <div className="absolute top-2 right-2">
                  <Badge status="live" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4">
                  <h3 className="text-white font-semibold">{stream.title}</h3>
                </div>
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg line-clamp-1">{stream.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-1">
                  {stream.platform === "YouTube" ? (
                    <Youtube className="h-4 w-4 text-white" />
                  ) : (
                    <Video className="h-4 w-4 text-white" />
                  )}
                  <span className="text-sm">{stream.platform}</span>
                </div>
                <div>
                  {stream.live ? (
                    <span className="text-sm font-semibold text-white">{stream.viewers} assistindo</span>
                  ) : (
                    <span className="text-sm text-gray-400">{stream.scheduledTime}</span>
                  )}
                </div>
              </div>
              <a href={stream.url} target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="default" 
                  className="w-full bg-white text-black hover:bg-gray-200 hover:shadow-lg hover:shadow-white/30 transition-all duration-300"
                >
                  {stream.live ? "Assistir Agora" : "Lembrar-me"}
                </Button>
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Badge = ({ status }: { status: 'live' | 'upcoming' }) => {
  if (status === 'live') {
    return (
      <div className="bg-white text-black px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 animate-pulse-white">
        <span className="inline-block h-2 w-2 rounded-full bg-black"></span>
        <span>AO VIVO</span>
      </div>
    );
  }
  return null;
};

export default StreamsSection;
