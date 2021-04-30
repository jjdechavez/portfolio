import fetch from 'isomorphic-unfetch';

export interface ErrorData extends Error {
  response: any;
  data: any;
}

export default async function fetchJson<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  try {
    const response = await fetch(input, init);
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    const error = new Error(response.statusText) as ErrorData;
    error.response = response;
    error.data = data;
    throw error;
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
}
