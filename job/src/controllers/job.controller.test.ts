import fetchMock from 'jest-fetch-mock';
import { Request, Response } from 'express';
import CustomError from '../errors/custom.error';
import * as CatalogIngestionService from '../services/bloomreach-discovery-catalog-ingestion';
import { post } from './job.controller';

fetchMock.enableMocks();

describe('post', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    // Initialize mocks for Request and Response
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore all mocked functions after each test
  });

  it('should call bloomreachDiscoveryCatalogIngestion and respond with 200 on success', async () => {
    // Create a spy on the bloomreachDiscoveryCatalogIngestion function
    const spyIngestion = jest.spyOn(CatalogIngestionService, 'bloomreachDiscoveryCatalogIngestion');
    spyIngestion.mockResolvedValue(undefined);

    await post(mockRequest as Request, mockResponse as Response);

    expect(spyIngestion).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith();

    spyIngestion.mockRestore(); // Restore the spy after the test
  });

  it('should handle errors and throw a CustomError', async () => {
    // Create a spy on the bloomreachDiscoveryCatalogIngestion function
    const spyIngestion = jest.spyOn(CatalogIngestionService, 'bloomreachDiscoveryCatalogIngestion');
    const mockError = new Error('Test error');
    spyIngestion.mockRejectedValue(mockError);

    try {
      await post(mockRequest as Request, mockResponse as Response);
    } catch (error) {
      expect(error).toBeInstanceOf(CustomError);
    }

    spyIngestion.mockRestore(); // Restore the spy after the test
  });
});
