import checkHeader from '../../src/helpers/checkHeader';
import getDefaultPayload from '../../src/helpers/getDefaultPayload';

describe('checkHeader', () => {
  const payload = getDefaultPayload('access');
  test('should return false with an invalid type', () => {
    const expectedResult = false;
    const header = {
      alg: 'RS256',
      typ: '',
    };

    const result = checkHeader({
      // @ts-ignore
      header,
      payload,
    });

    expect(result).toBe(expectedResult);
  });
  test('should return false with an invalid algorithm', () => {
    const expectedResult = false;
    const header = {
      alg: '',
      typ: 'JWT',
    };

    const result = checkHeader({
      // @ts-ignore
      header,
      payload,
    });

    expect(result).toBe(expectedResult);
  });
});
