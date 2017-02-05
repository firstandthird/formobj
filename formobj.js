import deserialize from './lib/deserialize';
import getInputs from './lib/getInputs';
import getJSON from './lib/getJSON';
import getQueryString from './lib/getQueryString';
import isForm from './lib/isForm';

function formobj(form, selector) {
  isForm(form);

  const api = {
    getInputs() {
      return getInputs(form, selector);
    },

    getJSON() {
      return getJSON(form, selector);
    },

    deserialize(data) {
      return deserialize(data, getInputs(form, selector));
    },

    getQueryString() {
      return getQueryString(api.getJSON(form));
    }
  };

  return api;
}

export { formobj as default, deserialize, getInputs, getJSON, isForm, getQueryString };
