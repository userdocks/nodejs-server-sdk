const checkHttps = (url: URL) => {
  const isHTTPS = url.protocol === 'https:';

  return isHTTPS;
};

export default checkHttps;
