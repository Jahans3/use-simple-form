# use-simple-form
React forms made easy using an intuitive hooks-based API

### Usage
Install: 
```bash
yarn add use-simple-form
```

Import:
```js
import { useForm } from '@use-simple/form';
```

Integrate:
```js
function SignUp() {
  const { setValue, getValue, submit } = useForm({ onSubmit: form => console.log(form) });
  return (
    <>
      <TextInput name="username" value={getValue('username')} onChange={setValue('username')} />
      <TextInput name="password" value={getValue('password')} onChange={setValue('password')} />
      <button label="Submit" onClick={submit} />
    </>
  );
}
```
