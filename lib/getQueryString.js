import getJSON from './getJSON';

export default function getQueryString(form) {
  let data;
  let queryString = '';

  if (form instanceof HTMLElement) {
    data = getJSON(form);
  } else {
    data = form;
  }

  const formatValue = (k, v) => `&${encodeURIComponent(k)}=${encodeURIComponent(v)}`;

  Object.keys(data).forEach(key => {
    const value = data[key];

    if (Array.isArray(value)) {
      value.forEach(k => {
        queryString += formatValue(key, k);
      });
    } else {
      queryString += formatValue(key, value);
    }
  });

  return queryString.substring(1);
}
