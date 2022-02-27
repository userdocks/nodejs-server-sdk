import {
  IOptions,
  IAccessTokenPayload,
  ITokenParts,
  IIdTokenPayload,
  TTokenType,
} from '../types';
import getDecodedPayload from './getDecodedHeaderAndPayload';
import getDefaultPayload from './getDefaultPayload';
import getPublicKey from './getPublicKey';
import verify from './verify';
import getNaiveCache from './getNaiveCache';

const getPayload = async (
  tokenParts: ITokenParts,
  tokenType: TTokenType,
  options: IOptions,
  retry?: boolean,
): Promise<IAccessTokenPayload | IIdTokenPayload> => {
  // we only fetch the publicKey once
  // or if the first attempt was not valid
  // we refetch the publicKey to see if the
  // keypair changed due to a manual signout
  // of all users
  const publicKeyCache = getNaiveCache('publicKey', options.app.publicKey);
  let payload = getDefaultPayload(tokenType);

  try {
    if (!publicKeyCache.get() || retry) {
      const newPublicKey = await getPublicKey(options);

      if (newPublicKey !== publicKeyCache.get()) {
        publicKeyCache.set(newPublicKey);
      }
    }

    const decodedPayload = getDecodedPayload(tokenParts);
    const valid = verify(
      tokenParts,
      decodedPayload,
      publicKeyCache.get(),
      options,
    );

    payload = {
      ...decodedPayload.payload,
      valid,
    };

    return payload;
  } catch (err) {
    if (!retry) {
      return getPayload(tokenParts, tokenType, options, true);
    }

    return payload;
  }
};

export default getPayload;
