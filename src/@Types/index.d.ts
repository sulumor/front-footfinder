
export interface ScoutState {
    firstname: string,
    lastname: string,
    email: string,
    club: string,
    city: string,
    players: number,
    count: number,
}

export interface ScoutView {
  id:number;  
  scout_id: number;
  role:string;
  firstname: string;
  lastname: string;
  email: string;
  avatar:string;
  club: string,
  city: string,
  players_id: number[],
}

export interface UserState {
    logged: boolean;
    role: string | null;
    id: number;
    firstname: string
    email: string
}

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
  id: number | string;
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
  height: number | string;
  weight: number | string
}

export interface PlayerView {
  id: number;
  player_id: number;
  role:string;
  firstname: string;
  lastname: string;
  email:string;
  avatar: string;
  genre:string;
  birth_date: string;
  nationality: string;
  position: string;
  strong_foot: string;
  height: number;
  weight: number;
  number_of_matches_played: number;
  scouts: ScoutView[];
  teams: Team[];
}
export interface PlayerState {
  id: number;
  player_id: number;
  role:string;
  firstname: string;
  lastname: string;
  email:string;
  avatar: string;
  genre:string;
  birth_date: string;
  nationality: string;
  position: string;
  strong_foot: string;
  height: number;
  weight: number;
  number_of_matches_played: number;
  scouts: ScoutView[];
  teams: Team[];
  count:number;
}