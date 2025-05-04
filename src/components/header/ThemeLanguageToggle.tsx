
import React from 'react';
import { Moon, Sun, Languages } from 'lucide-react';
import { useAuth, UserLanguage, ThemeMode } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ThemeToggle: React.FC = () => {
  const { themeMode, setThemeMode } = useAuth();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
      className="transition-all hover:scale-110"
    >
      {themeMode === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useAuth();
  
  const languages: { value: UserLanguage; label: string; flag: string }[] = [
    { value: 'pt-BR', label: 'Português', flag: '🇧🇷' },
    { value: 'en-US', label: 'English', flag: '🇺🇸' },
  ];
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="transition-all hover:scale-110">
          <Languages className="h-5 w-5" />
          <span className="sr-only">Select language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black border border-furia-gray/30 backdrop-blur-lg">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.value}
            onClick={() => setLanguage(lang.value)}
            className={`flex items-center gap-2 cursor-pointer ${language === lang.value ? 'text-furia-red' : ''}`}
          >
            <span className="mr-1">{lang.flag}</span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const ThemeLanguageToggle: React.FC = () => {
  return (
    <div className="flex items-center space-x-1">
      <ThemeToggle />
      <LanguageToggle />
    </div>
  );
};

export default ThemeLanguageToggle;
