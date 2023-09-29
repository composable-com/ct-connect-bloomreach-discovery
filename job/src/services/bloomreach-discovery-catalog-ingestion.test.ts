import { bloomreachDiscoveryCatalogIngestion } from './bloomreach-discovery-catalog-ingestion';
import * as ServiceUrlModule from './get-service-app-url';

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

describe('bloomreachDiscoveryCatalogIngestion', () => {
  const mockServiceUrl = 'http://example.com';

  beforeEach(() => {

    // Create a spy on the getServiceAppUrl function
    const spyGetServiceAppUrl = jest.spyOn(ServiceUrlModule, 'getServiceAppUrl');
    spyGetServiceAppUrl.mockResolvedValue(mockServiceUrl);
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore all mocked functions after each test
  });

  it('should make a GET request with the correct URL and headers', async () => {
    // Mock the fetch function
    const fetchMock = jest.fn().mockResolvedValue({});

    // Replace the global fetch function with the mock
    global.fetch = fetchMock;

    await bloomreachDiscoveryCatalogIngestion();

    // Verify that fetch was called with the expected URL and headers
    expect(fetchMock).toHaveBeenCalledWith(`${mockServiceUrl}/bloomreach-discovery-catalog-ingestion`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(`mockProjectKey:mockSecret`)}`,
      },
    });
  });

  it('should handle errors', async () => {
    // Mock the fetch function to reject with an error
    const fetchMock = jest.fn().mockRejectedValue(new Error('Test error'));

    // Replace the global fetch function with the mock
    global.fetch = fetchMock;

    // Use try-catch to handle the error
    try {
      await bloomreachDiscoveryCatalogIngestion();
    } catch (error) {
      // Verify that the error is handled appropriately
      expect(error).toBeInstanceOf(Error);
      // @ts-ignore
      expect(error.message).toBe('Test error');
    }
  });
});
