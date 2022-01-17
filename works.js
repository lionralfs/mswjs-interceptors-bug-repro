import https from 'https';
import { createInterceptor } from '@mswjs/interceptors';
import { interceptClientRequest } from '@mswjs/interceptors/lib/interceptors/ClientRequest/index.js';

const interceptor = createInterceptor({
  modules: [interceptClientRequest],
  resolver(request, ref) {
    return {
      status: 200,
      body: JSON.stringify({
        success: true,
      }),
    };
  },
});

interceptor.apply();

interceptor.on('request', (request) => {
  console.log('[%s] %s', request.method, request.url.toString());
});

// is intercepted
https
  .request('https://example.com/test', (res) => {})
  .on('error', console.error)
  .end();
