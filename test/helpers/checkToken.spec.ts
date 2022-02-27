import checkToken from '../../src/helpers/checkToken';
import getDefaultPayload from '../../src/helpers/getDefaultPayload';
import options from '../__fixtures__/options';
import defaultHeader from '../__fixtures__/defaultHeader';

describe('checkToken', () => {
  const payload = getDefaultPayload('access');
  test('should succeed with correct audience and issuer and expiration in the future', () => {
    const expectedResult = true;
    let thisPayload = {
      ...payload,
      aud: '1',
      iss: '2',
      exp: Math.floor(new Date().getTime() / 1000) + 10000,
    };

    const result = checkToken(
      {
        header: defaultHeader,
        payload: thisPayload,
      },
      options,
    );

    expect(result).toBe(expectedResult);
  });
});
