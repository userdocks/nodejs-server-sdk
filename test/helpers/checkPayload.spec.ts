import checkPayload from '../../src/helpers/checkPayload';
import getDefaultPayload from '../../src/helpers/getDefaultPayload';
import options from '../__fixtures__/options';
import defaultHeader from '../__fixtures__/defaultHeader';

describe('checkPayload', () => {
  const payload = getDefaultPayload('access');
  test('should fail if expired', () => {
    const expectedResult = false;
    let thisPayload = {
      ...payload,
      exp: Math.floor(new Date().getTime() / 1000) - 1000,
    };

    const result = checkPayload(
      {
        header: defaultHeader,
        payload: thisPayload,
      },
      options,
    );

    expect(result).toBe(expectedResult);
  });
  test('should fail if the issuer is wrong', () => {
    const expectedResult = false;
    let thisPayload = {
      ...payload,
      iss: '3',
    };

    const result = checkPayload(
      {
        header: defaultHeader,
        payload: thisPayload,
      },
      options,
    );

    expect(result).toBe(expectedResult);
  });
  test('should fail with the wrong audience', () => {
    const expectedResult = false;
    let thisPayload = {
      ...payload,
      aud: '3',
    };

    const result = checkPayload(
      {
        header: defaultHeader,
        payload: thisPayload,
      },
      options,
    );

    expect(result).toBe(expectedResult);
  });
  test('should succeed if issuer and audience are correct and not expired', () => {
    const expectedResult = true;
    let thisPayload = {
      ...payload,
      aud: '1',
      iss: '2',
      exp: Math.floor(new Date().getTime() / 1000) + 10000,
    };

    const result = checkPayload(
      {
        header: defaultHeader,
        payload: thisPayload,
      },
      options,
    );

    expect(result).toBe(expectedResult);
  });
  test('should succeed checking with the default authServer id', () => {
    const expectedResult = true;
    let thisPayload = {
      ...payload,
      aud: '1',
      iss: 'f0af4569-4d5d-4c20-af95-5a80c74e30a6',
      exp: Math.floor(new Date().getTime() / 1000) + 10000,
    };

    const result = checkPayload(
      {
        header: defaultHeader,
        payload: thisPayload,
      },
      {
        ...options,
        authServer: {
          ...options.authServer,
          id: '',
        },
      },
    );

    expect(result).toBe(expectedResult);
  });
  test('should succeed checking with the default authServer id', () => {
    const expectedResult = true;
    let thisPayload = {
      ...payload,
      aud: '1',
      iss: 'f0af4569-4d5d-4c20-af95-5a80c74e30a6',
      exp: Math.floor(new Date().getTime() / 1000) + 10000,
    };

    const result = checkPayload(
      {
        header: defaultHeader,
        payload: thisPayload,
      },
      {
        ...options,
        authServer: undefined,
      },
    );

    expect(result).toBe(expectedResult);
  });
});
