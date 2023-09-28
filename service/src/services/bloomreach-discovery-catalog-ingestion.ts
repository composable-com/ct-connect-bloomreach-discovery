import Bottleneck from 'bottleneck';
import { logger } from '../utils/logger.utils';
import { createApiRoot } from '../client/create.client';
import { Product } from '@commercetools/platform-sdk';
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
  let _continue = true;
  let offset = 0;

  const products: BloomreachProduct[] = [];
  const limit = 500;
  const apiRoot = createApiRoot();
  const limiter = new Bottleneck({
    maxConcurrent: 1,
    minTime: 300,
  });

  const getProducts = limiter.wrap(
    async (params: { limit: number; offset: number }) => {
      logger.info(`Getting products... ${params.limit} ; ${params.offset}`);
      return await apiRoot
        .products()
        .get({ queryArgs: { limit: params.limit, offset: params.offset } })
        .execute();
    }
  );

  const getProductViews = (product: Product) => {
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
          image:
            product.masterData.current.masterVariant.images?.[0]?.url ?? '',
        },
      };
    }

    return views;
  };

  const getVariants = (product: Product) => {
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
  };

  while (_continue) {
    const response = await getProducts({ limit, offset });
    const data: BloomreachProduct[] = response.body.results.map((product) => {
      return {
        op: 'add',
        path: `/products/${product.id}`,
        value: {
          attributes: {
            title: product.masterData.current.name[locale] ?? '',
            sku: product.masterData.current.masterVariant.sku ?? '',
            description: product.masterData.current.description?.[locale] ?? '',
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
    });
    products.push(...data);
    offset += limit;
    if (products.length >= (response.body.total ?? 0)) {
      _continue = false;
    }
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
