/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios'
import { createPathWithMultipleOptions } from './functions'
import { backURL } from './constantes';

interface Response {
  data: AxiosResponse<any>['data'];
  status?: AxiosResponse<any>['status'];
}

axios.defaults.withCredentials = true;

class Crud {
  private BASE_URL:string;

  constructor(BASE_URL: string){
    this.BASE_URL = BASE_URL;
  }
 
  async get(options:string[], ids:number[]) : Promise<Response> {
    const path: string = createPathWithMultipleOptions(options, ids);       
    const res = await axios.get(`${this.BASE_URL}/${path}`, {
      headers: {
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${await this.token()}`, 
      }
    });
    return {data : res.data, status: res.status}
  }

  async post(
    options: string[],
    ids: number[], 
    body: { [k: string]: string | number | boolean | Date | [] | "En forme" | "absent" | "blessé" |  undefined | null }
  ): Promise<Response> {
    const path:string = createPathWithMultipleOptions(options, ids);
    const res = await axios.post(
      `${this.BASE_URL}/${path}`,
      {
        ...body,
      },
      {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${await this.token()}`,
        },
      }
    );
    return { data: res.data, status: res.status };
  }

  async update(
    options: string[],
    ids: number[],
    body: { [k: string]: string | number | boolean | any[] }
  ): Promise<Response> {
    const path:string = createPathWithMultipleOptions(options, ids);
    const res = await axios.patch(
      `${this.BASE_URL}/${path}`,
      { 
        ...body
      },
      {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${await this.token()}`,
        },
      }
    );
    return { data: res.data, status: res.status };
  }
  
  async delete(options: string[],
    ids: number[],): Promise<Response> {
      const path:string = createPathWithMultipleOptions(options, ids);
      const res = await axios.delete(`${this.BASE_URL}/${path}`, {
      headers: {
        Authorization: `Bearer ${await this.token()}`,
      },
    });
    return { data: res.data, status: res.status };
  }

  async token() {
    const response = await axios.get(`${this.BASE_URL}/refresh_token`);
    return response.data.accessToken;
  }

}

export default new Crud(backURL);