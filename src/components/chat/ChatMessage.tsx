import React from "react";
import { cn } from "@/lib/utils";
import type { Message } from "./ChatInterface";
import { format } from "date-fns";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.sender === "user";
  
  return (
    <div 
      className={cn(
        "mb-4 max-w-[80%] message-enter", 
        isUser ? "ml-auto" : "mr-auto"
      )}
    >
      <div className="flex items-center mb-1">
        <div 
          className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center",
            isUser ? "order-2 ml-2" : "order-1 mr-2"
          )}
        >
          <img
            src={isUser ? "src/assets/images/user-icon.png" : "src/assets/images/furia-logo.png"} // Substitua pelo caminho correto da imagem
            alt={isUser ? "User Avatar" : "Bot Avatar"}
            className="h-full w-full object-cover rounded-full"
          />
        </div>
        <div 
          className={cn(
            "text-xs text-gray-400",
            isUser ? "order-1 mr-2 text-right" : "order-2 ml-2"
          )}
        >
          {isUser ? "Você" : "FURIA Bot"} • {format(message.timestamp, "HH:mm")}
        </div>
      </div>
      <div
        className={cn(
          "p-4 rounded-xl",
          isUser 
            ? "bg-white text-black rounded-tr-none text-right" 
            : "bg-furia-gray text-white rounded-tl-none"
        )}
      >
        {message.content}
      </div>
    </div>
  );
};

export default ChatMessage;
