import { toArray } from 'domassist';

export default function deserialize(data, inputs) {
  const index = {};

  if (!Array.isArray(inputs)) {
    inputs = toArray(inputs);
  }

  inputs.forEach(input => {
    const name = input.getAttribute('name');
    let val = data[name];

    if (typeof index[name] === 'undefined') {
      index[name] = 0;
    } else {
      index[name] = index[name] + 1;
    }

    if (Array.isArray(val) && input.tagName !== 'SELECT' && !input.multiple) {
      val = val[index[name]];
    }

    if (typeof val === 'undefined') {
      return;
    }

    if (input.type === 'checkbox') {
      if (input.getAttribute('value')) {
        input.checked = val === input.value;
      } else {
        input.checked = val === true;
      }
    } else if (input.type === 'radio' && input.value === val) {
      input.checked = true;
    } else if (input.tagName === 'SELECT') {
      let v = val;

      if (!Array.isArray(val)) {
        v = [val];
      }

      toArray(input.options)
        .filter(option => v.indexOf(option.value) > -1)
        .forEach(option => {
          option.selected = true;
        });
    } else {
      input.value = val;
    }
  });
}
