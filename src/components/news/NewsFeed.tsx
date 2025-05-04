
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";

// Mock news data
const news = [
  {
    id: "1",
    title: "FURIA vence Team Liquid e avança para a semifinal da ESL Pro League",
    excerpt: "A equipe brasileira mostrou um desempenho impressionante com KSCERATO liderando o caminho com uma performance de 30 frags no mapa decisivo.",
    image: "https://s2.glbimg.com/QeM2FL7xkA1lffDHaQdXBqXMipw=/0x0:1920x1080/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2023/f/v/2VsxLBQaSAOWOTYD1TZA/52929215603-591851a733-o.jpg",
    date: new Date(2025, 4, 28), // May 28, 2025
    source: "HLTV.org"
  },
  {
    id: "2",
    title: "FURIA anuncia patrocínio milionário com marca global",
    excerpt: "A organização brasileira fechou uma parceria de três anos que promete expandir ainda mais sua presença internacional.",
    image: "https://cdn.esportspedia.com/images/thumb/d/d7/FURIA_2018.png/600px-FURIA_2018.png",
    date: new Date(2025, 4, 25), // May 25, 2025
    source: "Globo Esporte"
  },
  {
    id: "3",
    title: "Jogadores da FURIA visitam fãs em hospital de São Paulo",
    excerpt: "Em uma ação social, a equipe brasileira passou o dia com jovens pacientes, distribuindo presentes e jogando com os fãs.",
    image: "https://www.theloadout.com/wp-content/uploads/2023/06/furia-logo-cs2.jpg",
    date: new Date(2025, 4, 20), // May 20, 2025
    source: "ESPN Brasil"
  },
  {
    id: "4",
    title: "FURIA se prepara para bootcamp na Europa antes do próximo Major",
    excerpt: "A equipe viajará na próxima semana para se preparar intensamente para o próximo grande torneio internacional.",
    image: "https://www.theloadout.com/wp-content/uploads/2023/03/furia-logo-esports-rotated.jpg",
    date: new Date(2025, 4, 15), // May 15, 2025
    source: "Dexerto"
  }
];

const NewsFeed = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-furia-red">Últimas Notícias</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-furia-gray text-white border-furia-gray overflow-hidden row-span-2 md:col-span-2">
          <div className="h-64 w-full overflow-hidden">
            <img 
              src={news[0].image} 
              alt={news[0].title} 
              className="w-full h-full object-cover"
            />
          </div>
          <CardHeader>
            <CardDescription className="text-gray-400 flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {format(news[0].date, "dd/MM/yyyy")} • {news[0].source}
            </CardDescription>
            <CardTitle className="text-xl text-white hover:text-furia-red transition-colors">
              <a href="#">{news[0].title}</a>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{news[0].excerpt}</p>
          </CardContent>
          <CardFooter>
            <a href="#" className="text-furia-red hover:underline text-sm font-medium">Ler mais →</a>
          </CardFooter>
        </Card>
        
        {news.slice(1).map(item => (
          <Card key={item.id} className="bg-furia-gray text-white border-furia-gray overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/3">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-2/3">
              <CardHeader>
                <CardDescription className="text-gray-400 text-xs flex items-center gap-2">
                  <CalendarDays className="h-3 w-3" />
                  {format(item.date, "dd/MM/yyyy")} • {item.source}
                </CardDescription>
                <CardTitle className="text-sm md:text-base hover:text-furia-red transition-colors">
                  <a href="#">{item.title}</a>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs md:text-sm line-clamp-2">{item.excerpt}</p>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
