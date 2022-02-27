import { IOptions } from '../types';
import requestPublicKey from './requestPublicKey';

const getPublicKey = async (options: IOptions): Promise<string> => {
  if (options.app.publicKey) {
    return options.app.publicKey;
  }

  try {
    const res = await requestPublicKey(options);
    /* istanbul ignore next */
    return res?.body?.data?.publicKey || '';
  } catch (err) {
    throw new Error('Could not fetch publicKey!');
  }
};

export default getPublicKey;
