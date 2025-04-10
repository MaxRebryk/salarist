import { Formik, Form, Field } from "formik";
import * as React from "react";
import css from "./FineModal.module.css";

export default function FineModal() {
  const initialValues = {
    fineInput: 0,
  };

  return (
    <div className={css.modal}>
      <Formik initialValues={initialValues}>
        <Form>
          <label htmlFor="fineInput">Введіть суму штрафа</label>
          <Field type="input" name="fineInput"></Field>
        </Form>
      </Formik>
    </div>
  );
}
