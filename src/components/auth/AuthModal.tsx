
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from '@/i18n/translations';
import { toast } from '@/components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader } from 'lucide-react';

interface AuthModalProps {
  trigger?: React.ReactNode;
}

const AuthModal: React.FC<AuthModalProps> = ({ trigger }) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  
  const { login, register, isLoading, language } = useAuth();
  const { t } = useTranslation(language);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      toast.success(t('auth.loginSuccess'));
      setOpen(false);
    } catch (error) {
      toast.error(t('common.error'));
      console.error(error);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await register(email, password, displayName);
      toast.success(t('auth.registerSuccess'));
      setOpen(false);
    } catch (error) {
      toast.error(t('common.error'));
      console.error(error);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">{t('auth.login')}</Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black border border-furia-gray/30 backdrop-blur-lg animate-scale-in">
        <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">{t('auth.login')}</TabsTrigger>
            <TabsTrigger value="register">{t('auth.register')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <DialogHeader>
              <DialogTitle>{t('auth.login')}</DialogTitle>
              <DialogDescription>
                Entre com sua conta para personalizar sua experiência
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-furia-gray/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.password')}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-furia-gray/20"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {t('auth.login')}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <DialogHeader>
              <DialogTitle>{t('auth.register')}</DialogTitle>
              <DialogDescription>
                Crie uma conta para personalizar sua experiência
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleRegister} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="display-name">{t('auth.displayName')}</Label>
                <Input
                  id="display-name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  className="bg-furia-gray/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">{t('auth.email')}</Label>
                <Input
                  id="register-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-furia-gray/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">{t('auth.password')}</Label>
                <Input
                  id="register-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-furia-gray/20"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {t('auth.register')}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
