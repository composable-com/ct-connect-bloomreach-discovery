import { describe, expect, jest, it, beforeEach } from '@jest/globals';
import { bloomreachDiscoveryCatalogIngestion } from '../src/services/bloomreach-discovery-catalog-ingestion';
import { productData, productDataEmpty } from './sample-data/product-data';
import fetchMock from 'jest-fetch-mock';
import { readConfiguration } from '../src/utils/config.utils';

import { createApiRoot } from '../src/client/create.client';

jest.mock('../src/client/create.client');
jest.mock('../src/utils/config.utils');

(readConfiguration as jest.Mock).mockReturnValue({
  bloomreachDiscoveryAccountId: 'mockAccountId',
  bloomreachDiscoveryDomainKey: 'mockDomainKey',
  bloomreachDiscoveryCatalogLocale: 'en-US',
});

beforeEach(() => {
  fetchMock.resetMocks();
  jest.clearAllMocks();
});

describe('testing bloomreachDiscoveryCatalogIngestion', () => {
  it('should execute successfully with products from commercetools', async () => {
    //setup getProducts mock
    const mockExecute = jest
      .fn<() => Promise<{ body: typeof productData }>>()
      .mockResolvedValue({ body: productData });

    (createApiRoot as jest.Mock).mockReturnValue({
      products: jest.fn().mockReturnThis(),
      get: jest.fn().mockReturnThis(),
      execute: mockExecute,
    });

    //PUT to bloomreach mock
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));

    const result = await bloomreachDiscoveryCatalogIngestion();

    expect(result).toBeDefined();
  });

  it('should execute successfully with no products from commercetools', async () => {
    const mockExecute = jest
      .fn<() => Promise<{ body: typeof productData }>>()
      .mockResolvedValue({ body: productDataEmpty });

    (createApiRoot as jest.Mock).mockReturnValue({
      products: jest.fn().mockReturnThis(),
      get: jest.fn().mockReturnThis(),
      execute: mockExecute,
    });

    fetchMock.mockResponse(JSON.stringify({ success: true }));

    const result = await bloomreachDiscoveryCatalogIngestion();

    expect(result).toBeDefined();
  });
});
