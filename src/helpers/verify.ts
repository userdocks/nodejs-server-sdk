import crypto from 'crypto';
import { IOptions, IDecodedToken, ITokenParts } from '../types';
import checkToken from './checkToken';

const verify = (
  tokenParts: ITokenParts,
  decodedToken: IDecodedToken,
  publicKey: string,
  options: IOptions,
) => {
  let isValid = false;

  try {
    const { header, payload, signature } = tokenParts;

    const isTokenWellWFormed = checkToken(decodedToken, options);

    if (isTokenWellWFormed) {
      const verifier = crypto.createVerify('RSA-SHA256');

      verifier.update(`${header}.${payload}`);

      const isSignatureValid = verifier.verify(publicKey, signature, 'base64');

      isValid = isTokenWellWFormed && isSignatureValid;
    }

    return isValid;
  } catch (err) {
    throw new Error(
      `Could not create verifier or update verifier or verify the signature: ${err}`,
    );
  }
};

export default verify;
