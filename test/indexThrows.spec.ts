import userdocks from '../src/index';
import { TUserdocks } from '../src/types';
import options from './__fixtures__/options';
import getRandomJWTs, { IJWTCache } from './__fixtures__/getRandomJWTs';
import getRandomKeys, { IKeyCache } from './__fixtures__/getRandomKeys';

jest.mock('../src/helpers/getPayload');

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
  test('fails', async () => {
    const result = async () => identity.verify(jwts.tokenExpired, 'access');

    expect(result).rejects.toThrow();
  });
});
