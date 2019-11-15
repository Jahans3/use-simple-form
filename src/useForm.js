import { useState } from 'react';

export const validationTriggers = {
  onSubmit: 'onSubmit',
  onChange: 'onChange'
};

function findValidationErrors(rules, value, form) {
  if (typeof rules === 'function') {
    return rules(value, form);
  }

  for (let i = 0; i < rules.length; i++) {
    const validationResult = rules[i](value, form);
    if (validationResult) {
      return validationResult;
    }
  }
}

export default function useForm({
  onSubmit,
  validate = [],
  rules = {},
  initialValues = {}
}) {
  const [form, setForm] = useState(initialValues);
  const [errors, setErrors] = useState(
    Object.keys(initialValues).reduce((key, result) => ({
      ...result,
      [key]: undefined
    }), {})
  );
  const getError = name => errors[name];
  const setError = (name, error) => setErrors({ ...errors, [name]: error });
  const getValue = name => form[name] || '';
  const setValue = (name, selector) => result => {
    const value = (!!selector && typeof selector === 'function')
      ? selector(result)
      : result.target.value;

    if (rules[name] && validate.includes(validationTriggers.onChange)) {
      const error = findValidationErrors(rules, value, form);

      if (error) {
        setError(name, error);
      } else {
        setError(name, undefined);
      }
    }

    setForm({ ...form, [name]: value });
  };
  const submitForm = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    if (Object.keys(rules).length && validate.includes(validationTriggers.onSubmit)) {
      const errors = Object.entries(rules)
        .reduce((result, [key, rule]) => ({
          ...result,
          [key]: findValidationErrors(rule, form[key], form)
        }), {});

      if (Object.entries(errors).find(([, value]) => value)) {
        setErrors(errors);
      } else {
        return onSubmit(form);
      }
    } else {
      return onSubmit(form);
    }
  };

  return { getValue, setValue, submitForm, getError, setError, errors };
}
