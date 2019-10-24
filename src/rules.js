export function oneOf(options, error = 'Invalid option') {
  return value => options.find(o => o === value) ? '' : error;
}

export function required(error = 'Required input') {
  return value => !!value ? '' : error;
}

export function sameAs(key, error = 'Inputs must match') {
  return (value, form) => value === form[key] ? '' : error;
}

export function match(toMatch, error = 'Invalid input') {
  return value => {
    if (typeof toMatch === 'string') {
      return regex[toMatch].test(value) ? '' : error;
    }

    return toMatch.test(value) ? '' : error;
  };
}

const regex = {
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ // 8 chars, upper and lower case, numbers
};

export default {
  required,
  sameAs,
  match,
  oneOf
}
