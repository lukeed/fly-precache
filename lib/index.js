const fs = require('fs')
const path = require('path')
const cache = require('sw-precache')
const write = require('safe-write-file')
const assign = require('object-assign')

module.exports = function() {
  this.precache = (options) => {
    // overwrite / ensure these options
    options = assign(options, {
      staticFileGlobs: this._.globs,
      importScripts: [
        'sw/sw-toolbox.js', 'sw/runtime-caching.js',
      ]
    })

    return cache.generate(options, (err, contents) => {
      if (err) {
        return this.emit('plugin_error', {
          plugin: 'fly-precache',
          error: err.message
        })
      }

      // read files' data
      const run = fs.readFileSync(path.join(__dirname, 'runtime.js'))
      const kit = fs.readFileSync(path.join(this.root, 'node_modules', 'sw-toolbox', 'sw-toolbox.js'))

      // chdir into options.root + /sw
      process.chdir(options.root)

      // write files
      write('./sw/runtime-caching.js', run)
      write('./sw/sw-toolbox.js', kit)
      return write('./service-worker.js', contents)
    })
  }
}
