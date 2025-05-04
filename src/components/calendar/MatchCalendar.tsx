
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, Trophy } from "lucide-react";

// Mock data for upcoming matches
const upcomingMatches = [
  {
    id: "1",
    opponent: "Team Liquid",
    competition: "ESL Pro League",
    date: new Date(2025, 5, 10, 15, 0), // June 10, 2025, 3:00 PM
    game: "CS2",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Team_Liquid_logo.svg/2048px-Team_Liquid_logo.svg.png"
  },
  {
    id: "2",
    opponent: "NAVI",
    competition: "BLAST Premier",
    date: new Date(2025, 5, 15, 18, 30), // June 15, 2025, 6:30 PM
    game: "CS2",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Natus_Vincere_logo.svg/1200px-Natus_Vincere_logo.svg.png"
  },
  {
    id: "3",
    opponent: "FaZe Clan",
    competition: "IEM Katowice",
    date: new Date(2025, 5, 20, 12, 0), // June 20, 2025, 12:00 PM
    game: "CS2",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/FaZe_Clan_logo.svg"
  }
];

const MatchCalendar = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  
  // Highlight dates with matches
  const matchDates = upcomingMatches.map(match => match.date);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-furia-red">Calendário de Partidas</h2>
        <div className="bg-furia-gray rounded-lg p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="bg-furia-gray text-white"
            modifiers={{
              matchDay: matchDates,
            }}
            modifiersClassNames={{
              matchDay: "bg-furia-red text-white font-bold rounded-md",
            }}
          />
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4 text-furia-red">Próximas Partidas</h2>
        <div className="space-y-4">
          {upcomingMatches.map(match => (
            <Card key={match.id} className="bg-furia-gray text-white border-furia-red">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{`FURIA vs ${match.opponent}`}</CardTitle>
                  <Badge className="bg-furia-red">{match.game}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/FURIA_Logo.svg/1200px-FURIA_Logo.svg.png" alt="FURIA" className="h-8" />
                    <span className="text-xl font-bold">VS</span>
                    <img src={match.logo} alt={match.opponent} className="h-8" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-sm text-gray-300">
                      <Trophy className="h-4 w-4" />
                      <span>{match.competition}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-300">
                      <CalendarDays className="h-4 w-4" />
                      <span>{match.date.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-300">
                      <Clock className="h-4 w-4" />
                      <span>{match.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchCalendar;
