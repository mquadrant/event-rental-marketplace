export default function validate(values) {
  let errors = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email is invalid";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 10) {
    errors.password = "Password should be maximum of 10 characters";
  }

  if (!values.fname) {
    errors.fname = "First name is required";
  }
  if (!values.lname) {
    errors.lname = "Last name is required";
  }
  if (!values.phone) {
    errors.phone = "Phone number is required";
  }

  return errors;
}
