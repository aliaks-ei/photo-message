/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "assets/styles/global.css",
    "revision": "4bc2580d9bbf5a396f917803e5bdbadb"
  },
  {
    "url": "index.html",
    "revision": "849aef57cf5822dd5033c3c118db0394"
  },
  {
    "url": "main.js",
    "revision": "2262fc6893b1a16b7b3240c29ea51407"
  },
  {
    "url": "classes/Camera.js",
    "revision": "11f2ef15f9390011866e1e3f1d3252c3"
  },
  {
    "url": "classes/Message.js",
    "revision": "4c4e676ebfb64a83788f20126213c6fe"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/\.(css|js)/, workbox.strategies.cacheFirst(), 'GET');
workbox.routing.registerRoute(/^https:\/\/use\.fontawesome\.com.*/, workbox.strategies.staleWhileRevalidate({ "cacheName":"fontawesome", plugins: [] }), 'GET');
