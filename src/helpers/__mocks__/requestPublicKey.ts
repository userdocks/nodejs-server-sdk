import { IOptions } from '../../types';

const requestPublicKey = jest
  .fn()
  .mockImplementationOnce(async (options: IOptions) => ({
    body: {
      data: {
        publicKey: 'this-is-a-public-key',
      },
    },
  }))
  .mockImplementationOnce(async (options: IOptions) => ({
    body: {
      data: {
        publicKey: '',
      },
    },
  }))
  .mockImplementationOnce(async (options: IOptions) => {
    throw new Error();
  });

export default requestPublicKey;
