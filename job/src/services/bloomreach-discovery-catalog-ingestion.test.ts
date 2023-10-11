import { describe, expect, jest, it, beforeEach } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';
import { bloomreachDiscoveryCatalogIngestion } from './bloomreach-discovery-catalog-ingestion'
import { createApiRoot } from '../client/create.client'

jest.mock('../client/create.client');
jest.mock('../utils/config.utils');

jest.mock('../utils/config.utils', () => {
  return {
    readConfiguration: jest.fn().mockReturnValue({
      clientId: 'mockClientId',
      clientSecret: 'mockClientSecret',
      projectKey: 'mockProjectKey',
      scope: 'manage_project:mockProjectKey view_products:mockProjectKey',
      region: 'mockRegion',
      bloomreachDiscoveryAccountId: 'mockAccountId',
      bloomreachDiscoveryAuthKey: 'mockAuthKey',
      bloomreachDiscoveryDomainKey: 'mockDomainKey',
      bloomreachDiscoveryApiKey: 'mockApiKey',
      bloomreachDiscoveryCatalogLocale: 'en-US',
    }),
  };
});

beforeEach(() => {
  fetchMock.enableMocks();
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

export const productData = {
  limit: 20,
  offset: 0,
  count: 1,
  total: 1,
  results: [
    {
      id: 'e066a0c4-ea93-449f-8775-e45dd4f8d1f5',
      version: 28,
      versionModifiedAt: '2023-09-13T15:45:16.510Z',
      lastMessageSequenceNumber: 14,
      createdAt: '2022-09-14T22:03:18.948Z',
      lastModifiedAt: '2023-08-30T17:02:46.954Z',
      lastModifiedBy: {
        isPlatformClient: true,
      },
      createdBy: {
        clientId: 'ck1ibqsxjtdr7PkFLz61OLCw',
        isPlatformClient: false,
      },
      productType: {
        typeId: 'product-type',
        id: 'f2d332b0-23f4-482e-a869-bb59ee6c35b6',
      },
      masterData: {
        current: {
          name: {
            'en-US': 'sample name',
            'en-CA': 'sample name',
            'fr-CA': 'sample name',
          },
          description: {
            'en-US': 'sample description',
            'en-CA': 'sample description',
            'fr-CA': 'sample description',
          },
          categories: [
            {
              typeId: 'category',
              id: '1ada7ab0-839d-4a92-8439-5a417feb32a9',
            },
          ],
          categoryOrderHints: {},
          slug: {
            'en-US': 'sample-slug',
            'en-CA': 'sample-slug',
            'fr-CA': 'sample-slug',
          },
          masterVariant: {
            id: 1,
            sku: 'sample-slug',
            prices: [
              {
                id: 'a8cc6502-c285-4d5f-8459-038c6abcb3a3',
                value: {
                  type: 'centPrecision',
                  currencyCode: 'USD',
                  centAmount: 39900,
                  fractionDigits: 2,
                },
              },
              {
                id: '049df840-2b05-443b-a1ba-88a068bbac52',
                value: {
                  type: 'centPrecision',
                  currencyCode: 'CAD',
                  centAmount: 30700,
                  fractionDigits: 2,
                },
              },
            ],
            images: [
              {
                url: 'https://sample.com/image.jpg',
                dimensions: {
                  w: 715,
                  h: 860,
                },
              },
              {
                url: 'https://sample.com/image.jpg',
                dimensions: {
                  w: 715,
                  h: 860,
                },
              },
              {
                url: 'https://sample.com/image.jpg',
                dimensions: {
                  w: 715,
                  h: 860,
                },
              },
              {
                url: 'https://sample.com/image.jpg',
                dimensions: {
                  w: 715,
                  h: 860,
                },
              },
              {
                url: 'https://sample.com/image.jpg',
                dimensions: {
                  w: 715,
                  h: 860,
                },
              },
              {
                url: 'https://sample.com/image.jpg',
                dimensions: {
                  w: 715,
                  h: 860,
                },
              },
              {
                url: 'https://sample.com/image.jpg',
                dimensions: {
                  w: 715,
                  h: 860,
                },
              },
              {
                url: 'https://sample.com/image.jpg',
                dimensions: {
                  w: 715,
                  h: 860,
                },
              },
              {
                url: 'https://sample.com/image.jpg',
                dimensions: {
                  w: 715,
                  h: 860,
                },
              },
              {
                url: 'https://sample.com/image.jpg',
                dimensions: {
                  w: 715,
                  h: 860,
                },
              },
            ],
            attributes: [
              {
                name: 'seller',
                value: 'splash,manifold',
              },
              {
                name: 'type',
                value: 'accessories',
              },
              {
                name: 'brand',
                value: 'SAMPLE',
              },
              {
                name: 'rating',
                value: 1.8,
              },
              {
                name: 'test5',
                value: [
                  {
                    key: '3',
                    label: '3',
                  },
                  {
                    key: '1',
                    label: '1',
                  },
                ],
              },
              {
                name: 'test6',
                value: {
                  key: '1',
                  label: '1',
                },
              },
            ],
            assets: [],
            availability: {
              isOnStock: true,
              availableQuantity: 86,
              version: 4,
              id: 'fb552c65-5701-4164-8efc-ec7da122b232',
              channels: {
                '8dd606fb-4db2-4671-b8e4-a97dd444c677': {
                  isOnStock: true,
                  availableQuantity: 100,
                  version: 1,
                  id: '6c7060af-ed1d-438f-830c-85ca0d8fe642',
                },
                'c22ffb1e-ea4e-46a7-ac39-82d4a62d2171': {
                  isOnStock: true,
                  availableQuantity: 100,
                  version: 1,
                  id: 'da875f86-eb18-40ab-83ad-6112a1939365',
                },
              },
            },
          },
          variants: [
            {
              id: 1,
              sku: 'sample-slug',
              prices: [
                {
                  id: 'a8cc6502-c285-4d5f-8459-038c6abcb3a3',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'USD',
                    centAmount: 39900,
                    fractionDigits: 2,
                  },
                },
                {
                  id: '049df840-2b05-443b-a1ba-88a068bbac52',
                  value: {
                    type: 'centPrecision',
                    currencyCode: 'CAD',
                    centAmount: 30700,
                    fractionDigits: 2,
                  },
                },
              ],
              images: [
                {
                  url: 'https://sample.com/image.jpg',
                  dimensions: {
                    w: 715,
                    h: 860,
                  },
                },
                {
                  url: 'https://sample.com/image.jpg',
                  dimensions: {
                    w: 715,
                    h: 860,
                  },
                },
                {
                  url: 'https://sample.com/image.jpg',
                  dimensions: {
                    w: 715,
                    h: 860,
                  },
                },
                {
                  url: 'https://sample.com/image.jpg',
                  dimensions: {
                    w: 715,
                    h: 860,
                  },
                },
                {
                  url: 'https://sample.com/image.jpg',
                  dimensions: {
                    w: 715,
                    h: 860,
                  },
                },
                {
                  url: 'https://sample.com/image.jpg',
                  dimensions: {
                    w: 715,
                    h: 860,
                  },
                },
                {
                  url: 'https://sample.com/image.jpg',
                  dimensions: {
                    w: 715,
                    h: 860,
                  },
                },
                {
                  url: 'https://sample.com/image.jpg',
                  dimensions: {
                    w: 715,
                    h: 860,
                  },
                },
                {
                  url: 'https://sample.com/image.jpg',
                  dimensions: {
                    w: 715,
                    h: 860,
                  },
                },
                {
                  url: 'https://sample.com/image.jpg',
                  dimensions: {
                    w: 715,
                    h: 860,
                  },
                },
              ],
              attributes: [
                {
                  name: 'seller',
                  value: 'splash,manifold',
                },
                {
                  name: 'type',
                  value: 'accessories',
                },
                {
                  name: 'brand',
                  value: 'SAMPLE',
                },
                {
                  name: 'rating',
                  value: 1.8,
                },
                {
                  name: 'test5',
                  value: [
                    {
                      key: '3',
                      label: '3',
                    },
                    {
                      key: '1',
                      label: '1',
                    },
                  ],
                },
                {
                  name: 'test6',
                  value: {
                    key: '1',
                    label: '1',
                  },
                },
              ],
              assets: [],
              availability: {
                isOnStock: true,
                availableQuantity: 86,
                version: 4,
                id: 'fb552c65-5701-4164-8efc-ec7da122b232',
                channels: {
                  '8dd606fb-4db2-4671-b8e4-a97dd444c677': {
                    isOnStock: true,
                    availableQuantity: 100,
                    version: 1,
                    id: '6c7060af-ed1d-438f-830c-85ca0d8fe642',
                  },
                  'c22ffb1e-ea4e-46a7-ac39-82d4a62d2171': {
                    isOnStock: true,
                    availableQuantity: 100,
                    version: 1,
                    id: 'da875f86-eb18-40ab-83ad-6112a1939365',
                  },
                },
              },
            },
          ],
          searchKeywords: {},
        },
        staged: {
          name: {
            'en-US': 'sample name',
            'en-CA': 'sample name',
            'fr-CA': 'sample name',
          },
          description: {
            'en-US': 'sample description',
            'en-CA': 'sample description',
            'fr-CA': 'sample description',
          },
          categories: [
            {
              typeId: 'category',
              id: '1ada7ab0-839d-4a92-8439-5a417feb32a9',
            },
          ],
          categoryOrderHints: {},
          slug: {
            'en-US': 'sample-slug',
            'en-CA': 'sample-slug',
            'fr-CA': 'sample-slug',
          },
          masterVariant: {
            id: 1,
            sku: 'sample-slug',
            prices: [
              {
                id: 'a8cc6502-c285-4d5f-8459-038c6abcb3a3',
                value: {
                  type: 'centPrecision',
                  currencyCode: 'USD',
                  centAmount: 39900,
                  fractionDigits: 2,
                },
              },
              {
                id: '049df840-2b05-443b-a1ba-88a068bbac52',
                value: {
                  type: 'centPrecision',
                  currencyCode: 'CAD',
                  centAmount: 30700,
                  fractionDigits: 2,
                },
              },
            ],
            images: [
              {
                url: 'https://sample.com/image.jpg',
                dimensions: {
                  w: 715,
                  h: 860,
                },
              },
              {
                url: 'https://sample.com/image.jpg',
                dimensions: {
                  w: 715,
                  h: 860,
                },
              },
              {
                url: 'https://sample.com/image.jpg',
                dimensions: {
                  w: 715,
                  h: 860,
                },
              },
              {
                url: 'https://sample.com/image.jpg',
                dimensions: {
                  w: 715,
                  h: 860,
                },
              },
              {
                url: 'https://sample.com/image.jpg',
                dimensions: {
                  w: 715,
                  h: 860,
                },
              },
              {
                url: 'https://sample.com/image.jpg',
                dimensions: {
                  w: 715,
                  h: 860,
                },
              },
              {
                url: 'https://sample.com/image.jpg',
                dimensions: {
                  w: 715,
                  h: 860,
                },
              },
              {
                url: 'https://sample.com/image.jpg',
                dimensions: {
                  w: 715,
                  h: 860,
                },
              },
              {
                url: 'https://sample.com/image.jpg',
                dimensions: {
                  w: 715,
                  h: 860,
                },
              },
              {
                url: 'https://sample.com/image.jpg',
                dimensions: {
                  w: 715,
                  h: 860,
                },
              },
            ],
            attributes: [
              {
                name: 'seller',
                value: 'splash,manifold',
              },
              {
                name: 'type',
                value: 'accessories',
              },
              {
                name: 'brand',
                value: 'SAMPLE',
              },
              {
                name: 'rating',
                value: 1.8,
              },
            ],
            assets: [],
            availability: {
              isOnStock: true,
              availableQuantity: 86,
              version: 4,
              id: 'fb552c65-5701-4164-8efc-ec7da122b232',
              channels: {
                '8dd606fb-4db2-4671-b8e4-a97dd444c677': {
                  isOnStock: true,
                  availableQuantity: 100,
                  version: 1,
                  id: '6c7060af-ed1d-438f-830c-85ca0d8fe642',
                },
                'c22ffb1e-ea4e-46a7-ac39-82d4a62d2171': {
                  isOnStock: true,
                  availableQuantity: 100,
                  version: 1,
                  id: 'da875f86-eb18-40ab-83ad-6112a1939365',
                },
              },
            },
          },
          variants: [],
          searchKeywords: {},
        },
        published: true,
        hasStagedChanges: false,
      },
      key: 'sample-slug',
      taxCategory: {
        typeId: 'tax-category',
        id: 'aff4fe6e-acf2-4230-83fd-932e19fb9afa',
      },
      lastVariantId: 1,
    },
  ],
};

export const productDataEmpty = {
  limit: 20,
  offset: 0,
  count: 0,
  total: 0,
  results: [],
};
