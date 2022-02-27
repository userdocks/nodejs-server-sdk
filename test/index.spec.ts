import userdocks from '../src/index';
import { TUserdocks } from '../src/types';
import options from './__fixtures__/options';
import getRandomJWTs, { IJWTCache } from './__fixtures__/getRandomJWTs';
import getRandomKeys, { IKeyCache } from './__fixtures__/getRandomKeys';

jest.mock('../src/helpers/getPublicKey');
jest.mock('../src/helpers/getNaiveCache');

let jwts: IJWTCache;
let keys: IKeyCache;
let identity: TUserdocks;

beforeAll(async () => {
  const randomKeys = await getRandomKeys();
  const JSONWebTokens = await getRandomJWTs(randomKeys);

  jwts = JSONWebTokens;
  keys = randomKeys;
  identity = userdocks({
    ...options,
    app: {
      ...options.app,
      publicKey: keys.publicKey,
    },
  });
});

describe('index', () => {
  test('should fail on attempt to get public key', async () => {
    const result = await identity.verify(jwts.tokenExpired, 'access');

    const isNotExpired = result.exp > Math.floor(new Date().getTime() / 1000);

    expect(result.aud).toBe('1');
    expect(result.iss).toBe('2');
    expect(isNotExpired).toBeFalsy();
    expect(result.valid).toBeFalsy();
  });
  test('should fail on expired token', async () => {
    const result = await identity.verify(jwts.tokenExpired, 'access');

    const isNotExpired = result.exp > Math.floor(new Date().getTime() / 1000);

    expect(result.aud).toBe('1');
    expect(result.iss).toBe('2');
    expect(isNotExpired).toBeFalsy();
    expect(result.valid).toBeFalsy();
  });
  test('should fail on wrong issuer', async () => {
    const result = await identity.verify(jwts.tokenWrongIssuer, 'access');

    const isNotExpired = result.exp > Math.floor(new Date().getTime() / 1000);

    expect(result.aud).toBe('1');
    expect(result.iss).toBe('3');
    expect(isNotExpired).toBeTruthy();
    expect(result.valid).toBeFalsy();
  });
  test('should fail on wrong audience', async () => {
    const result = await identity.verify(jwts.tokenWrongAudience, 'access');

    const isNotExpired = result.exp > Math.floor(new Date().getTime() / 1000);

    expect(result.aud).toBe('3');
    expect(result.iss).toBe('2');
    expect(isNotExpired).toBeTruthy();
    expect(result.valid).toBeFalsy();
  });
  test('should succeed on not expired token, correct issuer and audience', async () => {
    const result = await identity.verify(jwts.tokenNotExpired, 'access');

    const isNotExpired = result.exp > Math.floor(new Date().getTime() / 1000);

    expect(result.aud).toBe('1');
    expect(result.iss).toBe('2');
    expect(isNotExpired).toBeTruthy();
    expect(result.valid).toBeTruthy();
  });
});
