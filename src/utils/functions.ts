import { Match } from "@/@Types";

export function createPathWithMultipleOptions(options:string[], ids: number[]) : string{
  let path : string = '';
    for (let i : number = 0; i < options.length; i++) {
      path += `${options[i]}/`;
      if (typeof ids[i] !== 'undefined') path += `${ids[i]}/`; 
    }
  return path;
}

export function sortByAsc(matches: Match[]) {
  const sortResponse : Match[] = matches.sort(function(a : Match, b : Match) {
    return new Date(a.date).getTime()  - new Date(b.date).getTime();
  });

  return sortResponse;
}
export function sortByDesc(matches: Match[]) {
  const sortResponse : Match[] = matches.sort(function(a : Match, b : Match) {
    return new Date(b.date).getTime()  - new Date(a.date).getTime();
  });

  return sortResponse;
}

export function formatDate (date : string | Date) {
  const options : Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  return new Date(date as Date).toLocaleDateString("fr-FR", options)
}