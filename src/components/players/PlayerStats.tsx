
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress-custom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for player stats
const players = [
  {
    id: "1",
    name: "KSCERATO",
    realName: "Kaike Cerato",
    role: "Rifler",
    country: "Brasil",
    photo: "src/assets/images/kscerato-player.webp",
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
    photo: "src/assets/images/yuurih-player.webp",
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
  },
  {
    id: "3",
    name: "FalleN",
    realName: "Gabriel Toledo",
    role: "In-game Leader (AWPer)",
    country: "Brasil",
    photo: "src/assets/images/fallen-player.webp",
    stats: {
      rating: 1.06,
      kd: 1.01,
      adr: 72.3,
      kpr: 0.70,
      headshots: 27.5,
      mapsPlayed: 1050
    },
    achievements: [
      "2x Major Champion (Columbus 2016, Cologne 2016)",
      "Top 1 HLTV 2016 (as team)",
      "Joined FURIA in 2023 to lead a new era",
      "ESL Pro League Season 18 - Playoffs",
      "IEM Cologne - Quarterfinals 2023"
    ]
  }  
];

const PlayerStats = () => {
  return (
    <div className="p-6 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-furia-red">Estatísticas dos Jogadores</h2>
      
      <Tabs defaultValue="players" className="w-full">
        <TabsList className="bg-furia-gray mb-6 rounded-full overflow-hidden">
          <TabsTrigger value="players" className="data-[state=active]:bg-furia-red transition-all duration-300">Jogadores</TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-furia-red transition-all duration-300">Equipe</TabsTrigger>
        </TabsList>
        
        <TabsContent value="players" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {players.map(player => (
              <Card key={player.id} className="bg-furia-gray text-white border-furia-gray overflow-hidden hover:shadow-lg hover:shadow-furia-red/20 transition-all duration-300 group">
                <div className="flex flex-col md:flex-row items-center p-4 gap-4 border-b border-furia-red">
                  <div className="h-24 w-24 rounded-full overflow-hidden bg-black flex-shrink-0 transform group-hover:scale-105 transition-transform duration-300">
                    <img 
                      src={player.photo} 
                      alt={player.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-furia-red">{player.name}</h3>
                    <p className="text-sm">{player.realName}</p>
                    <div className="flex items-center gap-2 mt-1 justify-center md:justify-start">
                      <span className="text-xs bg-furia-black px-2 py-1 rounded">{player.role}</span>
                      <span className="text-xs bg-furia-black px-2 py-1 rounded">{player.country}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <StatLine label="Rating 2.0" value={player.stats.rating.toFixed(2)} maxValue={2} />
                    <StatLine label="K/D Ratio" value={player.stats.kd.toFixed(2)} maxValue={2} />
                    <StatLine label="ADR" value={player.stats.adr.toFixed(1)} maxValue={120} />
                    <StatLine label="KPR" value={player.stats.kpr.toFixed(2)} maxValue={1.5} />
                    <StatLine label="Headshot %" value={`${player.stats.headshots.toFixed(1)}%`} maxValue={100} percent={player.stats.headshots} />
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-2">Principais Conquistas:</h4>
                    <ul className="text-xs space-y-1 text-gray-300">
                      {player.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-furia-gold mr-2">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="team" className="mt-0">
          <Card className="bg-furia-gray text-white border-furia-gray hover:shadow-lg hover:shadow-furia-red/20 transition-all duration-300">
            <CardHeader>
              <CardTitle>Estatísticas da Equipe</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">FURIA CS2 - Ranking Mundial</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-bold text-furia-red">#5</span>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">HLTV Ranking</span>
                        <span className="text-sm text-furia-gold">Top 5</span>
                      </div>
                      <Progress value={80} className="h-2 bg-furia-black" indicatorClassName="bg-furia-red" />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-black/30 p-4 rounded-lg transform hover:scale-105 transition-all duration-300">
                    <div className="text-center">
                      <span className="text-sm text-gray-400">Títulos</span>
                      <p className="text-3xl font-bold text-furia-gold">7</p>
                    </div>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg transform hover:scale-105 transition-all duration-300">
                    <div className="text-center">
                      <span className="text-sm text-gray-400">Win Rate</span>
                      <p className="text-3xl font-bold text-furia-red">68%</p>
                    </div>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg transform hover:scale-105 transition-all duration-300">
                    <div className="text-center">
                      <span className="text-sm text-gray-400">Mapas Jogados</span>
                      <p className="text-3xl font-bold">254</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Desempenho por Mapa</h3>
                  <div className="space-y-2">
                    <MapStat name="Mirage" winRate={85} />
                    <MapStat name="Inferno" winRate={72} />
                    <MapStat name="Nuke" winRate={67} />
                    <MapStat name="Vertigo" winRate={63} />
                    <MapStat name="Anubis" winRate={58} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const StatLine = ({ label, value, maxValue, percent }: { label: string; value: string; maxValue: number; percent?: number }) => {
  // Calculate percentage based on value and maxValue
  const percentage = percent !== undefined ? percent : (parseFloat(value) / maxValue) * 100;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-300">{label}</span>
        <span className="text-xs font-semibold">{value}</span>
      </div>
      <Progress value={percentage} className="h-1.5 bg-furia-black" indicatorClassName="bg-furia-red" />
    </div>
  );
};

const MapStat = ({ name, winRate }: { name: string; winRate: number }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm">{name}</span>
        <span className="text-sm font-semibold">{winRate}% win</span>
      </div>
      <Progress value={winRate} className="h-2 bg-furia-black" indicatorClassName="bg-furia-red" />
    </div>
  );
};

export default PlayerStats;
