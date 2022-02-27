import { IOptions } from '../../types';

const getPayload = jest
  .fn()
  .mockImplementationOnce(async (options: IOptions) => {
    throw new Error();
  });

export default getPayload;
