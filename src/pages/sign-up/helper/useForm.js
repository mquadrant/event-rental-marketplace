import { useState, useEffect } from "react";
import validate from "./validate";
const useForm = (callback) => {
  const [values, setValues] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    phone: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    } else console.log("no callback");
    return () => {};
  }, [callback, errors, isSubmitting]);

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
