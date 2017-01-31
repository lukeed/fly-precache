'use strict';

const cache = require('sw-precache');

const runtime = require.resolve('./runtime');
const toolbox = require.resolve('sw-toolbox/sw-toolbox');

module.exports = function (fly, utils) {
	const gen = utils.promisify(cache.generate);

	fly.plugin('precache', {every: 0, files: 0}, function * (globs, opts) {
		// overwrite / ensure these options
		opts = Object.assign({}, opts, {
			staticFileGlobs: this._.globs,
			importScripts: [
				'sw/sw-toolbox.js',
				'sw/runtime-caching.js'
			]
		});

		// assume first file has the `dir` property we want
		const dir = this._.files[0].dir;

		try {
			// generate sw-cache
			const data = yield gen(opts);
			// construct new psuedo-file objects & replace `fly._.files`
			this._.files = [{
				dir: dir,
				base: 'service-worker.js',
				data: new Buffer(data)
			}, {
				dir: `${dir}/sw`,
				base: 'sw-toolbox.js',
				data: yield this.$.read(toolbox)
			}, {
				dir: `${dir}/sw`,
				base: 'runtime-caching.js',
				data: yield this.$.read(runtime)
			}];
		} catch (err) {
			return fly.emit('plugin_error', {
				plugin: 'fly-precache',
				error: err.message
			});
		}
	});
};
