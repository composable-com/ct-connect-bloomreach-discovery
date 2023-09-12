import dotenv from 'dotenv';
dotenv.config();

import { assertError } from '../utils/assert.utils';
import { bloomreachDiscoveryCatalogIngestion } from '../services/bloomreach-discovery-catalog-ingestion'

async function postDeploy(): Promise<void> {
  await bloomreachDiscoveryCatalogIngestion()
}

async function run(): Promise<void> {
  try {
    await postDeploy();
  } catch (error) {
    assertError(error);
    process.stderr.write(`Post-deploy failed: ${error.message}`);
    process.exitCode = 1;
  }
}

run();
