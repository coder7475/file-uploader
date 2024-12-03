/** @type {import('@remix-run/dev').AppConfig} */
export default {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.test.{ts,tsx}"],
  browserNodeBuiltinsPolyfill: {
    modules: {
      path: true,
      stream: true,
      events: true,
      util: true,
      fs: true,
      os: true,
      crypto: true,
      buffer: true,
    },
  },
};
