import { jest, describe, it, beforeEach, expect } from '@jest/globals';

import * as validatorHelpers from '../src/validators/helpers.validators';

jest
  .spyOn(validatorHelpers, 'getValidateMessages')
  .mockImplementation(jest.fn().mockReturnValue([]));

import { readConfiguration } from '../src/utils/config.utils';
import CustomError from '../src/errors/custom.error';

describe('readConfiguration', () => {
  // Mocked environment variables
  const mockEnv = {
    CTP_CLIENT_ID: 'mockClientId',
    CTP_CLIENT_SECRET: 'mockClientSecret',
    CTP_PROJECT_KEY: 'mockProjectKey',
    CTP_SCOPE: 'mockScope',
    CTP_REGION: 'mockRegion',
    BLOOMREACH_DISCOVERY_ACCOUNT_ID: 'mockAccountId',
    BLOOMREACH_DISCOVERY_AUTH_KEY: 'mockAuthKey',
    BLOOMREACH_DISCOVERY_DOMAIN_KEY: 'mockDomainKey',
    BLOOMREACH_DISCOVERY_API_KEY: 'mockApiKey',
    BLOOMREACH_DISCOVERY_CATALOG_LOCALE: 'mockLocale',
  };

  beforeEach(() => {
    process.env = {}; // Reset environment variables
  });

  it('should read and return environment variables correctly', () => {
    jest
      .spyOn(validatorHelpers, 'getValidateMessages')
      .mockImplementationOnce(jest.fn().mockReturnValue([]));

    process.env = { ...mockEnv };

    const config = readConfiguration();
    expect(config.clientId).toBe('mockClientId');
    expect(config.clientSecret).toBe('mockClientSecret');
    expect(config.projectKey).toBe('mockProjectKey');
    expect(config.region).toBe('mockRegion');
    expect(config.scope).toBe('mockScope');
    expect(config.bloomreachDiscoveryAccountId).toBe('mockAccountId');
    expect(config.bloomreachDiscoveryAuthKey).toBe('mockAuthKey');
    expect(config.bloomreachDiscoveryDomainKey).toBe('mockDomainKey');
    expect(config.bloomreachDiscoveryApiKey).toBe('mockApiKey');
    expect(config.bloomreachDiscoveryCatalogLocale).toBe('mockLocale');
  });

  it('should throw CustomError when there are validation errors', () => {
    jest
      .spyOn(validatorHelpers, 'getValidateMessages')
      .mockImplementationOnce(jest.fn().mockReturnValue(['error']));

    expect(readConfiguration).toThrow(CustomError);
  });
});
