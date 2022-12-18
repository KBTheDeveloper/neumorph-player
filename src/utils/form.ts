
import React, { useState } from 'react';
const omit = (keys, obj) => Object.fromEntries(
  Object.entries(obj)
    .filter(([k]) => !keys.includes(k)));
const emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const useForm = (callback: Function, fields: string[]) => {
  //Form values
  const [values, setValues] = useState({});
  //Errors
  const [errors, setErrors]: [errors: any, setErrors: Function] = useState({});
  const clearError = (field, name) => {
    if (errors[field]) {
      delete errors[field][name];
      setErrors({
        ...errors
      });
    }
  };

  const setError = (field:  string, error: any) => {
    if (!errors[field]) {
      errors[field] = {};
    }
    errors[field][error.name] = error.text;
    setErrors({
      ...errors,
    })
  };

  const validationCases = {
    login: (input: HTMLInputElement) => {
      const loginErrorTexts = {
        required: "Login is required field",
        pattern: 'Login must be an email',
      }
      if (input.value !== "" && !emailRegex.test(input.value)) {
        setError(input.name, { name: "pattern", text: loginErrorTexts.pattern });
      } else {
        clearError(input.name, "pattern");
      }
    },
    password: (input: HTMLInputElement) => {
      const passwordErrorTexts = {
        pattern: "Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers"
      }
      if (
        input.value !== "" && !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(input.value)
      ) {
        setError(input.name, { name: "pattern", text: passwordErrorTexts.pattern });
      } else {
        clearError(input.name, "pattern");
      }
    },
    passwordConfirm: (input: HTMLInputElement) => {
      // @ts-ignore
      if (input.value !== values.password) {
        setError(input.name, {name: "mismatch", text: "Passwords don't match"});
      } else {
        clearError(input.name, "mismatch");
      }

    },
    // required: (name) => {
    //   setErrors({
    //     ...errors,
    //     [name]: errors[name],
    //   })

    // },
    email: (value: string) => {
      if (value !== "" && !emailRegex.test(value)) {
        setErrors({
          ...errors,
          email: 'Enter a valid email address'
        })
      } else {
        let newObj = omit("email", errors);
        setErrors(newObj);
      }
    }
  };

  const validate = (event, name, value) => {
    const input = event.target;
    //A function to validate each input values
    validationCases[name](input);
  };

  //A method to handle form inputs
  const handleChange = (event) => {
    //To stop default events    
    event.persist();

    let {name, value, required} = event.target;
    if(value !== "" && required && errors[name]?.required) {
      clearError(name, "required");
    }
    validate(event, name, value);

    //Let's set these values in state
    setValues({
      ...values,
      [name]: value,
    })

  };

  const validateRequire = (inputs: HTMLFormControlsCollection) => {
    for(let input of inputs) {
      const {name, value, required} = input as HTMLInputElement;
      if (value === "" && required) {
        setError(name, { name: "required", text: `This field is required` });
      } else {
        clearError(name, "required");
      }
    }
  };

  const handleSubmit = (event) => {
    const inputs = event.target;
    validateRequire(inputs);
    if (event) event.preventDefault();
    let count = 0;
    Object.values(errors).forEach((val: any) => {
      if(val.length > 0) count++;
    });
    let fieldsCount = 0;
    Object.entries(values).forEach(([key, value]: [key: string, value: string]) => {if(fields.includes(key) && value !== "") fieldsCount++});
    if (count === 0 && fieldsCount === fields.length ) {
      callback();
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};



export default useForm;