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

  // Definição das intenções do chatbot
  const chatbotIntents = [
    {
      patterns: ["próximo jogo", "próxima partida", "quando a furia joga"],
      response: async () => {
        const matches = await fetchData('upcomingMatches', () => furiaAPI.getUpcomingMatches());
        if (matches && matches.length > 0) {
          const nextMatch = matches[0];
          return `O próximo jogo da FURIA será contra ${nextMatch.opponent} no dia ${formatDate(nextMatch.date)}, pela ${nextMatch.event}.`;
        }
        return "Não encontrei informações sobre os próximos jogos da FURIA no momento.";
      },
    },
    {
      patterns: ["resultado", "jogos recentes", "últimos jogos"],
      response: async () => {
        const matches = await fetchData('recentMatches', () => furiaAPI.getRecentMatches());
        if (matches && matches.length > 0) {
          const recentMatch = matches[0];
          const result = recentMatch.status === 'completed' ? (recentMatch.score?.includes('-') ? recentMatch.score : 'sem placar disponível') : 'em andamento';
          return `No jogo mais recente, a FURIA enfrentou ${recentMatch.opponent} com resultado ${result} em ${formatDate(recentMatch.date)}, pela ${recentMatch.event}.`;
        }
        return "Não encontrei informações sobre resultados recentes da FURIA no momento.";
      },
    },
    {
      patterns: ["jogador", "estatísticas", "elenco"],
      response: async (message: string) => {
        const players = await fetchData('players', () => furiaAPI.getPlayers(), 3600000); // Cache de 1 hora para jogadores
        if (players && players.length > 0) {
          const lowerMessage = message.toLowerCase();
          for (const player of players) {
            if (lowerMessage.includes(player.name.toLowerCase())) {
              return `${player.name} tem um rating de ${player.stats?.rating || 'N/A'} e já conquistou vários títulos com a FURIA. Suas principais conquistas incluem: ${player.achievements?.join(", ") || 'informação não disponível'}.`;
            }
          }
          return `O elenco da FURIA conta com jogadores como ${players.map(p => p.name).join(", ")}. Pergunte sobre um jogador específico para mais detalhes.`;
        }
        return "Não encontrei informações sobre os jogadores da FURIA no momento.";
      },
    },
    {
      patterns: ["comprar", "produtos", "loja"],
      response: async () => {
        return `Você pode comprar produtos oficiais da FURIA na loja virtual: https://furiagg.com/collections/all`;
      },
    },
    {
      patterns: ["olá", "oi", "hey", "fazer"],
      response: async () => {
        return "Olá! Sou o chatbot da FURIA. Como posso ajudar você hoje? Você pode me perguntar sobre jogos, jogadores ou produtos da FURIA.";
      },
    },
    {
      patterns: ["transmissao", "assistir", "stream"],
      response: async () => {
        return "As transmissões dos jogos da FURIA acontecem nos canais oficiais do YouTube (FURIATV) e Twitch (furiatv).";
      },
    },
    {
      patterns: ["noticia", "novidade", "acontecimento"],
      response: async () => {
        const news = await fetchData('news', () => furiaAPI.getNews());
        if (news && news.length > 0) {
          const latestNews = news[0];
          return `Última notícia: ${latestNews.title} - ${latestNews.excerpt || ''} (Fonte: ${latestNews.source || 'FURIA'}, ${formatDate(latestNews.date)})`;
        }
        return "Não encontrei notícias recentes sobre a FURIA no momento.";
      },
    },
    {
      patterns: ["vamos furia", "vamos"],
      response: async () => {
        return "VAMOS! 🖤🤍";
      },
    },
    // Adicione novas intenções aqui
  ];

  const generateResponse = async (message: string): Promise<string> => {
    setIsLoading(true);
    try {
      const lowerMessage = message.toLowerCase();

      for (const intent of chatbotIntents) {
        if (intent.patterns.some(pattern => lowerMessage.includes(pattern))) {
          return await intent.response(message); // Passa a mensagem para a função de resposta
        }
      }

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