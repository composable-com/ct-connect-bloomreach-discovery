import { Request, Response } from 'express';

import CustomError from '../errors/custom.error';
import { logger } from '../utils/logger.utils';
import { bloomreachDiscoveryCatalogIngestion } from '../services/bloomreach-discovery-catalog-ingestion';

/**
 * Exposed job endpoint.
 *
 * @param {Request} _request The express request
 * @param {Response} response The express response
 * @returns
 */
export const post = async (_request: Request, response: Response) => {
  try {
    // Get the orders
    logger.info(`Running the Bloomreach Discovery Job`);
    const res = await bloomreachDiscoveryCatalogIngestion();
    logger.info(`${JSON.stringify(res)}`);
    response.status(200).send();
  } catch (error) {
    const err = error as unknown as Error;
    throw new CustomError(500, `${err.message} > ${err.stack}`);
  }
};
