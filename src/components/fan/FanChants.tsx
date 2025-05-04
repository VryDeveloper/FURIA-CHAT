
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { MessageCircle } from "lucide-react";

const predefinedChants = [
  "VAMOS FURIA! 🔥",
  "KSCERATO É O MELHOR! 👑",
  "BRASIL SIL SIL! 🇧🇷",
  "NUNCA DUVIDEI! 💪",
  "HOJE É DIA DE VITÓRIA! 🏆",
  "FURIA ORGULHO NACIONAL! 🇧🇷",
  "CHORA MAIS RIVAL! 😎"
];

const FanChants = () => {
  const [customChant, setCustomChant] = useState("");
  const [name, setName] = useState("");
  const [recentChants, setRecentChants] = useState<{name: string, chant: string, time: Date}[]>([
    { name: "FuriaFan123", chant: "VAMOS FURIA! Hoje é dia de vitória!", time: new Date(Date.now() - 120000) },
    { name: "BrasilCS", chant: "KSCERATO é o melhor rifler do mundo!", time: new Date(Date.now() - 240000) },
    { name: "GameLover", chant: "Nunca duvidei da FURIA! Sempre acreditei!", time: new Date(Date.now() - 360000) }
  ]);

  const handleSendChant = (chant: string) => {
    if (!name.trim()) {
      toast({
        title: "Digite seu nome",
        description: "Para enviar um canto, você precisa informar seu nome.",
        variant: "destructive"
      });
      return;
    }

    const newChant = { name, chant, time: new Date() };
    setRecentChants([newChant, ...recentChants]);
    toast({
      title: "Canto enviado!",
      description: "Seu apoio à FURIA foi registrado. Continue torcendo!",
      variant: "default"
    });
    
    setCustomChant("");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-furia-red">Arena da Torcida</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-furia-gray text-white border-furia-gray">
          <CardHeader>
            <CardTitle>Envie seu Apoio</CardTitle>
            <CardDescription className="text-gray-400">
              Mostre seu apoio à FURIA com uma mensagem especial
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Seu Nome</Label>
              <Input 
                id="name" 
                placeholder="Como deseja ser identificado?" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-black/30 border-furia-gray"
              />
            </div>
            <div>
              <Label htmlFor="chant">Sua Mensagem</Label>
              <Textarea 
                id="chant" 
                placeholder="Escreva sua mensagem de apoio à FURIA..." 
                value={customChant}
                onChange={(e) => setCustomChant(e.target.value)}
                className="bg-black/30 border-furia-gray min-h-[100px]"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center flex-wrap gap-2">
            <div className="flex flex-wrap gap-2">
              {predefinedChants.slice(0, 3).map((chant, i) => (
                <Button 
                  key={i} 
                  variant="outline" 
                  className="bg-black/30 border-furia-gray text-gray-300 hover:bg-furia-red hover:text-white"
                  onClick={() => handleSendChant(chant)}
                >
                  {chant}
                </Button>
              ))}
            </div>
            <Button 
              className="bg-furia-red hover:bg-furia-red/90"
              onClick={() => handleSendChant(customChant)}
              disabled={!customChant.trim()}
            >
              Enviar
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-furia-gray text-white border-furia-gray">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Mensagens da Torcida
            </CardTitle>
            <CardDescription className="text-gray-400">
              Veja o que outros fãs estão dizendo
            </CardDescription>
          </CardHeader>
          <CardContent className="max-h-[400px] overflow-y-auto">
            <div className="space-y-4">
              {recentChants.map((item, i) => (
                <div key={i} className="border-l-2 border-furia-red pl-4 py-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm">{item.name}</span>
                    <span className="text-xs text-gray-400">
                      {formatTimeAgo(item.time)}
                    </span>
                  </div>
                  <p className="text-sm">{item.chant}</p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <div className="text-center text-sm text-gray-400 w-full">
              Junte-se à torcida e apoie a FURIA!
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

// Helper function to format time ago
const formatTimeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return "agora mesmo";
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m atrás`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h atrás`;
  
  const days = Math.floor(hours / 24);
  return `${days}d atrás`;
};

export default FanChants;
