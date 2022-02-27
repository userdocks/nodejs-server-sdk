import getPayload from './helpers/getPayload';
import getTokenParts from './helpers/getTokenParts';
import { IOptions, TTokenType } from './types';

const getUserdocks = (options: IOptions) => {
  return {
    verify: async (token: string, tokenType: TTokenType) => {
      let payload;
      const tokenParts = getTokenParts(token);

      payload = await getPayload(tokenParts, tokenType, options);

      return payload;
    },
  };
};

export default getUserdocks;
