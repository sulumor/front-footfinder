/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios'
import Cookies from 'js-cookie';
import { createPathWithMultipleOptions } from './functions'

interface Response {
  data: AxiosResponse<any>['data'];
  status?: AxiosResponse<any>['status'];
}

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
        Authorization: `Bearer ${Cookies.get('token')}`, 
      }
    });
    return {data : res.data, status: res.status}
  }

  async post(
    options: string[],
    ids: number[], 
    body: { [k: string]: string | number | boolean | [] | undefined | null }
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
          Authorization: `Bearer ${Cookies.get('token')}`,
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
          Authorization: `Bearer ${Cookies.get('token')}`,
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
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return { data: res.data, status: res.status };
  }

}

export default new Crud('http://localhost:3000');