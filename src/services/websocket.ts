
import { toast } from "@/components/ui/sonner";

// WebSocket events
export enum WebSocketEventType {
  MATCH_UPDATE = 'match_update',
  PLAYER_UPDATE = 'player_update',
  NEWS_UPDATE = 'news_update',
  NOTIFICATION = 'notification',
}

export interface WebSocketEvent {
  type: WebSocketEventType;
  data: any;
}

// In a real application, this would connect to an actual WebSocket server
export class WebSocketService {
  private socket: WebSocket | null = null;
  private listeners: Map<string, ((data: any) => void)[]> = new Map();
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectInterval: number = 5000;
  private isConnecting: boolean = false;
  private url: string;

  constructor(url?: string) {
    // In a real application, this would be a real WebSocket server URL
    this.url = url || 'wss://mock-furia-api.example.com/ws';
  }

  connect(): Promise<boolean> {
    if (this.socket?.readyState === WebSocket.OPEN) {
      return Promise.resolve(true);
    }

    if (this.isConnecting) {
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (this.socket?.readyState === WebSocket.OPEN) {
            clearInterval(checkInterval);
            resolve(true);
          }
        }, 100);
      });
    }

    this.isConnecting = true;
    
    return new Promise((resolve) => {
      try {
        console.log("Mock WebSocket connecting...");
        
        // Instead of creating a real WebSocket, we'll simulate one
        // This prevents errors when there's no actual WebSocket server
        setTimeout(() => {
          console.log("Mock WebSocket connected");
          this.isConnecting = false;
          this.reconnectAttempts = 0;
          
          // Simulate receiving match updates periodically
          this.simulateMatchUpdates();
          
          resolve(true);
        }, 1000);
      } catch (error) {
        console.error("WebSocket connection error:", error);
        this.isConnecting = false;
        this.reconnectAttempts++;
        
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          setTimeout(() => this.connect(), this.reconnectInterval);
        }
        
        resolve(false);
      }
    });
  }

  on(event: WebSocketEventType, callback: (data: any) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);
  }

  off(event: WebSocketEventType, callback: (data: any) => void): void {
    const callbacks = this.listeners.get(event) || [];
    const index = callbacks.indexOf(callback);
    
    if (index !== -1) {
      callbacks.splice(index, 1);
    }
  }
  
  disconnect(): void {
    // In a real implementation, we would close the WebSocket
    console.log("Mock WebSocket disconnected");
  }
  
  // Mock method to simulate receiving match updates
  private simulateMatchUpdates(): void {
    // Simulate match updates every 60 seconds
    setInterval(() => {
      const mockMatchUpdate = {
        matchId: Math.floor(Math.random() * 1000).toString(),
        team1: 'FURIA',
        team2: ['Team Liquid', 'Natus Vincere', 'FaZe Clan'][Math.floor(Math.random() * 3)],
        score: `${Math.floor(Math.random() * 16)}-${Math.floor(Math.random() * 16)}`,
        map: ['Dust2', 'Mirage', 'Inferno', 'Nuke'][Math.floor(Math.random() * 4)],
        status: ['Live', 'Upcoming', 'Finished'][Math.floor(Math.random() * 3)],
        timestamp: new Date().toISOString()
      };
      
      this.notifyListeners(WebSocketEventType.MATCH_UPDATE, mockMatchUpdate);
      
      // Display toast notification for important updates
      if (mockMatchUpdate.status === 'Live') {
        toast("Partida ao Vivo!", {
          description: `FURIA vs ${mockMatchUpdate.team2} - ${mockMatchUpdate.score}`,
          duration: 5000,
        });
      }
    }, 60000);
  }
  
  private notifyListeners(event: WebSocketEventType, data: any): void {
    const callbacks = this.listeners.get(event) || [];
    callbacks.forEach(callback => callback(data));
  }
}

// Create a singleton instance
export const websocketService = new WebSocketService();

// Export a hook for easy consumption
export const useWebSocket = () => {
  return websocketService;
};
