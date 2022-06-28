const path = require('path');
const { override, addWebpackPlugin } = require('customize-cra');
const { InjectManifest } = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = override(
  addWebpackPlugin(
    new WebpackPwaManifest({
      name: 'KBTI',
      short_name: 'KBTI',
      description: 'KBTI merupakan aplikasi untuk pencarian istilah tentang IT',
      start_url: '/',
      filename: 'manifest.json',
      display: 'standalone',
      background_color: '#2196f3',
      orientation: 'portrait',
      theme_color: '#2196f3',
      publicPath: '/',
      icons: [
        {
          src: path.resolve('src/assets/images/logo/iconKBTI.png'),
          type: 'image/png',
          sizes: [96, 128, 192, 256, 384, 512],
          destination: 'static/media',
          purpose: 'maskable',
        },
        {
          src: path.resolve('src/assets/images/logo/iconKBTI.png'),
          type: 'image/png',
          size: '144x144',
          destination: 'static/media',
          purpose: 'any',
        },
      ],
    }),
  ),
  addWebpackPlugin(
    new InjectManifest({
      maximumFileSizeToCacheInBytes: 5000000,
      swSrc: './src/service-worker.js',
      swDest: process.env.NODE_ENV === 'development' ? './service-worker.js' : path.resolve('service-worker.js'),
    }),
  ),
);
