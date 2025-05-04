
import axios from 'axios';

const BASE_URL = 'https://api.hltv.org'; // Note: This is for example only, you would need to use a real API

// Types for API responses
export interface Match {
  id: string;
  event: string;
  opponent: string;
  date: string;
  map?: string;
  score?: string;
  status: 'upcoming' | 'live' | 'completed';
  stream?: string;
}

export interface Player {
  id: string;
  name: string;
  realName: string;
  role: string;
  country: string;
  stats: {
    rating: number;
    kd: number;
    adr: number;
    kpr: number;
    headshots: number;
    mapsPlayed: number;
  };
  achievements: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  url: string;
}

// Mock data for development
const mockData = {
  upcomingMatches: [
    {
      id: "1",
      event: "ESL Pro League Season 19",
      opponent: "Team Liquid",
      date: "2025-05-10T18:00:00Z",
      status: "upcoming",
      stream: "https://www.twitch.tv/esl_csgo"
    },
    {
      id: "2",
      event: "BLAST Premier Spring Finals",
      opponent: "Natus Vincere",
      date: "2025-05-15T20:00:00Z",
      status: "upcoming",
      stream: "https://www.twitch.tv/blastpremier"
    }
  ] as Match[],
  
  recentMatches: [
    {
      id: "3",
      event: "IEM Katowice 2025",
      opponent: "FaZe Clan",
      date: "2025-04-20T19:00:00Z",
      map: "Inferno",
      score: "16-14",
      status: "completed"
    },
    {
      id: "4",
      event: "IEM Katowice 2025",
      opponent: "G2 Esports",
      date: "2025-04-18T17:30:00Z",
      map: "Mirage",
      score: "13-16",
      status: "completed"
    }
  ] as Match[],
  
  players: [
    {
      id: "1",
      name: "KSCERATO",
      realName: "Kaike Cerato",
      role: "Rifler",
      country: "Brasil",
      stats: {
        rating: 1.21,
        kd: 1.35,
        adr: 85.7,
        kpr: 0.78,
        headshots: 52.1,
        mapsPlayed: 254
      },
      achievements: [
        "ESL Pro League Season 16 - Semifinalist",
        "BLAST Premier: Fall 2022 - Champion",
        "IEM Rio Major 2022 - Top 8"
      ]
    },
    {
      id: "2",
      name: "yuurih",
      realName: "Yuri Santos",
      role: "Rifler",
      country: "Brasil",
      stats: {
        rating: 1.18,
        kd: 1.29,
        adr: 82.3,
        kpr: 0.76,
        headshots: 45.8,
        mapsPlayed: 254
      },
      achievements: [
        "ESL Pro League Season 16 - Semifinalist",
        "BLAST Premier: Fall 2022 - Champion",
        "IEM Rio Major 2022 - Top 8"
      ]
    }
  ] as Player[],
  
  news: [
    {
      id: "1",
      title: "FURIA anuncia nova parceria com patrocinador global",
      description: "A FURIA anunciou hoje uma parceria estratégica com uma grande empresa global...",
      date: "2025-05-01T14:30:00Z",
      image: "/src/assets/news/sponsorship.jpg",
      url: "#"
    },
    {
      id: "2",
      title: "FURIA vence ESL Pro League Season 18",
      description: "A equipe brasileira conquistou o título após uma final emocionante contra a Natus Vincere...",
      date: "2025-04-15T22:45:00Z",
      image: "/src/assets/news/esl-victory.jpg",
      url: "#"
    }
  ] as NewsItem[]
};

// API functions
export const furiaAPI = {
  getUpcomingMatches: async (): Promise<Match[]> => {
    // In a real implementation, you would fetch from an actual API
    // return axios.get(`${BASE_URL}/matches/upcoming/furia`).then(res => res.data);
    
    // For development, return mock data
    return Promise.resolve(mockData.upcomingMatches);
  },
  
  getRecentMatches: async (): Promise<Match[]> => {
    // In a real implementation, you would fetch from an actual API
    // return axios.get(`${BASE_URL}/matches/recent/furia`).then(res => res.data);
    
    // For development, return mock data
    return Promise.resolve(mockData.recentMatches);
  },
  
  getPlayers: async (): Promise<Player[]> => {
    // In a real implementation, you would fetch from an actual API
    // return axios.get(`${BASE_URL}/team/furia/players`).then(res => res.data);
    
    // For development, return mock data
    return Promise.resolve(mockData.players);
  },
  
  getNews: async (): Promise<NewsItem[]> => {
    // In a real implementation, you would fetch from an actual API
    // return axios.get(`${BASE_URL}/news/furia`).then(res => res.data);
    
    // For development, return mock data
    return Promise.resolve(mockData.news);
  },
  
  // Method to query the chatbot with FURIA related questions
  queryChatbot: async (query: string): Promise<{ response: string }> => {
    // In a real implementation, this would call an AI service like GPT or Gemini
    // return axios.post(`${BASE_URL}/chatbot`, { query }).then(res => res.data);
    
    // For development, simulate a response
    const responses: Record<string, string> = {
      'próximo jogo': `O próximo jogo da FURIA será contra ${mockData.upcomingMatches[0].opponent} no evento ${mockData.upcomingMatches[0].event} em ${new Date(mockData.upcomingMatches[0].date).toLocaleDateString()}.`,
      'títulos': 'A FURIA conquistou 7 títulos internacionais, incluindo o BLAST Premier: Fall 2022 e a ESL Pro League Season 18.',
      'jogadores': 'O atual elenco da FURIA é composto por KSCERATO, yuurih, arT, drop e chelo.',
      'loja': 'Você pode comprar produtos oficiais da FURIA na loja online oficial: https://lojafuria.com.br'
    };
    
    // Simple keyword matching for demo purposes
    let response = 'Desculpe, não tenho informações sobre isso. Tente perguntar sobre próximos jogos, títulos ou jogadores da FURIA.';
    
    Object.entries(responses).forEach(([key, value]) => {
      if (query.toLowerCase().includes(key)) {
        response = value;
      }
    });
    
    // Simulate API delay
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ response });
      }, 500);
    });
  }
};

export default furiaAPI;
