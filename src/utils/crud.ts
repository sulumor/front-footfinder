/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosResponse } from "axios";
import { checkToken, createPathWithMultipleOptions } from "./functions";

interface Response {
  data: AxiosResponse<any>["data"];
  status?: AxiosResponse<any>["status"];
}

axios.defaults.withCredentials = true;

class Crud {
  private BASE_URL: string;

  constructor(BASE_URL: string) {
    this.BASE_URL = BASE_URL;
  }

  async get(options: string[], ids: number[]): Promise<Response> {
    await checkToken();
    const path: string = createPathWithMultipleOptions(options, ids);
    try {
      const res = await axios.get(`${this.BASE_URL}/${path}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return { data: res.data, status: res.status };
    } catch (error) {
      if (error instanceof AxiosError) return { status: error.response?.status, data: error.response?.data };
      return { status: 500, data: "Internal Server Error" };
    }

  }

  async post(
    options: string[],
    ids: number[],
    body: { [k: string]: string | number | boolean | Date | [] | "En forme" | "absent" | "blessé" | undefined | null },
  ): Promise<Response> {
    await checkToken();
    const path: string = createPathWithMultipleOptions(options, ids);
    const res = await axios.post(
      `${this.BASE_URL}/${path}`,
      {
        ...body,
      },
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return { data: res.data, status: res.status };
  }

  async update(
    options: string[],
    ids: number[],
    body: { [k: string]: string | number | boolean | any[] },
  ): Promise<Response> {
    await checkToken();
    const path: string = createPathWithMultipleOptions(options, ids);
    const res = await axios.patch(
      `${this.BASE_URL}/${path}`,
      {
        ...body,
      },
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return { data: res.data, status: res.status };
  }

  async delete(
    options: string[],
    ids: number[],
  ): Promise<Response> {
    await checkToken();
    const path: string = createPathWithMultipleOptions(options, ids);
    const res = await axios.delete(`${this.BASE_URL}/${path}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return { data: res.data, status: res.status };
  }

  async search(options: string[], params: any): Promise<Response> {
    await checkToken();
    const path: string = createPathWithMultipleOptions(options, []);
    const res = await axios.get(`${this.BASE_URL}/${path}`, {
      params,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return { data: res.data, status: res.status };
  }

  async token() {
    const response = await axios.post(`${this.BASE_URL}/refresh_token`, {
      refreshToken : localStorage.getItem("refreshToken"),
    });
    localStorage.setItem("token", response.data.accessToken);
  }
}

export default new Crud(import.meta.env.VITE_BACK);
