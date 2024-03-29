const { generateSW } = require("workbox-build");

generateSW({
  swDest: "app/sw.js",
  globDirectory: "app",
  globPatterns: ["**/*.{html,css}", "main.js", "classes/*.js"],
  skipWaiting: true,
  clientsClaim: true,

  runtimeCaching: [
    {
      urlPattern: /\.(css|js)/,
      handler: "cacheFirst",
    },
    {
      urlPattern: /^https:\/\/use\.fontawesome\.com.*/,
      handler: "staleWhileRevalidate",
      options: {
        cacheName: "fontawesome",
      },
    },
  ],
})
  .then(({ count, size }) =>
    console.log(
      `Generated new SW with ${count} precached files, totaling ${size} bytes.`
    )
  )
  .catch(console.error);
