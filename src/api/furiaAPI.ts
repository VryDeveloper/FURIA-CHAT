
import axios from 'axios';

// Tipos para os dados da FURIA
export interface Match {
  id: string;
  opponent: string;
  competition: string;
  date: string; // ISO date string
  game: string;
  result?: 'win' | 'loss' | 'draw' | null;
  score?: string;
  opponentLogo: string;
}

export interface Player {
  id: string;
  name: string;
  nickname: string;
  role: string;
  country: string;
  image: string;
  titles: number;
  rating: number;
  achievements: string[];
  stats: {
    maps: number;
    killsPerRound: number;
    headshots: number;
    accuracy: number;
    clutches: number;
  };
}

export interface News {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  date: string; // ISO date string
  source: string;
  url?: string;
}

// URLs para as APIs
const HLTV_API = 'https://hltv-api.vercel.app';
const PROXY_API = 'https://api.allorigins.win/raw?url=';

// Serviço para buscar dados da FURIA
class FuriaAPI {
  // Buscar próximos jogos
  async getUpcomingMatches(): Promise<Match[]> {
    try {
      // Em produção, use uma API real ou webhook do HLTV 
      // Simulando dados para demonstração
      return [
        {
          id: "1",
          opponent: "Team Liquid",
          competition: "ESL Pro League",
          date: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 dias no futuro
          game: "CS2",
          opponentLogo: "/src/assets/team-liquid-logo.png"
        },
        {
          id: "2",
          opponent: "NAVI",
          competition: "BLAST Premier",
          date: new Date(Date.now() + 86400000 * 7).toISOString(), // 7 dias no futuro
          game: "CS2",
          opponentLogo: "/src/assets/navi-logo.png"
        },
        {
          id: "3",
          opponent: "FaZe Clan",
          competition: "IEM Katowice",
          date: new Date(Date.now() + 86400000 * 12).toISOString(), // 12 dias no futuro
          game: "CS2",
          opponentLogo: "/src/assets/faze-clan-logo.png"
        }
      ];
    } catch (error) {
      console.error('Erro ao buscar próximos jogos:', error);
      return [];
    }
  }

  // Buscar jogos recentes
  async getRecentMatches(): Promise<Match[]> {
    try {
      // Em produção, use uma API real
      // Simulando dados para demonstração
      return [
        {
          id: "r1",
          opponent: "MIBR",
          competition: "ESL Pro League",
          date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 dias atrás
          game: "CS2",
          result: "win",
          score: "2-0",
          opponentLogo: "/src/assets/mibr-logo.png"
        },
        {
          id: "r2",
          opponent: "G2",
          competition: "BLAST Premier",
          date: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 dias atrás
          game: "CS2",
          result: "loss",
          score: "0-2",
          opponentLogo: "/src/assets/g2-logo.png"
        },
        {
          id: "r3",
          opponent: "Vitality",
          competition: "BLAST Premier",
          date: new Date(Date.now() - 86400000 * 6).toISOString(), // 6 dias atrás
          game: "CS2",
          result: "win",
          score: "2-1",
          opponentLogo: "/src/assets/vitality-logo.png"
        }
      ];
    } catch (error) {
      console.error('Erro ao buscar jogos recentes:', error);
      return [];
    }
  }

  // Buscar informações dos jogadores
  async getPlayers(): Promise<Player[]> {
    try {
      // Em produção, use uma API real
      // Simulando dados para demonstração
      return [
        {
          id: "1",
          name: "Andrei Piovezan",
          nickname: "KSCERATO",
          role: "Rifler",
          country: "Brasil",
          image: "/src/assets/players/kscerato.png",
          titles: 7,
          rating: 1.21,
          achievements: ["ESL Pro League Season 16 - Semifinalista", "BLAST Premier: Fall 2022 - Campeão"],
          stats: {
            maps: 167,
            killsPerRound: 0.76,
            headshots: 42,
            accuracy: 89,
            clutches: 32
          }
        },
        {
          id: "2",
          name: "Yuri Santos",
          nickname: "yuurih",
          role: "Entry Fragger",
          country: "Brasil",
          image: "/src/assets/players/yuurih.png",
          titles: 7,
          rating: 1.18,
          achievements: ["ESL Pro League Season 16 - Semifinalista", "BLAST Premier: Fall 2022 - Campeão"],
          stats: {
            maps: 167,
            killsPerRound: 0.72,
            headshots: 48,
            accuracy: 85,
            clutches: 28
          }
        },
        {
          id: "3",
          name: "Kaike Cerato",
          nickname: "KSCERATO",
          role: "In-game Leader",
          country: "Brasil",
          image: "/src/assets/players/art.png",
          titles: 7,
          rating: 1.01,
          achievements: ["ESL Pro League Season 16 - Semifinalista", "BLAST Premier: Fall 2022 - Campeão"],
          stats: {
            maps: 167,
            killsPerRound: 0.68,
            headshots: 38,
            accuracy: 83,
            clutches: 18
          }
        }
      ];
    } catch (error) {
      console.error('Erro ao buscar informações dos jogadores:', error);
      return [];
    }
  }

  // Buscar notícias
  async getNews(): Promise<News[]> {
    try {
      // Em produção, use uma API real ou scraping de sites de notícias
      // Simulando dados para demonstração
      return [
        {
          id: "1",
          title: "FURIA vence Team Liquid e avança para a semifinal da ESL Pro League",
          excerpt: "A equipe brasileira mostrou um desempenho impressionante com KSCERATO liderando o caminho com uma performance de 30 frags no mapa decisivo.",
          image: "/src/assets/news/esl-victory.jpg",
          date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 dias atrás
          source: "HLTV.org"
        },
        {
          id: "2",
          title: "FURIA anuncia patrocínio milionário com marca global",
          excerpt: "A organização brasileira fechou uma parceria de três anos que promete expandir ainda mais sua presença internacional.",
          image: "/src/assets/news/sponsorship.jpg",
          date: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 dias atrás
          source: "Globo Esporte"
        },
        {
          id: "3",
          title: "Jogadores da FURIA visitam fãs em hospital de São Paulo",
          excerpt: "Em uma ação social, a equipe brasileira passou o dia com jovens pacientes, distribuindo presentes e jogando com os fãs.",
          image: "/src/assets/news/hospital-visit.jpg",
          date: new Date(Date.now() - 86400000 * 10).toISOString(), // 10 dias atrás
          source: "ESPN Brasil"
        },
        {
          id: "4",
          title: "FURIA se prepara para bootcamp na Europa antes do próximo Major",
          excerpt: "A equipe viajará na próxima semana para se preparar intensamente para o próximo grande torneio internacional.",
          image: "/src/assets/news/bootcamp.jpg",
          date: new Date(Date.now() - 86400000 * 15).toISOString(), // 15 dias atrás
          source: "Dexerto"
        }
      ];
    } catch (error) {
      console.error('Erro ao buscar notícias:', error);
      return [];
    }
  }
}

// Exporta uma instância única da API
export const furiaAPI = new FuriaAPI();
