import axios from "axios";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY is missing in environment variables");
}

export const api = axios.create({
  baseURL: "https://api.spoonacular.com",
  headers: {
    "x-api-key": API_KEY,
  },
});
