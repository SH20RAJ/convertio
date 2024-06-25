// public/service-worker.js

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// Precache all the assets generated by the build process
precacheAndRoute(self.__WB_MANIFEST);

// Cache external CDN resources
registerRoute(
  ({ url }) => url.origin.includes('cdn') || url.origin.includes('some-other-origin'),
  new StaleWhileRevalidate({
    cacheName: 'external-cdn-resources',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        maxEntries: 60, // Maximum number of entries
      }),
    ],
  })
);

// Cache static resources such as images, scripts, styles
registerRoute(
  ({ request }) => request.destination === 'script' ||
                   request.destination === 'style' ||
                   request.destination === 'image',
  new CacheFirst({
    cacheName: 'static-resources',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        maxEntries: 60, // Maximum number of entries
      }),
    ],
  })
);

// Cache API responses
registerRoute(
  ({ url }) => url.pathname.startsWith('/api'),
  new StaleWhileRevalidate({
    cacheName: 'api-responses',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 24 * 60 * 60, // 1 day
        maxEntries: 50, // Maximum number of entries
      }),
    ],
  })
);
