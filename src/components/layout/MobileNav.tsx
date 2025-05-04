
import React, { useState } from 'react';
import { Menu, X, CalendarDays, Trophy, Users, Video, MessageCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from '@/i18n/translations';
import { cn } from '@/lib/utils';
import AuthModal from '@/components/auth/AuthModal';
import ThemeLanguageToggle from '@/components/header/ThemeLanguageToggle';
import { toast } from "@/components/ui/sonner";

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onTabChange }) => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout, language } = useAuth();
  const { t } = useTranslation(language);
  
  const menuItems = [
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
  
  const handleTabChange = (tabId: string) => {
    onTabChange(tabId);
    setOpen(false);
  };
  
  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-furia-black border-r border-furia-gray shadow-lg w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 flex items-center justify-between border-b border-furia-gray">
              <div className="flex items-center">
                <img 
                  src="src\assets\images\furia-logo.png" 
                  alt="FURIA Logo" 
                  className="h-8" 
                />
                <span className="ml-2 font-bold text-xl text-white">FURIA</span>
              </div>
              <SheetClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </Button>
              </SheetClose>
            </div>
            
            <div className="flex-1 py-4">
              <nav className="space-y-2 px-2">
                {menuItems.map((item) => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={cn(
                      "w-full flex items-center justify-start px-3 py-2 rounded-lg transition-all duration-300",
                      activeTab === item.id
                        ? "bg-white text-black shadow-lg"
                        : "text-gray-400 hover:bg-furia-gray/30 hover:text-white"
                    )}
                    onClick={() => handleTabChange(item.id)}
                  >
                    <item.icon className={cn("h-5 w-5 mr-3", activeTab === item.id && "animate-pulse")} />
                    <span>{item.name}</span>
                  </Button>
                ))}
              </nav>
            </div>
            
            <div className="p-4 border-t border-furia-gray">
              {isAuthenticated ? (
                <div className="space-y-4">
                  <div className="flex items-center p-2 hover:bg-furia-gray/20 rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-black font-bold shadow-lg">
                      {user?.displayName?.charAt(0) || 'F'}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium">{user?.displayName || 'FURIA Fan'}</div>
                      <div className="text-xs text-gray-400">Online</div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                      {t('auth.logout')}
                    </Button>
                    <ThemeLanguageToggle />
                  </div>
                </div>
              ) : (
                <div className="flex justify-between">
                  <AuthModal trigger={<Button variant="default" size="sm">{t('auth.login')}</Button>} />
                  <ThemeLanguageToggle />
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
