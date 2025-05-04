
import { useState } from 'react';

// Mock data for responses
const matchData = {
  nextMatch: {
    opponent: "Team Liquid",
    date: "10 de junho às 15:00",
    competition: "ESL Pro League"
  },
  players: {
    kscerato: {
      titles: 7,
      rating: 1.21,
      achievements: ["ESL Pro League Season 16 - Semifinalista", "BLAST Premier: Fall 2022 - Campeão"]
    },
    yuurih: {
      titles: 7,
      rating: 1.18,
      achievements: ["ESL Pro League Season 16 - Semifinalista", "BLAST Premier: Fall 2022 - Campeão"]
    },
    art: {
      titles: 7,
      rating: 1.01,
      achievements: ["ESL Pro League Season 16 - Semifinalista", "BLAST Premier: Fall 2022 - Campeão"]
    }
  },
  shop: "https://furiagg.com/collections/all"
};

export const useChatbot = () => {
  const [isLoading, setIsLoading] = useState(false);

  const generateResponse = async (message: string): Promise<string> => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const lowerMessage = message.toLowerCase();
      
      // Simple pattern matching for responses
      if (lowerMessage.includes("próximo jogo") || lowerMessage.includes("próxima partida")) {
        return `O próximo jogo da FURIA será contra ${matchData.nextMatch.opponent} no dia ${matchData.nextMatch.date}, pela ${matchData.nextMatch.competition}.`;
      }
      
      if (lowerMessage.includes("kscerato") && (lowerMessage.includes("título") || lowerMessage.includes("ganhou"))) {
        return `KSCERATO já conquistou ${matchData.players.kscerato.titles} títulos com a FURIA. Seus principais achievements incluem: ${matchData.players.kscerato.achievements.join(", ")}.`;
      }
      
      if (lowerMessage.includes("comprar") || lowerMessage.includes("produtos") || lowerMessage.includes("loja")) {
        return `Você pode comprar produtos oficiais da FURIA na loja virtual: ${matchData.shop}`;
      }
      
      if (lowerMessage.includes("olá") || lowerMessage.includes("oi") || lowerMessage.includes("hey")) {
        return "Olá! Sou o chatbot da FURIA. Como posso ajudar você hoje? Você pode me perguntar sobre jogos, jogadores ou produtos da FURIA.";
      }
      
      if (lowerMessage.includes("jogadores") || lowerMessage.includes("elenco")) {
        return "A FURIA conta com grandes talentos como KSCERATO, yuurih, arT, drop e chelo no seu time principal de CS2.";
      }
      
      if (lowerMessage.includes("transmissão") || lowerMessage.includes("assistir") || lowerMessage.includes("stream")) {
        return "As transmissões dos jogos da FURIA acontecem nos canais oficiais do YouTube (FURIATV) e Twitch (furiatv).";
      }
      
      // Default response
      return "Desculpe, não entendi sua pergunta. Você pode perguntar sobre os próximos jogos da FURIA, informações sobre jogadores ou como comprar produtos oficiais.";
      
    } catch (error) {
      console.error("Error generating chatbot response:", error);
      return "Desculpe, estou com problemas para processar sua pergunta agora. Tente novamente mais tarde.";
    } finally {
      setIsLoading(false);
    }
  };

  return { generateResponse, isLoading };
};
