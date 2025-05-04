
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
    <div className="w-20 lg:w-64 bg-furia-black border-r border-furia-gray flex flex-col">
      <div className="p-4 flex justify-center lg:justify-start items-center border-b border-furia-gray">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/FURIA_Logo.svg/1200px-FURIA_Logo.svg.png" 
          alt="FURIA Logo" 
          className="h-10" 
        />
        <span className="hidden lg:block ml-3 font-bold text-xl text-furia-red">FURIA</span>
      </div>

      <div className="flex-1 py-4">
        <ul>
          {sidebarItems.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center px-4 py-3 transition-all",
                  activeTab === item.id
                    ? "bg-furia-red text-white"
                    : "text-gray-400 hover:bg-furia-gray hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="hidden lg:block ml-3">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t border-furia-gray">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-furia-red flex items-center justify-center text-white font-bold">
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
