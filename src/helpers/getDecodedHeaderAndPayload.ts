import { IAccessTokenPayload, IIdTokenPayload, ITokenParts } from '../types';

const getDecodeHeaderAndPayload = (tokenParts: ITokenParts) => {
  const { payload, header } = tokenParts;

  const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString());
  const decodedHeader = JSON.parse(Buffer.from(header, 'base64').toString());

  return {
    header: decodedHeader,
    payload: decodedPayload,
  };
};

export default getDecodeHeaderAndPayload;
