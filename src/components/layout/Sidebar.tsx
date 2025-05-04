import React from "react";
import { CalendarDays, Trophy, Users, Video, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "@/i18n/translations";
import AuthModal from "@/components/auth/AuthModal";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import ThemeLanguageToggle from "@/components/header/ThemeLanguageToggle";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const { isAuthenticated, user, logout, language } = useAuth();
  const { t } = useTranslation(language);

  const sidebarItems = [
    { id: "chat", name: t('nav.chat'), icon: MessageCircle },
    { id: "calendar", name: t('nav.agenda'), icon: CalendarDays },
    { id: "streams", name: t('nav.transmissions'), icon: Video },
    { id: "players", name: t('nav.players'), icon: Users },
    { id: "tournaments", name: t('nav.tournaments'), icon: Trophy },
  ];

  const handleLogout = async () => {
    await logout();
    toast.success(t('auth.logoutSuccess'));
  };

  return (
    <div className="w-20 lg:w-64 bg-furia-black border-r border-furia-gray flex flex-col transition-all duration-300 ease-in-out">
      <div className="p-6 justify-center lg:justify-start items-center border-b border-furia-gray">
        <img 
          src="src/assets/images/furia-logo.png" 
          alt="FURIA Logo" 
          className="h-12 transform flex rounded-full hover-scale transition-transform duration-300" 
        />
        <span className="hidden lg:block ml-3 font-bold text-xl text-furia-red">FURIA</span>
      </div>

      <div className="flex-1 py-6">
        <ul className="space-y-3">
          {sidebarItems.map((item) => (
            <li key={item.id} className="px-4">
              <button
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "w-full flex items-center justify-center lg:justify-start px-4 py-3 rounded-lg transition-all duration-300",
                  activeTab === item.id
                    ? "bg-gradient-to-r from-furia-red to-furia-red/80 shadow-lg shadow-furia-red/20"
                    : "text-gray-400 hover:bg-furia-gray/30 hover:text-white"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5",
                    activeTab === item.id ? "text-black animate-pulse" : ""
                  )}
                />
                <span
                  className={cn(
                    "hidden lg:block ml-3 transition-opacity",
                    activeTab === item.id
                      ? "text-black opacity-100"
                      : "text-gray-400 opacity-70"
                  )}
                >
                  {item.name}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t border-furia-gray">
        {isAuthenticated ? (
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-4">
            <div className="flex items-center justify-center lg:justify-start w-full hover:bg-furia-gray/20 rounded-lg transition-all duration-300 cursor-pointer p-2">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-furia-red to-furia-gold flex items-center justify-center text-white font-bold shadow-lg">
                {user?.displayName?.charAt(0) || 'F'}
              </div>
              <div className="hidden lg:block ml-3">
                <div className="text-sm font-medium">{user?.displayName || 'FURIA Fan'}</div>
                <div className="text-xs text-gray-400">Online</div>
              </div>
            </div>
            
            <div className="flex flex-row lg:flex-col gap-2 items-center w-full lg:w-auto">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout} 
                className="w-full"
              >
                <span className="hidden lg:inline">{t('auth.logout')}</span>
                <span className="lg:hidden">Logout</span>
              </Button>
              <ThemeLanguageToggle />
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <AuthModal 
              trigger={
                <Button variant="default" size="sm" className="w-full">
                  <span className="hidden lg:inline">{t('auth.login')}</span>
                  <span className="lg:hidden">Login</span>
                </Button>
              } 
            />
            <ThemeLanguageToggle />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
