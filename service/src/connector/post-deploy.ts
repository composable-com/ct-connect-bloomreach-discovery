import dotenv from 'dotenv';
dotenv.config();

import { assertError } from '../utils/assert.utils';
import { bloomreachDiscoveryCatalogIngestion } from '../services/bloomreach-discovery-catalog-ingestion';

export async function run(): Promise<void> {
  try {
    // No need to await this
    bloomreachDiscoveryCatalogIngestion();
  } catch (error) {
    assertError(error);
    process.stderr.write(`Post-deploy failed: ${error.message}`);
    process.exitCode = 1;
  }
}

run();
