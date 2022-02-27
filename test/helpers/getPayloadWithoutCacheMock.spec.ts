import getPayload from '../../src/helpers/getPayload';
import options from '../__fixtures__/options';
import getRandomJWTs, { IJWTCache } from '../__fixtures__/getRandomJWTs';
import getRandomKeys, { IKeyCache } from '../__fixtures__/getRandomKeys';

jest.mock('../../src/helpers/getPublicKey');

let jwts: IJWTCache;
let keys: IKeyCache;

beforeAll(async () => {
  const randomKeys = await getRandomKeys();
  const JSONWebTokens = await getRandomJWTs(randomKeys);

  jwts = JSONWebTokens;
  keys = randomKeys;
});

describe('getPayload without cache mock', () => {
  test('should succed on first attempt', async () => {
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
