import { jest, describe, expect, it } from '@jest/globals';

import { readConfiguration } from '../src/utils/config.utils';
import * as clientMethods from '../src/client/create.client';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

//setup mocks
jest.mock('../src/utils/config.utils');
jest.mock('../src/client/build.client');
jest.mock('@commercetools/platform-sdk', () => ({
  createApiBuilderFromCtpClient: jest
    .fn()
    .mockReturnValue({ withProjectKey: jest.fn().mockReturnThis() }),
}));
(readConfiguration as jest.Mock).mockReturnValue({
  bloomreachDiscoveryAccountId: 'mockAccountId',
  bloomreachDiscoveryDomainKey: 'mockDomainKey',
  bloomreachDiscoveryCatalogLocale: 'en-US',
  projectKey: 'mockProjectKey',
});

describe('testing creationg of API client', () => {
  it('should create a client', () => {
    clientMethods.createApiRoot();
    expect(createApiBuilderFromCtpClient).toHaveBeenCalled();
  });

  it('should return a client', () => {
    const mockExecute = jest.fn();

    jest.spyOn(clientMethods, 'createApiRoot').mockReturnValue({
      get: jest.fn().mockReturnThis(),
      execute: mockExecute,
    } as any);

    clientMethods.getProject();
    expect(mockExecute).toHaveBeenCalled();
  });
});
