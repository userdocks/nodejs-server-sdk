import getTokenParts from '../../src/helpers/getTokenParts';

describe('getTokenParts', () => {
  test('has 3 dots', async () => {
    const expectedResult = {
      header: '1',
      payload: '2',
      signature: '3',
    };
    const result = getTokenParts('1.2.3');

    expect(result).toEqual(expectedResult);
  });
  test('has not three dots | invalid string', async () => {
    const expectedResult = {
      header: '',
      payload: '',
      signature: '',
    };

    const result = getTokenParts('1');

    expect(result).toEqual(expectedResult);
  });
  test('has not three dots | invalid long string', async () => {
    const expectedResult = {
      header: '',
      payload: '',
      signature: '',
    };

    const result = getTokenParts('11111');

    expect(result).toEqual(expectedResult);
  });
  test('has not three dots | invalid empty string', async () => {
    const expectedResult = {
      header: '',
      payload: '',
      signature: '',
    };

    const result = getTokenParts('');

    expect(result).toEqual(expectedResult);
  });
});
