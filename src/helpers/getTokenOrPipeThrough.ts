const getTokenOrPipeThrough = (token: string) => {
  const hasBearer = token.includes('Bearer ');

  if (hasBearer) {
    return token.split('Bearer ')[1];
  }

  return token;
};

export default getTokenOrPipeThrough;
