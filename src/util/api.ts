export const getData = async (path: string) => {
  const response = await fetch(process.env.API_URL + path);
  const data = await response.json();
  return data;
};
