import { jest, it, expect, describe, afterEach } from '@jest/globals';
import { bloomreachDiscoveryCatalogIngestion } from '../src/services/bloomreach-discovery-catalog-ingestion';
import { run } from '../src/connector/post-deploy';

jest.mock('../src/services/bloomreach-discovery-catalog-ingestion');

describe('run', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call bloomreachDiscoveryCatalogIngestion function', async () => {
    (bloomreachDiscoveryCatalogIngestion as jest.Mock).mockReturnValue({
      data: 'success',
    });

    await run();
    expect(bloomreachDiscoveryCatalogIngestion).toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    const errorMessage = 'Something went wrong';
    (bloomreachDiscoveryCatalogIngestion as jest.Mock).mockImplementation(
      () => {
        throw new Error(errorMessage);
      }
    );

    const stderrSpy = jest.spyOn(process.stderr, 'write');
    await run();

    expect(stderrSpy).toHaveBeenCalledWith(
      `Post-deploy failed: ${errorMessage}`
    );
    expect(process.exitCode).toBe(1);
  });
});
