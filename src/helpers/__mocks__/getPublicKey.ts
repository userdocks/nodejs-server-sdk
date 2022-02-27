import { IOptions } from '../../types';

const getPublicKey = jest
  .fn()
  .mockImplementationOnce(async (options: IOptions) => '')
  .mockImplementationOnce(async (options: IOptions) => '')
  .mockImplementationOnce(async (options: IOptions) => '')
  .mockImplementationOnce(async (options: IOptions) => options.app.publicKey)
  .mockImplementationOnce(async (options: IOptions) => options.app.publicKey);

export default getPublicKey;
