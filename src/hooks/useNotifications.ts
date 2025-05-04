
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/sonner';
import { websocketService, WebSocketEventType } from '@/services/websocket';
import { useAuth } from '@/context/AuthContext';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'match' | 'news' | 'system';
  date: Date;
  read: boolean;
  link?: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();
  
  // Load notifications from localStorage on initial render
  useEffect(() => {
    if (user) {
      const storedNotifications = localStorage.getItem(`furia-notifications-${user.id}`);
      
      if (storedNotifications) {
        const parsedNotifications = JSON.parse(storedNotifications) as Notification[];
        setNotifications(parsedNotifications);
        setUnreadCount(parsedNotifications.filter(n => !n.read).length);
      }
    }
  }, [user]);
  
  // Save notifications to localStorage when they change
  useEffect(() => {
    if (user && notifications.length > 0) {
      localStorage.setItem(`furia-notifications-${user.id}`, JSON.stringify(notifications));
    }
  }, [notifications, user]);
  
  // Connect to WebSocket for real-time notifications
  useEffect(() => {
    if (user?.notifications) {
      websocketService.connect();
      
      const handleMatchUpdate = (data: any) => {
        if (data.status === 'Live') {
          addNotification({
            title: 'Partida ao vivo!',
            message: `FURIA vs ${data.team2} - ${data.score}`,
            type: 'match',
            link: `/calendar`,
          });
        }
      };
      
      const handleNewsUpdate = (data: any) => {
        addNotification({
          title: 'Nova notícia!',
          message: data.title,
          type: 'news',
          link: `/news/${data.id}`,
        });
      };
      
      websocketService.on(WebSocketEventType.MATCH_UPDATE, handleMatchUpdate);
      websocketService.on(WebSocketEventType.NEWS_UPDATE, handleNewsUpdate);
      
      return () => {
        websocketService.off(WebSocketEventType.MATCH_UPDATE, handleMatchUpdate);
        websocketService.off(WebSocketEventType.NEWS_UPDATE, handleNewsUpdate);
      };
    }
  }, [user]);
  
  const addNotification = ({ title, message, type, link }: Omit<Notification, 'id' | 'date' | 'read'>) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      title,
      message,
      type,
      date: new Date(),
      read: false,
      link,
    };
    
    setNotifications(prev => [newNotification, ...prev].slice(0, 50)); // Keep only the last 50 notifications
    setUnreadCount(prev => prev + 1);
    
    // Show toast notification
    toast(title, {
      description: message,
      action: link ? {
        label: 'Ver',
        onClick: () => {
          markAsRead(newNotification.id);
          window.location.href = link;
        },
      } : undefined,
    });
  };
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    
    setUnreadCount(prev => Math.max(0, prev - 1));
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    
    setUnreadCount(0);
  };
  
  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    
    if (user) {
      localStorage.removeItem(`furia-notifications-${user.id}`);
    }
  };
  
  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  };
};
