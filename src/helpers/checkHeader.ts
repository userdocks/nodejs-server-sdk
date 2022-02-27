import { IDecodedToken } from '../types';

const checkHeader = (decodedToken: IDecodedToken) => {
  let isValid = false;

  try {
    const isValidType = decodedToken.header.typ === 'JWT';
    // we only serve RS256
    const hasValidAlg = decodedToken.header.alg === 'RS256';

    isValid = isValidType && hasValidAlg;
  } catch {}

  return isValid;
};

export default checkHeader;
