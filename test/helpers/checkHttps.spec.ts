import checkHttps from '../../src/helpers/checkHttps';

describe('checkHttps', () => {
  test('url with http should return false', () => {
    const url = new URL('http://localhost');
    const expectedResult = false;

    const result = checkHttps(url);

    expect(result).toBe(expectedResult);
  });
  test('url with https should return true', () => {
    const url = new URL('https://localhost');
    const expectedResult = true;

    const result = checkHttps(url);

    expect(result).toBe(expectedResult);
  });
});
