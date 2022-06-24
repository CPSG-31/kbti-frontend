import 'regenerator-runtime';
import { clientsClaim, setCacheNameDetails } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute, NavigationRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

const oneMonthStoreInCache = 30 * 24 * 60 * 60;

clientsClaim();

setCacheNameDetails({
  prefix: 'KBTI APP',
  precache: 'precache',
  runtime: 'runtime',
});

precacheAndRoute(
  [
    ...self.__WB_MANIFEST,
    {
      url: '/manifest.json',
      revision: 'manifest-1',
    },
    {
      url: '/favicon.ico',
      revision: 'favicon-1',
    },
  ],
  {
    ignoreURLParametersMatching: [/.*/],
  },
);

registerRoute(new NavigationRoute(createHandlerBoundToURL('/index.html')));

registerRoute(
  /https:\/\/kbti-api.herokuapp.com\/(?!auth\/token).*\/*/,
  new StaleWhileRevalidate({
    cacheName: 'KBTI-API',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: oneMonthStoreInCache,
        maxEntries: 200,
      }),
    ],
  }),
);

registerRoute(
  /https:\/\/fonts.(?:googleapis|gstatic).com\//,
  new CacheFirst({
    cacheName: 'google-fonts-stylesheets',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 30,
      }),
    ],
  }),
);

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'KBTI-Images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: oneMonthStoreInCache,
      }),
    ],
  }),
);

cleanupOutdatedCaches();

