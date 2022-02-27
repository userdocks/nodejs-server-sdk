import getTokenParts from '../../src/helpers/getTokenParts';

describe('getTokenOrPipeThrough', () => {
  test('token without Bearer', async () => {
    const expectedResult = {
      header: '1',
      payload: '2',
      signature: '3',
    };
    const result = getTokenParts('1.2.3');

    expect(result).toEqual(expectedResult);
  });
  test('token with Bearer', async () => {
    const result = () => getTokenParts('1');

    expect(result).toThrow();
  });
});
