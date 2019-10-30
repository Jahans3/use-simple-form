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

```js
import { rules } from '@use-simple/form';
```

##### Custom Rules
This library includes some common rules that cover simple use cases. For more advanced use cases, a rule function should follow the below signature:

```
String => ?String
```
