/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios'

interface Response {
  data: AxiosResponse<any>['data'];
  status?: AxiosResponse<any>['status'];
}

class Crud {
  private BASE_URL:string;
  constructor(BASE_URL: string){
    this.BASE_URL = BASE_URL;
  }

  async getInfos(path:string, id?:number) : Promise<Response> {
    const res = typeof id !== 'undefined' 
      ? await axios.get(`${this.BASE_URL}/${path}/${id}`) 
      : await axios.get(`${this.BASE_URL}/${path}`);
    return {data : res.data, status: res.status}
  }
  async getInfosWithMultiplePaths(paths:string[], ids:number[]) : Promise<Response> {
    let path : string = '';
    for (let i : number = 0; i < paths.length; i++) {
      path += `${paths[i]}/`;
      if (typeof ids[i] !== 'undefined') path += `${ids[i]}/`; 
    }    
    const res = await axios.get(`${this.BASE_URL}/${path}`);
    return {data : res.data, status: res.status}
  }

}

export default new Crud('test');