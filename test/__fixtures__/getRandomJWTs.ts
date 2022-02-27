import crypto from 'crypto';
import { IKeyCache } from './getRandomKeys';

export interface IJWTCache {
  tokenExpired: string;
  tokenNotExpired: string;
  tokenWrongIssuer: string;
  tokenWrongAudience: string;
}

let jwtCache: IJWTCache = {
  tokenExpired: '',
  tokenNotExpired: '',
  tokenWrongIssuer: '',
  tokenWrongAudience: '',
};

const getRandomJWTs = (keys: IKeyCache) => {
  if (
    jwtCache.tokenExpired &&
    jwtCache.tokenNotExpired &&
    jwtCache.tokenWrongAudience &&
    jwtCache.tokenWrongIssuer
  ) {
    return jwtCache;
  }

  const payload = {
    iss: '2',
    sub: '',
    aud: '1',
    lng: '',
    jti: '',
    nonce: '',
    auth_time: 0,
    scope: [],
    psc: [],
    exp: Math.floor(new Date().getTime() / 1000) + 100000,
  };

  const header = Buffer.from(
    JSON.stringify({
      alg: 'RS256',
      typ: 'JWT',
    }),
  ).toString('base64');
  const notExpiredPayload = Buffer.from(JSON.stringify(payload)).toString(
    'base64',
  );

  const expiredPayload = Buffer.from(
    JSON.stringify({
      ...payload,
      exp: Math.floor(new Date().getTime() / 1000) - 1000,
    }),
  ).toString('base64');
  const wrongAudiencePayload = Buffer.from(
    JSON.stringify({
      ...payload,
      aud: '3',
    }),
  ).toString('base64');
  const wrongIssuerPayload = Buffer.from(
    JSON.stringify({
      ...payload,
      iss: '3',
    }),
  ).toString('base64');

  const signerNotExpired = crypto.createSign('RSA-SHA256');
  const headerPayloadNotExpired = `${header}.${notExpiredPayload}`;
  signerNotExpired.update(headerPayloadNotExpired);
  const signaturePayloadNotExpired = signerNotExpired.sign(
    keys.privateKey,
    'base64',
  );
  const tokenNotExpired = `${headerPayloadNotExpired}.${signaturePayloadNotExpired}`;

  const signerExpired = crypto.createSign('RSA-SHA256');
  const headerPayloadExpired = `${header}.${expiredPayload}`;
  signerExpired.update(headerPayloadExpired);
  const signaturePayloadExpired = signerExpired.sign(keys.privateKey, 'base64');
  const tokenExpired = `${headerPayloadExpired}.${signaturePayloadExpired}`;

  const signerWrongAudience = crypto.createSign('RSA-SHA256');
  const headerPayloadWrongAudience = `${header}.${wrongAudiencePayload}`;
  signerWrongAudience.update(headerPayloadWrongAudience);
  const signaturePayloadWrongAudience = signerWrongAudience.sign(
    keys.privateKey,
    'base64',
  );
  const tokenWrongAudience = `${headerPayloadWrongAudience}.${signaturePayloadWrongAudience}`;

  const signerWrongIssuer = crypto.createSign('RSA-SHA256');
  const headerPayloadWrongIssuer = `${header}.${wrongIssuerPayload}`;
  signerWrongIssuer.update(headerPayloadWrongIssuer);
  const signaturePayloadWrongIssuer = signerWrongIssuer.sign(
    keys.privateKey,
    'base64',
  );
  const tokenWrongIssuer = `${headerPayloadWrongIssuer}.${signaturePayloadWrongIssuer}`;

  jwtCache = {
    tokenExpired,
    tokenNotExpired,
    tokenWrongIssuer,
    tokenWrongAudience,
  };

  return jwtCache;
};

export default getRandomJWTs;
