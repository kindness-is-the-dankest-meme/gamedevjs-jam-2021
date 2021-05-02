const { resolve } = require('path');

const { nodeResolve } = require('@rollup/plugin-node-resolve');

/**
 * n.b. The added "@type" comment will enable TypeScript type information via
 * VSCode, etc.
 *
 * @see https://www.snowpack.dev/reference/configuration
 */

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  root: __dirname,
  workspaceRoot: resolve('../..'),
  mount: {
    src: '/',
  },
  plugins: ['@snowpack/plugin-typescript'],
  packageOptions: {
    external: [
      /**
       * node built-ins
       */
      'crypto',
      'events',
      'fs',
      'http',
      'https',
      'net',
      'os',
      'path',
      'stream',
      'tls',
      'url',
      'zlib',
      // /**
      //  * optionals
      //  * @see https://github.com/websockets/ws#opt-in-for-performance
      //  */
      //  'bufferutil',
      //  'utf-8-validate',
    ],
    rollup: {
      plugins: [nodeResolve()],
    },
  },
  buildOptions: {
    out: 'dist',
  },
};
