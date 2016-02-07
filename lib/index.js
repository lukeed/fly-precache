const fs = require('fs')
const path = require('path')
const assign = require("object-assign")
const swPrecache = require("sw-precache")

module.exports = function () {
  console.log( process.cwd() );
  this.precache = (options) => {
    options = assign({}, defaults, options)
    const globs = this._.globs

    return swPrecache.write()
  };
}
