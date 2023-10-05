import fetchMock from 'jest-fetch-mock';
import { Request, Response } from 'express';
import {
  getHandleBloomreachDiscoveryCatalogIngestion,
  controllerHandler,
} from './handleBloomreachDiscoveryCatalogIngestion.controller';
import * as BasicAuthUtils from '../utils/basic-auth.utils';
import * as BloomreachService from '../services/bloomreach-discovery-catalog-ingestion';

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
      commercetoolsDeploymentKey: 'mockDeploymentKey',
      basicAuthSecret: 'mockSecret',
    }),
  };
});

fetchMock.enableMocks();

describe('getHandleBloomreachDiscoveryCatalogIngestion', () => {
  let req: Request;
  let res: Response;
  let basicAuthHandlerSpy: jest.SpyInstance;

  beforeEach(() => {
    // Create mock Request and Response objects
    req = {} as Request;
    // @ts-ignore
    res = { contentType: jest.fn(), status: jest.fn(), send: jest.fn() } as Response;

    // Mock the basicAuthHandler function
    basicAuthHandlerSpy = jest
      .spyOn(BasicAuthUtils, 'basicAuthHandler')
      .mockImplementation(async (options) => {
        // Simulate the handler function within basicAuthHandler
        await options.handler();
      });
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore all mocked functions after each test
  });

  it('should call basicAuthHandler and execute the controllerHandler', async () => {
    jest
      .spyOn(BloomreachService, 'bloomreachDiscoveryCatalogIngestion')
      .mockResolvedValue({});

    // Call the function
    await getHandleBloomreachDiscoveryCatalogIngestion(req, res);

    // Verify that basicAuthHandler is called with the correct arguments
    expect(basicAuthHandlerSpy).toHaveBeenCalledWith({
      req,
      res,
      handler: expect.any(Function), // A function should be passed as the handler
    });
  });

  it('should call bloomreachDiscoveryCatalogIngestion and set response properties in controllerHandler', async () => {
    // Mock the bloomreachDiscoveryCatalogIngestion function
    const bloomreachDiscoveryCatalogIngestionSpy = jest
      .spyOn(BloomreachService, 'bloomreachDiscoveryCatalogIngestion')
      .mockResolvedValue({});

    // Call the controllerHandler function
    await controllerHandler(res);

    // Verify that bloomreachDiscoveryCatalogIngestion is called
    expect(bloomreachDiscoveryCatalogIngestionSpy).toHaveBeenCalled();

    // Verify that the response methods are called correctly
    expect(res.contentType).toHaveBeenCalledWith('application/json');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ success: true });
  });
});
