import { useState } from "react";

export function useFormista({ initialValue, onSubmit, validationSchema }) {
  const [values, setValues] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (!(name in values)) {
      const errorMessage = `${name} field is not available in initial values.`;
      console.error(errorMessage); // Log the error to the console
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errorMessage,
      }));
      return;
    }

    setValues((prevValues) => ({ ...prevValues, [name]: value }));

    // Clear error for the field when the user starts typing again
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validationSchema(values);

    setErrors(validationErrors);

    // If no errors, proceed with submission
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    }
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  };
}
