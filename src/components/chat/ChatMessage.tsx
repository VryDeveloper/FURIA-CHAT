
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
            "h-8 w-8 rounded-full flex items-center justify-center text-white",
            isUser ? "bg-furia-red order-2 ml-2" : "bg-furia-gold order-1 mr-2"
          )}
        >
          {isUser ? "F" : "B"}
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
            ? "bg-furia-red text-white rounded-tr-none" 
            : "bg-furia-gray text-white rounded-tl-none"
        )}
      >
        {message.content}
      </div>
    </div>
  );
};

export default ChatMessage;
