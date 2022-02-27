import crypto from 'crypto';
import util from 'util';

const generateKeyPair = util.promisify(crypto.generateKeyPair);

export interface IKeyCache {
  publicKey: string;
  privateKey: string;
}

let keyCache: IKeyCache = {
  publicKey: '',
  privateKey: '',
};

const getRandomKeys = async () => {
  if (keyCache.publicKey && keyCache.privateKey) {
    return keyCache;
  }
  const { publicKey, privateKey } = await generateKeyPair('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

  keyCache = {
    publicKey,
    privateKey,
  };

  return keyCache;
};

export default getRandomKeys;
