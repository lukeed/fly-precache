'use strict';

const {join} = require('path');
const test = require('tape');
const Fly = require('fly');

const dir = join(__dirname, 'fixtures');
const tmp = join(__dirname, 'tmp');

test('fly-precache', t => {
	t.plan(4);

	const fly = new Fly({
		plugins: [
			require('../lib'),
			require('fly-clear')
		],
		tasks: {
			* a(f) {
				t.true('precache' in fly.plugins, 'attach `precache()` plugin to fly');
				yield f.source(`${dir}/*.*`).precache().target(tmp);

				const arr1 = yield f.$.expand(`${tmp}/**/*.js`);
				t.equal(arr1.length, 3, 'create all files within target dir');
				const arr2 = yield f.$.expand(`${tmp}/sw/*`);
				t.equal(arr2.length, 2, 'create two files within `/sw` subdir');
				yield f.clear(tmp);

				yield f.source(`${dir}/*.*`).precache({cacheId: 'fly-test'}).target(tmp);
				const str1 = yield f.$.read(`${tmp}/service-worker.js`, 'utf8');
				t.true(str1.indexOf('sw-precache-v1-fly-test') !== -1, 'assign a `cacheId` name');
				yield f.clear(tmp);
			}
		}
	});

	fly.start('a');
});
