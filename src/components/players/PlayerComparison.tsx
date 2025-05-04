
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { furiaAPI, Player } from '@/api/furiaAPI';
import { Radar } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from '@/i18n/translations';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const PlayerComparison = () => {
  const { language } = useAuth();
  const { t } = useTranslation(language);
  const [player1Id, setPlayer1Id] = useState<string>("");
  const [player2Id, setPlayer2Id] = useState<string>("");

  const { data: players, isLoading } = useQuery({
    queryKey: ['players'],
    queryFn: () => furiaAPI.getPlayers(),
  });

  const getSelectedPlayer = (id: string): Player | undefined => {
    if (!players) return undefined;
    return players.find(player => player.id === id);
  };

  const player1 = getSelectedPlayer(player1Id);
  const player2 = getSelectedPlayer(player2Id);

  const generateComparisonData = () => {
    if (!player1?.stats || !player2?.stats) return [];

    return [
      {
        attribute: 'Rating',
        player1: player1.stats.rating || 0,
        player2: player2.stats.rating || 0,
        fullMark: 2,
      },
      {
        attribute: 'K/D',
        player1: player1.stats.kd || 0,
        player2: player2.stats.kd || 0,
        fullMark: 2,
      },
      {
        attribute: 'ADR',
        player1: player1.stats.adr || 0,
        player2: player2.stats.adr || 0,
        fullMark: 150,
      },
      {
        attribute: 'KPR',
        player1: player1.stats.kpr || 0,
        player2: player2.stats.kpr || 0,
        fullMark: 1,
      },
      {
        attribute: 'HS%',
        player1: player1.stats.headshots || 0,
        player2: player2.stats.headshots || 0,
        fullMark: 100,
      },
    ];
  };

  if (isLoading) {
    return (
      <Card className="w-full animate-fade-in bg-black/30 backdrop-blur-sm border border-furia-gray/30">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
          <Skeleton className="h-80 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full animate-fade-in bg-black/30 backdrop-blur-sm border border-furia-gray/30 hover-glow transition-base">
      <CardHeader>
        <CardTitle className="text-xl text-gradient">{t('players.compare')}</CardTitle>
        <CardDescription>
          {t('players.stats')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Select
            value={player1Id}
            onValueChange={(value) => setPlayer1Id(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('players.stats')} />
            </SelectTrigger>
            <SelectContent>
              {players?.map((player) => (
                <SelectItem key={player.id} value={player.id}>
                  {player.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={player2Id}
            onValueChange={(value) => setPlayer2Id(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('players.stats')} />
            </SelectTrigger>
            <SelectContent>
              {players?.map((player) => (
                <SelectItem key={player.id} value={player.id}>
                  {player.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {player1 && player2 ? (
          <div className="h-80 w-full mt-6 animate-fade-in">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={generateComparisonData()}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="attribute" stroke="white" />
                <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
                <Radar
                  name={player1.name}
                  dataKey="player1"
                  stroke="#ff0000"
                  fill="#ff0000"
                  fillOpacity={0.3}
                />
                <Radar
                  name={player2.name}
                  dataKey="player2"
                  stroke="#ffff00"
                  fill="#ffff00"
                  fillOpacity={0.3}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-80 flex items-center justify-center text-gray-400">
            {t('players.stats')}
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-gray-400">
        {player1 && player2 ? (
          <p>
            Comparing {player1.name} ({player1.stats?.mapsPlayed || 0} maps) with {player2.name} ({player2.stats?.mapsPlayed || 0} maps)
          </p>
        ) : (
          <p>{t('players.stats')}</p>
        )}
      </CardFooter>
    </Card>
  );
};

export default PlayerComparison;
