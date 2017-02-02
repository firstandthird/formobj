import deserialize from './lib/deserialize';
import getInputs from './lib/getInputs';
import getJSON from './lib/getJSON';
import isForm from './lib/isForm';

function formobj(form, selector) {
  isForm(form);

  return {
    getInputs() {
      return getInputs(form, selector);
    },

    getJSON() {
      return getJSON(getInputs(form, selector));
    },

    deserialize(data) {
      return deserialize(data, getInputs(form, selector));
    }
  };
}

export { formobj as default, deserialize, getInputs, getJSON, isForm };
