/* eslint no-console: 0 */

import SerializeForm from '../lib/serialize-form';

const form1 = new SerializeForm(document.getElementById('exampleform'));

import { test } from 'tape';

test('implementation', assert => {
  /*
    These don't really test the class as they're really just to
    make sure the testing environment is setup correctly.
  */
  assert.ok(Array.isArray(window.logHistory), 'window.logHistory setup');
  assert.equal(typeof SerializeForm, 'function', 'SerializeForm class exists');

  assert.end();
});

test('constructor', assert => {
  assert.equal(typeof SerializeForm.constructor, 'function', 'Constructor exists');
  assert.equal(typeof form1, 'object', 'Form1 initialized');

  assert.end();
});

test('serialize', assert => {
  assert.equal(form1.getInputs().length, 10, 'Finds inputs');
  assert.deepEqual(form1.getJSON(), {
    test1: 'test',
    arraylike: [
      'val1',
      'val2'
    ],
    checkbox: [true, false],
    gender: 'female',
    color: 'green',
    sizes: [
      'small',
      'medium'
    ]
  }, 'JSON output');

  assert.end();
});
