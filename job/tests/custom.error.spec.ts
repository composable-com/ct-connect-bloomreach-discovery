import { describe, expect, it } from '@jest/globals';

import CustomError from '../src/errors/custom.error';

describe('CustomError', () => {
  it('should correctly set statusCode and message', () => {
    const error = new CustomError(404, 'Not Found', [
      {
        statusCode: 404,
        message: 'Not Found',
      },
    ]);

    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('Not Found');
    expect(error.errors).toBeDefined();
    expect(error.errors).toHaveLength(1);
  });

  it('should extend from the built-in Error class', () => {
    const error = new CustomError(500, 'Internal Server Error');

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(CustomError);
  });
});
