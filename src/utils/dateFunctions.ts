export const today = new Date();
export const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
export const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

export function formatDate(date : string) : string {
  const options : Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateToFormat : string = new Date(date).toLocaleDateString("fr-FR", options);
  return dateToFormat === yesterday.toLocaleDateString("fr-FR", options) ? "Hier" : 
    dateToFormat === today.toLocaleDateString("fr-FR", options) ? "Aujourd'hui" : 
    dateToFormat === tomorrow.toLocaleDateString("fr-FR", options) ? "Demain" : 
    dateToFormat;
}

export function formatBirthDate(date : string ) : string {
  const options : Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("fr-FR", options);
}

export function formatToCalendar(date: number ) : string {
  const d : Date = new Date(date);
  return `${d.getFullYear()}-${Intl.DateTimeFormat("fr-FR", { month: "2-digit"}).format(d)}-${d.getDate()}`;
}

export function formatTime(time: string) : string {
  const timeArray : string[] = time.split(":");
  return `${timeArray[0]}h${timeArray[1]}`
}

export function stringToTimestamp(time: string) : number {
  const timeArray : string[] = time.split(":");
  const hours : number = Number.parseInt(timeArray[0], 10) * 3600;
  const minutes : number = Number.parseInt(timeArray[1], 10) * 60;
  const secondes : number = Number.parseInt(timeArray[2], 10);
  return hours + minutes + secondes;
}