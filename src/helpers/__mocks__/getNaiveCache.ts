import { IOptions } from '../../types';

const getPublicKeyCache = jest.fn().mockImplementation((_: IOptions) => {
  let publicKeyCache = '';
  return {
    get: () => publicKeyCache,
    set: (publicKey: string) => (publicKeyCache = publicKey),
  };
});

export default getPublicKeyCache;
