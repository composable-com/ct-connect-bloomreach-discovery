import { Request, Response } from 'express';
import CustomError from '../errors/custom.error';
import { logger } from '../utils/logger.utils';
import { readConfiguration } from '../utils/config.utils';

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
    const { projectKey, basicAuthSecret } = readConfiguration();
    const baseUrl = _request.protocol + '://' + _request.get('host');
    const url = `${baseUrl}/service/bloomreach-discovery-catalog-ingestion`;

    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: 'Basic ' + btoa(`${projectKey}:${basicAuthSecret}`),
      },
    });
    logger.info(`Running the Bloomreach Discovery Job >> SUCCESS`);
    response.status(200).send();
  } catch (error) {
    logger.info(`Running the Bloomreach Discovery Job >> FAILURE`);
    const err = error as unknown as Error;
    throw new CustomError(500, `${err.message} > ${err.stack}`);
  }
};
