# formobj

Converts form elements with a `name` attribute to JSON.

## Installation

```sh
npm install --save formobj
```

## Usage

```html
<form id="SuperAmazingForm">
  <input type="text" name="username" value="superdude">
  <select name="capecolors" multiple>
    <option value="blue" selected>Blue</option>
    <option value="white">White</option>
    <option value="red" selected>Red</option>
  </select>
  <input type="checkbox" checked name="powerful">
  <input type="checkbox" name="smart">
</form>
```

```js
import FormObj from 'formobj';

const form = new FormObj(document.getElementById('SuperAmazingForm'));

const data = form.getJSON();
```

## Outputs

```json
{
    "username": "superdude",
    "capecolors": ["blue", "red"],
    "powerful": true,
    "smart": false
}
```

**Note:** Items that share the same name will become an array of values.
