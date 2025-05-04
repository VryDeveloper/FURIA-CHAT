
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
    thumbnail: "https://i.ytimg.com/vi/5qap5aO4i9A/maxresdefault.jpg",
    viewers: "23.5K"
  },
  {
    id: "2",
    title: "FURIA eSports - Treino de CS2",
    platform: "Twitch",
    url: "https://www.twitch.tv/furiatv",
    live: false,
    thumbnail: "https://static-cdn.jtvnw.net/previews-ttv/live_user_furiatv-440x248.jpg",
    scheduledTime: "Hoje às 20:00"
  },
  {
    id: "3",
    title: "KSCERATO - Stream Pessoal",
    platform: "Twitch",
    url: "https://www.twitch.tv/kscerato",
    live: true,
    thumbnail: "https://static-cdn.jtvnw.net/previews-ttv/live_user_kscerato-440x248.jpg",
    viewers: "5.2K"
  }
];

const StreamsSection = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-furia-red">Transmissões</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {streams.map(stream => (
          <Card key={stream.id} className="bg-furia-gray text-white border-furia-gray overflow-hidden hover:border-furia-red transition-all">
            <div className="relative">
              <img 
                src={stream.thumbnail} 
                alt={stream.title} 
                className="w-full h-48 object-cover"
              />
              {stream.live && (
                <div className="absolute top-2 right-2">
                  <Badge status="live" />
                </div>
              )}
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{stream.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-1">
                  {stream.platform === "YouTube" ? (
                    <Youtube className="h-4 w-4 text-red-500" />
                  ) : (
                    <Video className="h-4 w-4 text-purple-500" />
                  )}
                  <span className="text-sm">{stream.platform}</span>
                </div>
                <div>
                  {stream.live ? (
                    <span className="text-sm font-semibold text-furia-red">{stream.viewers} assistindo</span>
                  ) : (
                    <span className="text-sm text-gray-400">{stream.scheduledTime}</span>
                  )}
                </div>
              </div>
              <a href={stream.url} target="_blank" rel="noopener noreferrer">
                <Button variant="default" className="w-full bg-furia-red hover:bg-furia-red/80">
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
      <div className="bg-furia-red text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
        <span className="inline-block h-2 w-2 rounded-full bg-white animate-pulse"></span>
        <span>AO VIVO</span>
      </div>
    );
  }
  return null;
};

export default StreamsSection;
