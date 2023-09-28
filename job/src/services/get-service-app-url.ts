import { readConfiguration } from '../utils/config.utils'

export async function getServiceAppUrl() {
  const {
    projectKey,
    clientId,
    clientSecret,
    region,
    commercetoolsDeploymentKey,
  } = readConfiguration();

  const authResponse = await fetch(
    `https://auth.${region}.commercetools.com/oauth/token?grant_type=client_credentials`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      },
    }
  );

  const authData = await authResponse.json();
  const authToken = authData.access_token as string;

  const deploymentResponse = await fetch(
    `https://connect.${region}.commercetools.com/${projectKey}/deployments/key=${commercetoolsDeploymentKey}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  const deploymentData = (await deploymentResponse.json()) as any;
  const serviceApp = deploymentData.applications.find(
    (el: any) => el.applicationName === 'service'
  );

  return serviceApp.url as string;
}
