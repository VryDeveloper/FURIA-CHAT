
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from '@/i18n/translations';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';

const NotificationCenter: React.FC = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotifications();
  const [open, setOpen] = useState(false);
  const { language } = useAuth();
  const { t } = useTranslation(language);
  
  const formatDate = (date: Date) => {
    const locale = language === 'pt-BR' ? ptBR : enUS;
    return format(new Date(date), 'Pp', { locale });
  };
  
  const handleNotificationClick = (id: string, link?: string) => {
    markAsRead(id);
    
    if (link) {
      window.location.href = link;
    }
    
    setOpen(false);
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="relative"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-furia-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 md:w-96 p-0 bg-black border border-furia-gray/30 backdrop-blur-lg">
        <div className="flex justify-between items-center p-4 border-b border-furia-gray/30">
          <h3 className="font-semibold">Notificações</h3>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                className="h-8 text-xs"
              >
                Marcar todas como lidas
              </Button>
            )}
            {notifications.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearNotifications}
                className="h-8 text-xs text-red-500 hover:text-red-400"
              >
                Limpar
              </Button>
            )}
          </div>
        </div>
        
        <ScrollArea className="max-h-[400px]">
          {notifications.length > 0 ? (
            <div className="py-2">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-3 cursor-pointer hover:bg-furia-gray/20 ${!notification.read ? 'bg-furia-gray/10' : ''}`}
                  onClick={() => handleNotificationClick(notification.id, notification.link)}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <div 
                      className={`w-2 h-2 rounded-full ${!notification.read ? 'bg-furia-red' : 'bg-transparent'}`}
                    />
                  </div>
                  <p className="text-sm text-gray-300 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-2">{formatDate(notification.date)}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6">
              <Bell className="h-12 w-12 text-gray-500 mb-2" />
              <p className="text-gray-400">Nenhuma notificação</p>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
