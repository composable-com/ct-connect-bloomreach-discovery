import { readConfiguration } from '../utils/config.utils'
import { getServiceAppUrl } from './get-service-app-url'

export async function bloomreachDiscoveryCatalogIngestion() {
  const { projectKey, basicAuthSecret } = readConfiguration();
  const serviceUrl = await getServiceAppUrl();

  await fetch(`${serviceUrl}/bloomreach-discovery-catalog-ingestion`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(`${projectKey}:${basicAuthSecret}`)}`,
    },
  });
}
