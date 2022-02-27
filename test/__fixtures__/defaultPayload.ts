import { IAccessTokenPayload, IIdTokenPayload } from '../../src/types';

export interface IDefaultPayload {
  iss: '2';
  sub: '';
  aud: '1';
  lng: '';
  jti: '';
  nonce: '';
  auth_time: 0;
  scope: [];
  psc: [];
  exp: 0;
}

const defaultPayload: IDefaultPayload = {
  iss: '2',
  sub: '',
  aud: '1',
  lng: '',
  jti: '',
  nonce: '',
  auth_time: 0,
  scope: [],
  psc: [],
  exp: 0,
};

const defaultIdTokenPayload: IIdTokenPayload = {
  iss: '',
  sub: '',
  aud: '',
  lng: '',
  jti: '',
  nonce: '',
  auth_time: 0,
  exp: 0,
  scope: [],
  name: '',
  given_name: '',
  family_name: '',
  middle_name: '',
  nickname: '',
  preferred_username: '',
  profile: '',
  picture: '',
  website: '',
  email: '',
  email_verified: '',
  gender: '',
  birthdate: '',
  zoneinfo: '',
  locale: '',
  phone_number: '',
  phone_number_verified: '',
  address: {},
  updated_at: 0,
  valid: false,
};

const defaultAccessTokenPayload: IAccessTokenPayload = {
  iss: '',
  sub: '',
  aud: '',
  lng: '',
  jti: '',
  nonce: '',
  auth_time: 0,
  exp: 0,
  scope: [],
  psc: [],
  valid: false,
};

export { defaultPayload, defaultAccessTokenPayload, defaultIdTokenPayload };
