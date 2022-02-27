import getTokenOrPipeThrough from './getTokenOrPipeThrough';

const getTokenParts = (token: string) => {
  const thisToken = getTokenOrPipeThrough(token);

  const splittedToken = thisToken.split('.');

  if (splittedToken.length < 3) {
    throw new Error('Token is not in a valid JWT format!');
  }

  const [header, payload, signature] = splittedToken;

  return {
    header,
    payload,
    signature,
  };
};

export default getTokenParts;
