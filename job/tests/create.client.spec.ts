import { jest, describe, expect, it } from '@jest/globals';

import { readConfiguration } from '../src/utils/config.utils';
import { createApiRoot } from '../src/client/create.client';
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
    createApiRoot();
    expect(createApiBuilderFromCtpClient).toHaveBeenCalled();
  });
});
