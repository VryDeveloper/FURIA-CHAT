
import React, { createContext, useState, useContext, useEffect } from 'react';

export type UserLanguage = 'pt-BR' | 'en-US';
export type ThemeMode = 'dark' | 'light';

export interface User {
  id: string;
  email: string;
  displayName: string;
  favoriteTeam?: string;
  favoritePlayers?: string[];
  language: UserLanguage;
  themePreference: ThemeMode;
  notifications: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  updateUserPreferences: (preferences: Partial<User>) => Promise<void>;
  setLanguage: (language: UserLanguage) => void;
  setThemeMode: (theme: ThemeMode) => void;
  language: UserLanguage;
  themeMode: ThemeMode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock authentication functions
const mockAuth = {
  login: async (email: string, password: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // In a real app, this would call an API endpoint
    if (email && password) {
      return {
        id: '123',
        email,
        displayName: 'FURIA Fan',
        language: 'pt-BR' as UserLanguage,
        themePreference: 'dark' as ThemeMode,
        notifications: true,
      };
    }
    throw new Error('Invalid credentials');
  },
  
  register: async (email: string, password: string, displayName: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // In a real app, this would call an API endpoint
    if (email && password && displayName) {
      return {
        id: '123',
        email,
        displayName,
        language: 'pt-BR' as UserLanguage,
        themePreference: 'dark' as ThemeMode,
        notifications: true,
      };
    }
    throw new Error('Registration failed');
  }
};

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [language, setLanguage] = useState<UserLanguage>('pt-BR');
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
  
  useEffect(() => {
    // Check if user is stored in local storage
    const storedUser = localStorage.getItem('furia-user');
    const storedLang = localStorage.getItem('furia-language') as UserLanguage || 'pt-BR';
    const storedTheme = localStorage.getItem('furia-theme') as ThemeMode || 'dark';
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setLanguage(storedLang);
    setThemeMode(storedTheme);
    setIsLoading(false);
    
    // Apply theme
    document.documentElement.classList.toggle('dark', storedTheme === 'dark');
  }, []);
  
  // Save theme changes to localStorage and update DOM
  useEffect(() => {
    localStorage.setItem('furia-theme', themeMode);
    document.documentElement.classList.toggle('dark', themeMode === 'dark');
  }, [themeMode]);
  
  // Save language changes to localStorage
  useEffect(() => {
    localStorage.setItem('furia-language', language);
  }, [language]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await mockAuth.login(email, password);
      setUser(userData);
      localStorage.setItem('furia-user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, displayName: string) => {
    setIsLoading(true);
    try {
      const userData = await mockAuth.register(email, password, displayName);
      setUser(userData);
      localStorage.setItem('furia-user', JSON.stringify(userData));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    // In a real app, this would call an API endpoint
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    setUser(null);
    localStorage.removeItem('furia-user');
    setIsLoading(false);
  };
  
  const updateUserPreferences = async (preferences: Partial<User>) => {
    if (!user) return;
    
    setIsLoading(true);
    // In a real app, this would call an API endpoint
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const updatedUser = { ...user, ...preferences };
    setUser(updatedUser);
    localStorage.setItem('furia-user', JSON.stringify(updatedUser));
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated: !!user,
      login, 
      logout,
      register,
      updateUserPreferences,
      setLanguage,
      setThemeMode,
      language,
      themeMode,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
