# use-simple-form
React forms made easy using an intuitive hooks-based API

### Usage
###### Install: 
```bash
yarn add use-simple-form
```

###### Import:
```js
import { useForm } from '@use-simple/form';
```

###### Integrate:
```js
function SignUp() {
  const { setValue, getValue, submit } = useForm({ onSubmit: form => {/* Do stuff... */} });
  return (
    <>
      <TextInput name="username" value={getValue('username')} onChange={setValue('username')} />
      <TextInput name="password" value={getValue('password')} onChange={setValue('password')} />
      <button label="Submit" onClick={submit} />
    </>
  );
}
```

# API
### useForm
Hook that accepts a form configuration object and returns methods used to control a form.

###### Example:
```js
const form = useForm({
  initialValues: { email: 'initial.value@email.com' },
  onSubmit: formValues => {/* Custom logic... */},
  validate: 'onSubmit', // Use array for multiple triggers: ['onSubmit', 'onChange'],
  rules: {
    oldPassword: rules.required(),
    newPassword: [rules.match('password'), rules.required()] // Use an array to pass multiple rules
  }
})
```

### Rules
Rules are validation functions that can be applied at the field or form level.

Note: All pre-defined rules can have the default error message overridden using the final argument of the rule function.

```js
import { rules } from '@use-simple/form';
```

###### `required`
This rule enforces that a field have a truthy value.

```js
rules: {
  myField: rules.required('myField doesn\'t exist!')
}
```

###### `sameAs`
This rule will attempt to match the value of one field to another.

```js
rules: {
  password: rules.required(),
  confirmPassword: rules.sameAs('password', 'Passwords must match!')
}
```

###### `match`
Attempts to match the input field value with either a pre-defined or given RegEx pattern.

Currently there are only 2 pre-defined RegEx patterns:
* `'email'`: Matches an email
* `'password`: Matches a password with at least 1 uppercase, at least 1 lowercase, at least 1 number and at least 1 special character.

Check against a pre-defined pattern by passing the name: 
```js 
rules.match('password');
```

```js
rules: {
  alphabet: rules.match(/^[A-Za-z]$/i, 'Not an alphabetical character!')
}
```

###### `oneOf`
This rule checks that the input value should match an element of a given array.

```js
rules: {
  myField: rules.oneOf(['a', 'b', 'c'], 'Invalid character!')
}
```

##### Custom Rules
This library includes some common rules that cover simple use cases. For more advanced use cases you may need to create your own, a rule function should follow the below signature:

```
String => ?String
```
