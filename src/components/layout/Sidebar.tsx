
import React from "react";
import { CalendarDays, Trophy, Users, Video, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const [activeTab, setActiveTab] = React.useState("chat");

  const sidebarItems = [
    { id: "chat", name: "Chat", icon: MessageCircle },
    { id: "calendar", name: "Agenda", icon: CalendarDays },
    { id: "streams", name: "Transmissões", icon: Video },
    { id: "players", name: "Jogadores", icon: Users },
    { id: "tournaments", name: "Torneios", icon: Trophy },
  ];

  return (
    <div className="w-20 lg:w-64 bg-furia-black border-r border-furia-gray flex flex-col transition-all duration-300 ease-in-out">
      <div className="p-6 flex justify-center lg:justify-start items-center border-b border-furia-gray">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/FURIA_Logo.svg/1200px-FURIA_Logo.svg.png" 
          alt="FURIA Logo" 
          className="h-12 transform hover:scale-105 transition-transform duration-300" 
        />
        <span className="hidden lg:block ml-3 font-bold text-xl text-furia-red">FURIA</span>
      </div>

      <div className="flex-1 py-6">
        <ul className="space-y-3">
          {sidebarItems.map((item) => (
            <li key={item.id} className="px-4">
              <button
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center justify-center lg:justify-start px-4 py-3 rounded-lg transition-all duration-300",
                  activeTab === item.id
                    ? "bg-gradient-to-r from-furia-red to-furia-red/80 text-white shadow-lg shadow-furia-red/20"
                    : "text-gray-400 hover:bg-furia-gray/30 hover:text-white"
                )}
              >
                <item.icon className={cn("h-5 w-5", activeTab === item.id && "animate-pulse")} />
                <span className={cn("hidden lg:block ml-3 transition-opacity", 
                  activeTab === item.id ? "opacity-100" : "opacity-70"
                )}>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t border-furia-gray">
        <div className="flex items-center p-2 hover:bg-furia-gray/20 rounded-lg transition-all duration-300 cursor-pointer">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-furia-red to-furia-gold flex items-center justify-center text-white font-bold shadow-lg">
            F
          </div>
          <div className="hidden lg:block ml-3">
            <div className="text-sm font-medium">FURIA Fan</div>
            <div className="text-xs text-gray-400">Online</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
