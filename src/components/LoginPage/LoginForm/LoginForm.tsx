import { Formik, Form, Field } from "formik";
import * as React from "react";
import css from "./LoginForm.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/auth/operations";

type initialValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const initialValues = { email: "", password: "" };
  const loginId = React.useId();
  const passwordId = React.useId();

  const dispatch = useDispatch();

  const handleSubmit = (values: initialValues, actions) => {
    dispatch(login(values))
      .unwrap()
      .catch((error) => {
        alert(error);
      });
    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} class>
      <Form className={css.form}>
        <label htmlFor={loginId}>Email</label>
        <Field type="mail" name="email" id={loginId} />
        <label htmlFor={passwordId}>Password</label>
        <Field type="password" name="password" id={passwordId} />
        <button>Login</button>
      </Form>
    </Formik>
  );
}
