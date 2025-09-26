import { envConfig } from "./env.config";

export const environment = {
  ...envConfig,
  API_ENDPOINT: "http://localhost:3001",
};
