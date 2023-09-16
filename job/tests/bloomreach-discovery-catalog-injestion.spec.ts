import { describe, expect, jest, it } from '@jest/globals';
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

// {
//   body: {
//     results: [
//       {
//         id: 'product1',
//         version: 1,
//         createdAt: '2023-01-01T00:00:00Z',
//         lastModifiedAt: '2023-01-02T00:00:00Z',
//         productType: {
//           typeId: 'product-type',
//           id: 'productType1',
//         },
//         masterData: {
//           published: true,
//           hasStagedChanges: false,
//           current: {
//             name: { en: 'Sample Product' },
//             categories: [{ typeId: 'category', id: 'category1' }],
//             slug: { en: 'sample-product' },
//             masterVariant: {
//               id: 1,
//               // Other required fields for ProductVariant
//             },
//             variants: [],
//             searchKeywords: {},
//             // Other optional fields can go here
//           },
//           staged: {
//             name: { en: 'Sample Product' },
//             categories: [{ typeId: 'category', id: 'category1' }],
//             slug: { en: 'sample-product' },
//             masterVariant: {
//               id: 1,
//               // Other required fields for ProductVariant
//             },
//             variants: [],
//             searchKeywords: {},
//             // Other optional fields can go here
//           },
//         },
//         // Additional optional fields could be here
//       },
//       {
//         id: 'product2',
//         version: 2,
//         createdAt: '2023-02-01T00:00:00Z',
//         lastModifiedAt: '2023-02-02T00:00:00Z',
//         productType: {
//           typeId: 'product-type',
//           id: 'productType2',
//         },
//         masterData: {
//           published: true,
//           hasStagedChanges: false,
//           current: {
//             name: { en: 'Sample Product' },
//             categories: [{ typeId: 'category', id: 'category1' }],
//             slug: { en: 'sample-product' },
//             masterVariant: {
//               id: 1,
//               // Other required fields for ProductVariant
//             },
//             variants: [],
//             searchKeywords: {},
//             // Other optional fields can go here
//           },
//           staged: {
//             name: { en: 'Sample Product' },
//             categories: [{ typeId: 'category', id: 'category1' }],
//             slug: { en: 'sample-product' },
//             masterVariant: {
//               id: 1,
//               // Other required fields for ProductVariant
//             },
//             variants: [],
//             searchKeywords: {},
//             // Other optional fields can go here
//           },
//         },
//         // Additional optional fields could be here
//       },
//     ], // Mock your product results here
//     total: 2, // Mock total count here
//   },
// }
