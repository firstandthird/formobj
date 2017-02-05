/* eslint no-consoSerializeFormle: 0 */

import { default as formObj, getQueryString } from '../formobj';

import test from 'tape-rollup';

let form1;
let form2;

const init = () => {
  const container = document.createElement('div');
  container.id = 'formobj';
  document.body.appendChild(container);
};

const setup = () => {
  const container = document.getElementById('formobj');
  container.innerHTML = `
    <form id="exampleform">
      <input type="text" name="test1" value="test">
      <input type="text" value="nope">
      <input type="text" name="arraylike" value="val1">
      <input type="text" name="arraylike" value="val2">
      <input type="checkbox" name="checkbox" checked>
      <input type="checkbox" name="checkbox">
      <input type="radio" name="gender" value="male">
      <input type="radio" name="gender" value="female" checked>
      <input type="radio" name="gender" value="other">
      <select name="color">
        <option value="red">Red</option>
        <option value="green" selected>Green</option>
        <option value="blue">Blue</option>
      </select>
      <select name="sizes" multiple>
        <option value="small" selected>Small</option>
        <option value="medium" selected>Medium</option>
        <option value="large">Large</option>
      </select>
    </form>

    <form id="exampleform2">
      <input type="text" name="test1">
      <input type="text">
      <input type="text" name="arraylike">
      <input type="text" name="arraylike">
      <input type="checkbox" name="checkbox">
      <input type="checkbox" name="checkbox">
      <input type="radio" name="gender" value="male">
      <input type="radio" name="gender" value="female">
      <input type="radio" name="gender" value="other">
      <select name="color">
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
      </select>
      <select name="sizes" multiple>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
    </form>
  `;

  form1 = formObj(document.getElementById('exampleform'));
  form2 = formObj(document.getElementById('exampleform2'));
};

init();

test('implementation', assert => {
  setup();
  assert.equal(typeof formObj, 'function', 'FormObj class exists');

  assert.end();
});

test('serialize', assert => {
  setup();
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

test('serialize', assert => {
  setup();
  const json = form1.getJSON();

  form2.deserialize(json);

  assert.deepEqual(form2.getJSON(), {
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

test('get query string', assert => {
  setup();
  const testObject = {
    name: 'test',
    email: 'test@test.com',
    fruits: ['apple', 'orange']
  };
  const qs = getQueryString(testObject);

  assert.equal(qs, 'name=test&email=test%40test.com&fruits=apple&fruits=orange', 'it\'s able to parse an object into a qs');
  assert.equal(form1.getQueryString(), 'test1=test&arraylike=val1&arraylike=val2&checkbox=true&checkbox=false&gender=female&color=green&sizes=small&sizes=medium', 'it\'s able to parse a form into a qs');

  assert.end();
});
