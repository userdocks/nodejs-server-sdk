/* istanbul ignore file */
import https from 'https';
import http from 'http';
import { URL } from 'url';
import { IBody, IOptions, IResponse } from '../types';
import { defaultOptions } from './defaultOptions';

const requestPublicKey = async (options: IOptions): Promise<IResponse<IBody>> =>
  new Promise((resolve, reject) => {
    const url = new URL(
      options.authServer?.apiUri ||
        (defaultOptions.authServer?.apiUri as string),
    );

    const isHTTPS = url.protocol === 'https';
    const requestSuite = isHTTPS ? https : http;

    const request = requestSuite.request(
      {
        method: 'GET',
        port: url.port,
        hostname: url.hostname,
        path:
          options.authServer?.publicKeyPath ||
          defaultOptions.authServer?.publicKeyPath,
        headers: {
          'X-API-KEY-Type': 'read',
          'X-API-KEY': options.app.readOnlyApiKey,
          'X-CLIENT-ID': options.app.id,
          accept: 'application/json;utf-8',
        },
      },
      res => {
        const body: string[] = [];
        const response: IResponse<IBody> = {
          statusCode: res.statusCode || 400,
          headers: res.headers,
          body: {},
        };

        res.on('data', chunk => body.push(chunk));

        res.on('end', () => {
          if (body.length) {
            const stringyfiedBody = body.join();

            try {
              response.body = JSON.parse(stringyfiedBody);
            } catch {}
          }

          resolve(response);
        });
      },
    );

    request?.on('error', error => {
      reject({
        statusCode: 400,
        headers: {},
        body: {
          message: error,
        },
      });
    });

    request?.end();
  });

export default requestPublicKey;
