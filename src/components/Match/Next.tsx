import { Match } from "@/@Types";
import { useEffect, useState } from "react";
import AddMatchButton from "../Button/addMatch";
import crud from "@/utils/crud";
import "./Next.scss";

const NextMatch = () => {
  const id : string | null = localStorage.getItem("id");
  const [match, setMatch] = useState<Match>();

  const getNextMatch : () => Promise<void> = async () => {
    const responses  = await crud.get(['player', 'match', 'stats'], [Number.parseInt(id!, 10)]);
    const sortResponse : Match[] = responses.data.sort(function(a : Match, b : Match) {
      
      return new Date(a.date).getTime()  - new Date(b.date).getTime();
    });
    
    const today : Date = new Date();
    const nextMatch : Match[] = sortResponse.filter(((match: Match) => new Date(match.date) > today))
    return setMatch(nextMatch[0]);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getNextMatch();
    };
    fetchData();
  }, []);

  return (
    <div className="player_match">
      <h3>Prochain match: </h3>
      <span>
        {new Date(match?.date as Date).toLocaleDateString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </span>
      <div className="player_match_infos">
        <h3>
          {match?.home.club_name} - {match?.away.club_name}
        </h3>
        <p>{match?.home.stadium_name}</p>
        <p>
          {match?.home.adress}, {match?.home.zip_code}{" "}
          {match?.home.city}
        </p>
        <AddMatchButton/>
      </div>
    </div>
  );
}

export default NextMatch;