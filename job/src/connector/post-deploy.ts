import dotenv from 'dotenv';
dotenv.config();

import { assertError } from '../utils/assert.utils';
import { bloomreachDiscoveryCatalogIngestion } from '../services/bloomreach-discovery-catalog-ingestion';

export const postDeploy = async (): Promise<void> => {
  await bloomreachDiscoveryCatalogIngestion();
};

export const run = async (): Promise<void> => {
  try {
    await postDeploy();
  } catch (error) {
    assertError(error);
    process.stderr.write(`Post-deploy failed: ${error.message}`);
    process.exitCode = 1;
  }
};

run();
