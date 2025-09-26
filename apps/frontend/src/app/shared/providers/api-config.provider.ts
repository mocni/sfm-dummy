import { environment } from "environments/environment";
import { Configuration, ConfigurationParameters } from "../../../../libs/api-client-smart-fleet-management";

export const configFactory = (): Configuration => {
  const params: ConfigurationParameters = {
    basePath: environment.API_ENDPOINT,
  };

  return new Configuration(params);
};
