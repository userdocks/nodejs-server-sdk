import { IOptions, IDecodedToken } from '../types';
import checkHeader from './checkHeader';
import checkPayload from './checkPayload';

const checkToken = (decodedToken: IDecodedToken, options: IOptions) => {
  let isValid = false;

  try {
    const hasValidHeader = checkHeader(decodedToken);
    const hasValidPayload = checkPayload(decodedToken, options);

    isValid = hasValidHeader && hasValidPayload;
  } catch {}

  return isValid;
};

export default checkToken;
