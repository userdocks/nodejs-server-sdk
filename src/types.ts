import getUserdocks from '.';

export type TTokenType = 'id' | 'access';

export interface IAddress {
  formatted?: string;
  street_address?: string;
  locality?: string;
  region?: string;
  postal_code?: string;
  country?: string;
}

export interface IIdTokenPayload {
  iss: string;
  sub: string;
  aud: string;
  lng: string;
  jti: string;
  nonce: string;
  auth_time: number;
  exp: number;
  scope: string[];
  name?: string;
  given_name?: string;
  family_name?: string;
  middle_name?: string;
  nickname?: string;
  preferred_username?: string;
  profile?: string;
  picture?: string;
  website?: string;
  email?: string;
  email_verified?: string;
  gender?: string;
  birthdate?: string;
  zoneinfo?: string;
  locale?: string;
  phone_number?: string;
  phone_number_verified?: string;
  address?: IAddress;
  updated_at?: number;
  valid: boolean;
}

export interface IAccessTokenPayload {
  iss: string;
  sub: string;
  aud: string;
  lng: string;
  jti: string;
  nonce: string;
  auth_time: number;
  exp: number;
  scope: string[];
  psc: any[];
  valid: boolean;
}

export interface ITokenParts {
  header: string;
  payload: string;
  signature: string;
}

export interface IAuthServer {
  id: string;
  apiUri: string;
  publicKeyPath: string;
}

export interface IOptions {
  app: {
    publicKey?: string;
    readOnlyApiKey: string;
    id: string;
  };
  authServer?: IAuthServer;
}

export interface IBody {
  data?: {
    publicKey: string;
  };
  error?: {
    message: string;
  };
}

export interface IResponse<T> {
  statusCode: number;
  headers: any;
  body: T;
}

export interface IHeader {
  alg: 'RS256';
  typ: 'JWT';
}

export interface IDecodedToken {
  header: IHeader;
  payload: Omit<IAccessTokenPayload, 'valid'> | Omit<IIdTokenPayload, 'valid'>;
}

export type TUserdocks = ReturnType<typeof getUserdocks>;
