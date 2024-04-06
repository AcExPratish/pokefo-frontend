import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
interface CallAxiosAPIProps {
  url: string;
  method: Method;
  data?: any;
  headers?: any;
  params?: string;
  isAuthentication?: boolean;
  responseType?: any;
}

export const callAxios = async ({
  url,
  method,
  data,
  headers,
  params,
}: CallAxiosAPIProps) => {
  let baseURL: string = "http://3.86.8.207/api/";

  const config: AxiosRequestConfig = {
    method: method || "GET",
    url: `${baseURL}${url}`,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    data,
    params,
    timeout: 30000,
  };
  return axios(config)
    .then((res: AxiosResponse<any, any>) => res)
    .catch((error: any) => error);
};
