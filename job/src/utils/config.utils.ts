import CustomError from '../errors/custom.error';
import envValidators from '../validators/env.validators';
import { getValidateMessages } from '../validators/helpers.validators';

/**
 * Read the configuration env vars
 * (Add yours accordingly)
 *
 * @returns The configuration with the correct env vars
 */
export const readConfiguration = () => {
  const envVars = {
    clientId: process.env.CTP_CLIENT_ID as string,
    clientSecret: process.env.CTP_CLIENT_SECRET as string,
    projectKey: process.env.CTP_PROJECT_KEY as string,
    scope: process.env.CTP_SCOPE,
    region: process.env.CTP_REGION as string,
    bloomreachDiscoveryAccountId: process.env
      .BLOOMREACH_DISCOVERY_ACCOUNT_ID as string,
    bloomreachDiscoveryAuthKey: process.env
      .BLOOMREACH_DISCOVERY_AUTH_KEY as string,
    bloomreachDiscoveryDomainKey: process.env
      .BLOOMREACH_DISCOVERY_DOMAIN_KEY as string,
    bloomreachDiscoveryApiKey: process.env
      .BLOOMREACH_DISCOVERY_API_KEY as string,
    bloomreachDiscoveryCatalogLocale:
      (process.env.BLOOMREACH_DISCOVERY_CATALOG_LOCALE as string) || 'en-US',
  };

  const validationErrors = getValidateMessages(envValidators, envVars);

  if (validationErrors.length) {
    throw new CustomError(
      'InvalidEnvironmentVariablesError',
      'Invalid Environment Variables please check your .env file',
      validationErrors
    );
  }

  return envVars;
};
