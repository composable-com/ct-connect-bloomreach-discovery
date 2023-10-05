import { Request, Response } from 'express';
import { basicAuthHandler } from '../utils/basic-auth.utils';
import { bloomreachDiscoveryCatalogIngestion } from '../services/bloomreach-discovery-catalog-ingestion';

export async function getHandleBloomreachDiscoveryCatalogIngestion(
  req: Request,
  res: Response
) {
  basicAuthHandler({
    req,
    res,
    handler: async () => {
      await controllerHandler(res);
    },
  });
}

export async function controllerHandler(res: Response) {
  await bloomreachDiscoveryCatalogIngestion();
  res.contentType('application/json');
  res.status(200);
  res.send({
    success: true,
  });
}
