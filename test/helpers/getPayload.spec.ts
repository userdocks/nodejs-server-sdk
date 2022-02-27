import getPayload from '../../src/helpers/getPayload';
import options from '../__fixtures__/options';
import getRandomJWTs, { IJWTCache } from '../__fixtures__/getRandomJWTs';
import getRandomKeys, { IKeyCache } from '../__fixtures__/getRandomKeys';

jest.mock('../../src/helpers/getPublicKey');
jest.mock('../../src/helpers/getNaiveCache');

let jwts: IJWTCache;
let keys: IKeyCache;

beforeAll(async () => {
  const randomKeys = await getRandomKeys();
  const JSONWebTokens = await getRandomJWTs(randomKeys);

  jwts = JSONWebTokens;
  keys = randomKeys;
});

describe('getPayload', () => {
  test('should fail if the publicKey retrieval (via http request or cache) fails 2 times in a row', async () => {
    const [header, payload, signature] = jwts.tokenNotExpired.split('.');

    const result = await getPayload(
      {
        header,
        payload,
        signature,
      },
      'access',
      {
        ...options,
        app: {
          ...options.app,
          publicKey: keys.publicKey,
        },
      },
    );

    expect(result.valid).toBeFalsy();
  });
  test('should succeed on the second attempt if the first attempt fails (e.g. pub/pri key change to log out all users occured)', async () => {
    const [header, payload, signature] = jwts.tokenNotExpired.split('.');

    const result = await getPayload(
      {
        header,
        payload,
        signature,
      },
      'access',
      {
        ...options,
        app: {
          ...options.app,
          publicKey: keys.publicKey,
        },
      },
    );

    expect(result.valid).toBeTruthy();
  });
  test('should succeed on the first attempt if jwt valid and public key retrival succeeds', async () => {
    const [header, payload, signature] = jwts.tokenNotExpired.split('.');

    const result = await getPayload(
      {
        header,
        payload,
        signature,
      },
      'access',
      {
        ...options,
        app: {
          ...options.app,
          publicKey: keys.publicKey,
        },
      },
    );

    expect(result.valid).toBeTruthy();
  });
});
