// ----------------Type Player ----------
export interface Stats {
  assists: number;
  goals_conceded: number;
  red_card: number;
  yellow_card: number;
  stops: number;
  goals_scored: number;
  minutes_played: number;
  fitness: "En forme" | "absent" | "blessé";
}

export interface Team {
  id: number;
  club_name: string;
  stadium_name: string;
  adress: string;
  zip_code: string;
  city: string;
  longitude: string;
  latitude: string;
}

export interface Match {
  id: number;
  match_id: number;
  score: string;
  date: string | Date ; 
  assists: number;
  goals_conceded: number;
  red_card: number;
  yellow_card: number;
  stops: number;
  goals_scored: number;
  minutes_played: number;
  fitness: "En forme" | "absent" | "blessé";
  home: Team;
  away: Team;
}

export interface setMatch {
  homeTeam: number;
  awayTeam: number;
  date: string | Date;
}


export interface Player {
  id: number;
  firstname: string;
  lastname: string;
  position: string;
  strong_foot: string;
  height: number;
  weight: number;
}

export interface PlayerPatch {
  firstname: string;
  lastname: string;
  email: string;
  position: string;
  nationality: string;
  strong_foot: string;
  height: string;
  weight: string;
}