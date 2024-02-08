export function createPathWithMultipleOptions(options:string[], ids: number[]) : string{
  let path : string = '';
    for (let i : number = 0; i < options.length; i++) {
      path += `${options[i]}/`;
      if (typeof ids[i] !== 'undefined') path += `${ids[i]}/`; 
    }
  return path;
}