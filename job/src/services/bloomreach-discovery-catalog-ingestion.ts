import Bottleneck from 'bottleneck';
import {
  ClientResponse,
  Product,
  ProductPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { logger } from '../utils/logger.utils';
import { createApiRoot } from '../client/create.client';
import { readConfiguration } from '../utils/config.utils';

interface BloomreachProduct {
  op: string;
  path: string;
  value: {
    attributes: BloomreachDiscoveryProductAttrs;
    variants: BloomreachDiscoveryProductVariants;
    views?: BloomreachDiscoveryProductViews;
  };
}

interface BloomreachDiscoveryProductAttrs {
  title: string;
  sku: string;
  description: string;
  slug: string;
  price: number;
  image: string;
}

interface BloomreachDiscoveryProductVariants {
  [key: string]: { attributes: Record<string, string> };
}

interface BloomreachDiscoveryProductViews {
  [key: string]: { attributes: Partial<BloomreachDiscoveryProductAttrs> };
}

export async function bloomreachDiscoveryCatalogIngestion() {
  logger.info('Service called! > bloomreachDiscoveryCatalogIngestion');
  const {
    bloomreachDiscoveryAccountId,
    bloomreachDiscoveryCatalogLocale: locale,
    bloomreachDiscoveryApiKey,
    bloomreachDiscoveryDomainKey,
  } = readConfiguration();

  let _lastId: string | null = null;
  let _continue = true;

  const products: BloomreachProduct[] = [];
  const limit = 3;
  const apiRoot = createApiRoot();
  const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 300,
  });

  const getProducts = limiter.wrap(
    async (params: { limit: number; lastId?: string }) => {
      return await apiRoot
        .products()
        .get({
          queryArgs: {
            limit: params.limit,
            withTotal: false,
            sort: 'id',
            where: params.lastId ? `id > "${params.lastId}"` : undefined,
          },
        })
        .execute();
    }
  );

  // https://docs.commercetools.com/api/general-concepts#iterating-over-all-elements
  while (_continue) {
    let response: ClientResponse<ProductPagedQueryResponse> | null = null;

    if (_lastId === null) {
      response = await getProducts({ limit });
    } else {
      response = await getProducts({ limit, lastId: _lastId });
    }

    const data: BloomreachProduct[] =
      response?.body.results.map((product) => {
        return {
          op: 'add',
          path: `/products/${product.id}`,
          value: {
            attributes: {
              title: product.masterData.current.name[locale] ?? '',
              sku: product.masterData.current.masterVariant.sku ?? '',
              description:
                product.masterData.current.description?.[locale] ?? '',
              slug: product.masterData.current.slug[locale] ?? '',
              price:
                product.masterData.current.masterVariant.prices?.[0]?.value
                  .centAmount ?? 0,
              image:
                product.masterData.current.masterVariant.images?.[0]?.url ?? '',
            },
            variants: getVariants(product),
            views: getProductViews(product),
          },
        };
      }) ?? [];

    products.push(...data);
    if (products.length >= (response?.body.total ?? 0)) {
      _continue = false;
    }
    _continue = response?.body.results.length == limit;
    _lastId =
      response?.body.results[response.body.results.length - 1]?.id ?? null;
  }

  const res = await fetch(
    `https://api.connect.bloomreach.com/dataconnect/api/v1/accounts/${bloomreachDiscoveryAccountId}/catalogs/${bloomreachDiscoveryDomainKey}/products`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: `Bearer ${bloomreachDiscoveryApiKey}`,
      },
      body: JSON.stringify(products),
    }
  );

  const data = await res.json();
  return data;
}

function getProductViews(product: Product) {
  const views: BloomreachDiscoveryProductViews = {};
  const locales = product.masterData.current.name;

  for (const view in locales) {
    views[view] = {
      attributes: {
        title: product.masterData.current.name[view] ?? '',
        sku: product.masterData.current.masterVariant.sku ?? '',
        description: product.masterData.current.description?.[view] ?? '',
        slug: product.masterData.current.slug[view] ?? '',
        price:
          product.masterData.current.masterVariant.prices?.[0]?.value
            .centAmount ?? 0,
        image: product.masterData.current.masterVariant.images?.[0]?.url ?? '',
      },
    };
  }

  return views;
}

function getVariants(product: Product) {
  const variants: BloomreachDiscoveryProductVariants = {};

  product.masterData.current.variants.forEach((variant) => {
    const attributesMap: Record<string, string> = {};
    variant.attributes?.forEach((attribute) => {
      if (attribute.value?.key) {
        attributesMap[attribute.name] = attribute.value.label;
      }
    });

    variants[variant.id] = {
      attributes: {
        ...attributesMap,
      },
    };
  });

  return variants;
}
