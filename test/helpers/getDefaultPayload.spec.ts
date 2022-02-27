import getDefaultPayload from '../../src/helpers/getDefaultPayload';
import {
  defaultAccessTokenPayload,
  defaultIdTokenPayload,
} from '../__fixtures__/defaultPayload';

describe('getDefaultPayload', () => {
  test('should return id token payload', () => {
    const result = getDefaultPayload('id');

    expect(result).toEqual(defaultIdTokenPayload);
  });
  test('should return access token payload', () => {
    const result = getDefaultPayload('access');

    expect(result).toEqual(defaultAccessTokenPayload);
  });
});
