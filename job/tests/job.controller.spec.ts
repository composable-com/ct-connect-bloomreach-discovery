import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { Request, Response } from 'express';
import { post } from '../src/controllers/job.controller';
import { bloomreachDiscoveryCatalogIngestion } from '../src/services/bloomreach-discovery-catalog-ingestion';
import CustomError from '../src/errors/custom.error';
import { logger } from '../src/utils/logger.utils';

jest.mock('../src/services/bloomreach-discovery-catalog-ingestion');
jest.mock('../src/utils/logger.utils');

describe('post', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis() as unknown as Response['status'],
      send: jest.fn() as Response['send'],
    };
  });

  it('should call bloomreachDiscoveryCatalogIngestion and send a response', async () => {
    const mockResult = { success: true };
    (bloomreachDiscoveryCatalogIngestion as jest.Mock).mockReturnValue(
      mockResult
    );

    await post(mockRequest as Request, mockResponse as Response);

    expect(bloomreachDiscoveryCatalogIngestion).toHaveBeenCalled();
    expect(logger.info).toHaveBeenCalledWith(
      'Running the Bloomreach Discovery Job'
    );
    expect(logger.info).toHaveBeenCalledWith(JSON.stringify(mockResult));
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    const mockError = Error('Something went wrong');

    (bloomreachDiscoveryCatalogIngestion as jest.Mock).mockImplementationOnce(
      () => Promise.reject(mockError)
    );

    await expect(
      post(mockRequest as Request, mockResponse as Response)
    ).rejects.toThrow(
      new CustomError(500, `${mockError.message} > ${mockError.stack}`)
    );
  });
});
