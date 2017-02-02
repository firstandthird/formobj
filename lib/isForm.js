export default function isForm(el) {
  if (!el || !el.tagName || el.tagName !== 'FORM') {
    throw new Error('Must pass in a form element');
  }
}
