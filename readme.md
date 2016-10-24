# fly-precache [![][travis-badge]][travis-link]

> Generate a service worker to cache resources and make them available offline.

## Install

```
npm install --save-dev fly-precache
```

## API

### .precache(options)

A full list of `sw-precache` options can be [found here](https://github.com/GoogleChrome/sw-precache#options-parameter).

## Usage

Cache assets within the `dist` directory. This will create a `dist/sw` directory that contains two dependencies for the `dist/service-worker.js`.

```js
export default function* () {
  yield this.source('dist/**/*.{js,html,css,png,jpg,gif}')
    .precache({
      cacheId: 'my-project-name'
    })
    .target('dist');
}
```

## License

MIT © [Luke Edwards](https://lukeed.com)

[travis-link]:  https://travis-ci.org/lukeed/fly-precache
[travis-badge]: http://img.shields.io/travis/lukeed/fly-precache.svg?style=flat-square
