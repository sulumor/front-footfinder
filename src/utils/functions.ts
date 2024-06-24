import { JwtPayload, jwtDecode } from "jwt-decode";
import { Match } from "@/@Types";
import crud from "./crud";

export function createPathWithMultipleOptions(options:string[], ids: number[]) : string {
  let path : string = "";
  for (let i : number = 0; i < options.length; i++) {
    path += `${options[i]}/`;
    if (typeof ids[i] !== "undefined") path += `${ids[i]}/`;
  }
  return path;
}

export function sortByAsc(matches: Match[]) : Match[]{
  const sortResponse : Match[] = matches?.sort((a : Match, b : Match) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return sortResponse;
}

export function sortByDesc(matches: Match[]) : Match[] {
  const sortResponse : Match[] = matches.sort((a : Match, b : Match) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return sortResponse;
}


export function calculateAge(birthdate: string): number {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

export async function checkToken() {
  const token = localStorage.getItem("token");
  const decoded : JwtPayload = jwtDecode<JwtPayload>(token || "");

  if (token !== null && (decoded.exp)! < Math.floor(Date.now() / 1000)) await crud.token();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function plurials(arg: any[] | number):string{
  if (typeof arg === "number") return arg > 1 ? "s" : "";
  if (arg?.length > 1) return "s";
  return "";
}
