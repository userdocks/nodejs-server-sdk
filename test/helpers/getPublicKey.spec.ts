import getPublicKey from '../../src/helpers/getPublicKey';
import options from '../__fixtures__/options';
import getRandomKeys, { IKeyCache } from '../__fixtures__/getRandomKeys';

jest.mock('../../src/helpers/requestPublicKey');

let keys: IKeyCache;

beforeAll(async () => {
  const randomKeys = await getRandomKeys();

  keys = randomKeys;
});

describe('getPublicKey', () => {
  test('should return the provided publicKey via options', async () => {
    const result = await getPublicKey({
      ...options,
      app: {
        ...options.app,
        publicKey: keys.publicKey,
      },
    });

    expect(result).toBe(keys.publicKey);
  });
  test('should return the public key from the http request', async () => {
    const result = await getPublicKey(options);

    expect(result).toBe('this-is-a-public-key');
  });
  test('should return empty public key from the http request', async () => {
    const result = await getPublicKey(options);

    expect(result).toBe('');
  });
  test('should throw an error while doing a http request', async () => {
    const result = async () => {
      await getPublicKey(options);
    };

    expect(result()).rejects.toThrow();
  });
});
