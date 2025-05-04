
import { useState } from 'react';
import { furiaAPI, Match, Player } from '@/api/furiaAPI';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Define the NewsItem interface since it's missing from the API exports
interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  source: string;
}

// Cache para armazenar dados da API e evitar chamadas repetidas
let dataCache: {
  upcomingMatches?: Match[];
  recentMatches?: Match[];
  players?: Player[];
  news?: NewsItem[];
  lastFetch: {
    upcomingMatches?: Date;
    recentMatches?: Date;
    players?: Date;
    news?: Date;
  };
} = {
  lastFetch: {}
};

export const useChatbot = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Função para formatar datas em português
  const formatDate = (dateStr: string): string => {
    try {
      const date = new Date(dateStr);
      return format(date, "d 'de' MMMM 'às' HH:mm", { locale: ptBR });
    } catch (e) {
      return dateStr;
    }
  };

  // Buscar dados da API com cache
  const fetchData = async <T extends 'upcomingMatches' | 'recentMatches' | 'players' | 'news'>(
    type: T,
    fetchFn: () => Promise<any>,
    maxAge = 300000 // 5 minutos por padrão
  ) => {
    const now = new Date();
    const lastFetch = dataCache.lastFetch[type];
    
    // Verificar se os dados estão em cache e não estão expirados
    if (
      dataCache[type] && 
      lastFetch && 
      now.getTime() - lastFetch.getTime() < maxAge
    ) {
      return dataCache[type];
    }
    
    // Buscar novos dados
    const data = await fetchFn();
    dataCache[type] = data;
    dataCache.lastFetch[type] = now;
    
    return data;
  };

  const generateResponse = async (message: string): Promise<string> => {
    setIsLoading(true);
    
    try {
      // Converter mensagem para minúsculas para facilitar a comparação
      const lowerMessage = message.toLowerCase();
      
      // Padrões para jogos e resultados
      if (lowerMessage.includes("próximo jogo") || lowerMessage.includes("próxima partida")) {
        const matches = await fetchData('upcomingMatches', () => furiaAPI.getUpcomingMatches());
        
        if (matches && matches.length > 0) {
          const nextMatch = matches[0];
          return `O próximo jogo da FURIA será contra ${nextMatch.opponent} no dia ${formatDate(nextMatch.date)}, pela ${nextMatch.event}.`;
        }
        
        return "Não encontrei informações sobre os próximos jogos da FURIA no momento.";
      }
      
      if (lowerMessage.includes("resultado") || lowerMessage.includes("jogos recentes") || lowerMessage.includes("últimos jogos")) {
        const matches = await fetchData('recentMatches', () => furiaAPI.getRecentMatches());
        
        if (matches && matches.length > 0) {
          const recentMatch = matches[0];
          const result = recentMatch.status === 'completed' ? (recentMatch.score?.includes('-') ? recentMatch.score : 'sem placar disponível') : 'em andamento';
          
          return `No jogo mais recente, a FURIA enfrentou ${recentMatch.opponent} com resultado ${result} em ${formatDate(recentMatch.date)}, pela ${recentMatch.event}.`;
        }
        
        return "Não encontrei informações sobre resultados recentes da FURIA no momento.";
      }
      
      // Padrões para jogadores
      if (lowerMessage.includes("jogador") || lowerMessage.includes("estatísticas")) {
        const players = await fetchData('players', () => furiaAPI.getPlayers(), 3600000); // Cache de 1 hora para jogadores
        
        if (players && players.length > 0) {
          const playerNames = players.map(p => p.name.toLowerCase());
          
          for (const player of players) {
            if (lowerMessage.includes(player.name.toLowerCase())) {
              return `${player.name} tem um rating de ${player.stats?.rating || 'N/A'} e já conquistou vários títulos com a FURIA. Suas principais conquistas incluem: ${player.achievements?.join(", ") || 'informação não disponível'}.`;
            }
          }
          
          return `O elenco da FURIA conta com jogadores como ${players.map(p => p.name).join(", ")}. Pergunte sobre um jogador específico para mais detalhes.`;
        }
      }
      
      // Padrões para compras/produtos
      if (lowerMessage.includes("comprar") || lowerMessage.includes("produtos") || lowerMessage.includes("loja")) {
        return `Você pode comprar produtos oficiais da FURIA na loja virtual: https://furiagg.com/collections/all`;
      }
      
      // Padrões para saudações
      if (lowerMessage.includes("olá") || lowerMessage.includes("oi") || lowerMessage.includes("hey")) {
        return "Olá! Sou o chatbot da FURIA. Como posso ajudar você hoje? Você pode me perguntar sobre jogos, jogadores ou produtos da FURIA.";
      }
      
      // Padrões para transmissões
      if (lowerMessage.includes("transmissão") || lowerMessage.includes("assistir") || lowerMessage.includes("stream")) {
        return "As transmissões dos jogos da FURIA acontecem nos canais oficiais do YouTube (FURIATV) e Twitch (furiatv).";
      }

      // Padrões para notícias
      if (lowerMessage.includes("notícia") || lowerMessage.includes("novidade") || lowerMessage.includes("acontecimento")) {
        const news = await fetchData('news', () => furiaAPI.getNews());
        
        if (news && news.length > 0) {
          const latestNews = news[0];
          return `Última notícia: ${latestNews.title} - ${latestNews.excerpt || ''} (Fonte: ${latestNews.source || 'FURIA'}, ${formatDate(latestNews.date)})`;
        }
        
        return "Não encontrei notícias recentes sobre a FURIA no momento.";
      }
      
      // Resposta padrão
      return "Desculpe, não entendi sua pergunta. Você pode perguntar sobre os próximos jogos da FURIA, informações sobre jogadores, resultados recentes ou como comprar produtos oficiais.";
      
    } catch (error) {
      console.error("Error generating chatbot response:", error);
      return "Desculpe, estou com problemas para processar sua pergunta agora. Tente novamente mais tarde.";
    } finally {
      setIsLoading(false);
    }
  };

  return { generateResponse, isLoading };
};
