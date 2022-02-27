import { IAccessTokenPayload, IIdTokenPayload, TTokenType } from '../types';

const getDefaultPayload = (tokenType: TTokenType) => {
  let payload: IAccessTokenPayload | IIdTokenPayload;

  if (tokenType === 'access') {
    payload = {
      iss: '',
      sub: '',
      aud: '',
      lng: '',
      jti: '',
      nonce: '',
      auth_time: 0,
      scope: [],
      psc: [],
      exp: 0,
      valid: false,
    };
  } else {
    payload = {
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
  }

  return payload;
};

export default getDefaultPayload;
