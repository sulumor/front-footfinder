export interface ScoutState {
    firstname: string,
    lastname: string,
    email: string,
    club: string,
    city: string,
    players: number,
    count: number,
};

export interface UserState {
    logged: boolean;
    role: string;
    id: any;
    firstname: string
    email: string
};