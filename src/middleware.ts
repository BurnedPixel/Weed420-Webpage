import { defineMiddleware } from 'astro/middleware';

export const onRequest = defineMiddleware((context, next) => {
  const response = next();

  response.then?.then?.(res => {
    if (res) {
      res.headers.set('X-Content-Type-Options', 'nosniff');
      res.headers.set('X-Frame-Options', 'DENY');
      res.headers.set('X-XSS-Protection', '1; mode=block');
      res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
      res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
      res.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
      res.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
      res.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
    }
  });

  return response;
});