const { BASE_URL } = process.env;

export async function fetchServer(endpoint: string) {
  return await fetch(`${BASE_URL}/api/${endpoint}`);
}
