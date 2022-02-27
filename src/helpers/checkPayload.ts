import { IOptions, IDecodedToken } from '../types';
import { defaultOptions } from './defaultOptions';

const checkPayload = (decodedToken: IDecodedToken, options: IOptions) => {
  let isValid = false;

  try {
    const expirationTime = Number(decodedToken.payload.exp);
    const expiresIn =
      (expirationTime || 0) - Math.floor(new Date().getTime() / 1000);
    const isNotExpired = expiresIn >= 0;

    const isIssuer =
      decodedToken.payload.iss ===
      (options.authServer?.id || defaultOptions.authServer.id);

    const isAudience = decodedToken.payload.aud === options.app.id;

    isValid = isNotExpired && isIssuer && isAudience;
  } catch {}

  return isValid;
};

export default checkPayload;
