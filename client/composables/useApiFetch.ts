import type {UseFetchOptions} from 'nuxt/app'
import {useRequestHeaders} from "nuxt/app";

export function useApiFetch<T>(path: string, options: UseFetchOptions<T> = {}) {
  let headers: any = {
    accept: "application/json",
    referer: "http://localhost:3000"
  }

  const token = useCookie('access_token');

  // console.log("TOKEN =>", token.value)
  if (token.value) {
    headers['access_token'] = token.value as string;
  }

  if (process.server) {
    headers = {
      ...headers,
      ...useRequestHeaders(["cookie"]),
    }
  }
  

  return useFetch("http://localhost:4000/api/v1" + path, {
    credentials: "include",
    watch: false,
    ...options,
    headers: {
      ...headers,
      ...options?.headers
    }
  });
}