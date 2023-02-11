import getTokenOrPipeThrough from './getTokenOrPipeThrough';

const getTokenParts = (token: string) => {
  const thisToken = getTokenOrPipeThrough(token);

  const splittedToken = thisToken?.split('.');

  if (!splittedToken || splittedToken?.length < 3) {
    return {
      header: '',
      payload: '',
      signature: '',
    };
  }

  const [header, payload, signature] = splittedToken;

  return {
    header,
    payload,
    signature,
  };
};

export default getTokenParts;
