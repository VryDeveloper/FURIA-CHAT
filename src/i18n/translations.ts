
import { UserLanguage } from "@/context/AuthContext";

export interface Translation {
  [key: string]: string;
}

export interface TranslationsByLanguage {
  [language: string]: Translation;
}

export const translations: TranslationsByLanguage = {
  'pt-BR': {
    // Navigation
    'nav.chat': 'Chat',
    'nav.agenda': 'Agenda',
    'nav.transmissions': 'Transmissões',
    'nav.players': 'Jogadores',
    'nav.tournaments': 'Torneios',
    
    // Chat Interface
    'chat.placeholder': 'Digite sua mensagem...',
    'chat.send': 'Enviar',
    'chat.loading': 'Carregando resposta...',
    
    // Matches
    'matches.upcoming': 'Próximos Jogos',
    'matches.recent': 'Jogos Recentes',
    'matches.live': 'Ao Vivo',
    'matches.vs': 'vs',
    'matches.watch': 'Assistir',
    
    // Players
    'players.stats': 'Estatísticas dos Jogadores',
    'players.rating': 'Rating',
    'players.kd': 'K/D',
    'players.adr': 'ADR',
    'players.compare': 'Comparar Jogadores',
    
    // News
    'news.latest': 'Últimas Notícias',
    'news.readMore': 'Leia Mais',
    
    // Fan Chants
    'fan.chants': 'Cantos de Torcida',
    'fan.join': 'Participe do Coro',
    
    // Authentication
    'auth.login': 'Entrar',
    'auth.register': 'Cadastrar',
    'auth.logout': 'Sair',
    'auth.email': 'Email',
    'auth.password': 'Senha',
    'auth.displayName': 'Nome de Exibição',
    'auth.loginSuccess': 'Login realizado com sucesso!',
    'auth.registerSuccess': 'Cadastro realizado com sucesso!',
    'auth.logoutSuccess': 'Logout realizado com sucesso!',
    
    // Settings
    'settings.title': 'Configurações',
    'settings.language': 'Idioma',
    'settings.theme': 'Tema',
    'settings.theme.dark': 'Escuro',
    'settings.theme.light': 'Claro',
    'settings.notifications': 'Notificações',
    'settings.notifications.on': 'Ativadas',
    'settings.notifications.off': 'Desativadas',
    
    // Common
    'common.loading': 'Carregando...',
    'common.error': 'Ocorreu um erro',
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.confirm': 'Confirmar',
    'common.back': 'Voltar',
    'common.next': 'Próximo',
  },
  'en-US': {
    // Navigation
    'nav.chat': 'Chat',
    'nav.agenda': 'Calendar',
    'nav.transmissions': 'Streams',
    'nav.players': 'Players',
    'nav.tournaments': 'Tournaments',
    
    // Chat Interface
    'chat.placeholder': 'Type your message...',
    'chat.send': 'Send',
    'chat.loading': 'Loading response...',
    
    // Matches
    'matches.upcoming': 'Upcoming Matches',
    'matches.recent': 'Recent Matches',
    'matches.live': 'Live',
    'matches.vs': 'vs',
    'matches.watch': 'Watch',
    
    // Players
    'players.stats': 'Player Stats',
    'players.rating': 'Rating',
    'players.kd': 'K/D',
    'players.adr': 'ADR',
    'players.compare': 'Compare Players',
    
    // News
    'news.latest': 'Latest News',
    'news.readMore': 'Read More',
    
    // Fan Chants
    'fan.chants': 'Fan Chants',
    'fan.join': 'Join the Chorus',
    
    // Authentication
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.logout': 'Logout',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.displayName': 'Display Name',
    'auth.loginSuccess': 'Login successful!',
    'auth.registerSuccess': 'Registration successful!',
    'auth.logoutSuccess': 'Logout successful!',
    
    // Settings
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    'settings.theme.dark': 'Dark',
    'settings.theme.light': 'Light',
    'settings.notifications': 'Notifications',
    'settings.notifications.on': 'On',
    'settings.notifications.off': 'Off',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.back': 'Back',
    'common.next': 'Next',
  },
};

export const useTranslation = (language: UserLanguage) => {
  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };
  
  return { t };
};
