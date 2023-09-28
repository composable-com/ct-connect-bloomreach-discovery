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
    logger.info(`Running the Bloomreach Discovery Job`);
    await bloomreachDiscoveryCatalogIngestion();
    logger.info(`Running the Bloomreach Discovery Job >> SUCCESS`);
    response.status(200).send();
  } catch (error) {
    logger.info(`Running the Bloomreach Discovery Job >> FAILURE`);
    const err = error as unknown as Error;
    throw new CustomError(500, `${err.message} > ${err.stack}`);
  }
};
