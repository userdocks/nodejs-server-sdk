import getTokenOrPipeThrough from '../../src/helpers/getTokenOrPipeThrough';

describe('getTokenOrPipeThrough', () => {
  test('should return token when used without Bearer', async () => {
    const expectedResult = 'token';

    const result = getTokenOrPipeThrough('token');

    expect(result).toBe(expectedResult);
  });
  test('should return token when used with Bearer', async () => {
    const expectedResult = 'token';

    const result = getTokenOrPipeThrough('Bearer token');

    expect(result).toBe(expectedResult);
  });
});
