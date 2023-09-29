import { getServiceAppUrl } from './get-service-app-url';

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

describe('getServiceAppUrl', () => {

  afterEach(() => {
    jest.restoreAllMocks(); // Restore all mocked functions after each test
  });

  it('should fetch and return the service app URL', async () => {
    // Mock the fetch function to return the expected responses
    const authResponse = { access_token: 'testToken' };
    const deploymentResponse = {
      applications: [{ applicationName: 'service', url: 'http://example.com' }],
    };

    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(authResponse),
      })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(deploymentResponse),
      });

    const serviceAppUrl = await getServiceAppUrl();

    expect(serviceAppUrl).toBe('http://example.com');

    // Verify that fetch was called with the expected URLs and headers
    expect(fetch).toHaveBeenCalledWith(
      `https://auth.mockRegion.commercetools.com/oauth/token?grant_type=client_credentials`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(`mockClientId:mockClientSecret`)}`,
        },
      }
    );

    expect(fetch).toHaveBeenCalledWith(
      `https://connect.mockRegion.commercetools.com/mockProjectKey/deployments/key=mockDeploymentKey`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer testToken`,
        },
      }
    );
  });

  it('should handle errors', async () => {
    // Mock the fetch function to reject with an error
    global.fetch = jest.fn().mockRejectedValue(new Error('Test error'));

    // Use try-catch to handle the error
    try {
      await getServiceAppUrl();
    } catch (error) {
      // Verify that the error is handled appropriately
      expect(error).toBeInstanceOf(Error);
      // @ts-ignore
      expect(error.message).toBe('Test error');
    }
  });
});
