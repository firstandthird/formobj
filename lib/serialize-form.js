export default class SerializeForm {
  constructor(form, selector = '[name]') {
    if (!form || !form.tagName || form.tagName !== 'FORM') {
      throw new Error('Must pass in a form element');
    }

    if (typeof selector !== 'string') {
      throw new Error('Invalid selector');
    }

    this.form = form;
    this.selector = selector;
  }

  getInputs() {
    return this.form.querySelectorAll(this.selector);
  }

  getJSON() {
    const output = {};

    for (const input of this.getInputs()) {
      const name = input.getAttribute('name');
      let value;

      if (input.type === 'checkbox') {
        value = input.checked;
      } else if (input.type === 'radio') {
        if (input.checked) {
          value = input.value;
        } else {
          continue;
        }
      } else if (input.tagName === 'SELECT' && input.multiple) {
        value = [];

        for (const option of input.options) {
          if (option.selected) {
            value.push(option.value);
          }
        }
      } else {
        value = input.value;
      }

      // Radio will have multiple matching `name` attributes and we don't want them all.
      if (typeof output[name] !== 'undefined' && input.type !== 'radio') {
        if (Array.isArray(output[name])) {
          output[name].push(value);
        } else {
          output[name] = [output[name], value];
        }
      } else {
        output[name] = value;
      }
    }

    return output;
  }
}
