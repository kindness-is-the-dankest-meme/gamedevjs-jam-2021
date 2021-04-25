/**
 * n.b. The added "@type" comment will enable TypeScript type information via
 * VSCode, etc.
 *
 * @see https://www.snowpack.dev/reference/configuration
 */

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: '/',
  },
  plugins: ['@snowpack/plugin-typescript'],
  packageOptions: {},
  buildOptions: {
    out: 'dist',
  },
};