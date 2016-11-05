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
      output[input.getAttribute('name')] = input.value;
    }

    return output;
  }
}
