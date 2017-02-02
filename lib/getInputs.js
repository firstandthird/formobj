import { find, toArray } from 'domassist';
import isForm from './isForm';

export default function getInputs(form, selector = '[name]') {
  isForm(form);

  if (typeof selector !== 'string') {
    throw new Error('Invalid selector');
  }

  return toArray(find(selector, form));
}
