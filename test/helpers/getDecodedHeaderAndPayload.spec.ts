import getDecodedHeaderAndPayload from '../../src/helpers/getDecodedHeaderAndPayload';
import getRandomJWTs, { IJWTCache } from '../__fixtures__/getRandomJWTs';
import getRandomKeys from '../__fixtures__/getRandomKeys';
import defaultHeader from '../__fixtures__/defaultHeader';
import { defaultPayload } from '../__fixtures__/defaultPayload';

let jwts: IJWTCache;

beforeAll(async () => {
  const keys = await getRandomKeys();
  const JSONWebTokens = await getRandomJWTs(keys);

  jwts = JSONWebTokens;
});

describe('getDecodedHeaderAndPayload', () => {
  test('should decode a header and payload if given a valid JWT', () => {
    const [header, payload, signature] = jwts.tokenNotExpired.split('.');

    const { header: resultHeader, payload: resultPayload } =
      getDecodedHeaderAndPayload({
        header,
        payload,
        signature,
      });

    const exp = resultPayload.exp;
    const isNotExpired = exp > Math.floor(new Date().getTime() / 1000);
    delete resultPayload.exp;

    const { exp: _, ...rest } = defaultPayload;

    expect(resultHeader).toEqual(defaultHeader);
    expect(resultPayload).toEqual(rest);
    expect(isNotExpired).toBeTruthy();
  });
});
