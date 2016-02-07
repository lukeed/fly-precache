<div align="center">
  <a href="http://github.com/flyjs/fly">
    <img width=200px  src="https://cloud.githubusercontent.com/assets/8317250/8733685/0be81080-2c40-11e5-98d2-c634f076ccd7.png">
  </a>
</div>

> Generate a service worker to cache resources and make them available offline.

[![][fly-badge]][fly]
[![npm package][npm-ver-link]][releases]
[![][dl-badge]][npm-pkg-link]
[![][travis-badge]][travis-link]

## Install

```a
npm install -D fly-precache
```

## Example

Cache all assets within the `dist` directory. This will create a `dist/sw` directory that contains two dependencies for the `dist/service-worker.js`.

```js
export default function* () {
  yield this
    .source('dist/**/*.{js,html,css,png,jpg,gif}')
    .precache({
      root: 'dist',
      cacheId: 'fly-starter-kit'
    });
}
```

## API

All `sw-precache` options can be [found here](https://github.com/GoogleChrome/sw-precache#options-parameter).

The only additional option that `fly-precache` exposes is `root`.

#### root

> Type: `string`, Required.

The web-root of your production files. This is where the `service-worker.js` file will be placed.

## License

MIT © [Luke Edwards](https://lukeed.com)

[releases]:     https://github.com/lukeed/fly-precache/releases
[fly]:          https://www.github.com/flyjs/fly
[fly-badge]:    https://img.shields.io/badge/fly-JS-05B3E1.svg?style=flat-square
[mit-badge]:    https://img.shields.io/badge/license-MIT-444444.svg?style=flat-square
[npm-pkg-link]: https://www.npmjs.org/package/fly-precache
[npm-ver-link]: https://img.shields.io/npm/v/fly-precache.svg?style=flat-square
[dl-badge]:     http://img.shields.io/npm/dm/fly-precache.svg?style=flat-square
[travis-link]:  https://travis-ci.org/lukeed/fly-precache
[travis-badge]: http://img.shields.io/travis/lukeed/fly-precache.svg?style=flat-square
