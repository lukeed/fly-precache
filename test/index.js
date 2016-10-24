'use strict';

const join = require('path').join;
const test = require('tape').test;
const Fly = require('fly');

const dir = join(__dirname, 'fixtures');
const tmp = join(__dirname, 'tmp');

test('fly-precache', t => {
	t.plan(4);

	const fly = new Fly({
		plugins: [{
			func: require('../lib')
		}],
		tasks: {
			a: function * () {
				t.true('precache' in fly, 'attach `precache()` plugin to fly');
				yield this.source(`${dir}/*.*`).precache().target(tmp);

				const arr1 = yield this.$.expand(`${tmp}/**/*.js`);
				t.equal(arr1.length, 3, 'create all files within target dir');
				const arr2 = yield this.$.expand(`${tmp}/sw/*`);
				t.equal(arr2.length, 2, 'create two files within `/sw` subdir');
				yield this.clear(tmp);

				yield this.source(`${dir}/*.*`).precache({cacheId: 'fly-test'}).target(tmp);
				const str1 = yield this.$.read(`${tmp}/service-worker.js`, 'utf8');
				t.true(str1.indexOf('sw-precache-v1-fly-test') !== -1, 'assign a `cacheId` name');
				yield this.clear(tmp);
			}
		}
	});

	fly.start('a');
});
