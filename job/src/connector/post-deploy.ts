import dotenv from 'dotenv';
import { bloomreachDiscoveryCatalogIngestion } from '../services/bloomreach-discovery-catalog-ingestion'
dotenv.config();

export async function run(): Promise<void> {
  try {
    // No need to await this
    bloomreachDiscoveryCatalogIngestion();
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    process.stderr.write(`Post-deploy failed: ${error.message}`);
    process.exitCode = 1;
  }
}

run();
