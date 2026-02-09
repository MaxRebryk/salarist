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
        <Form className={css.form}>
          <div className={css.inputDiv}>
            <label htmlFor="fineInput">Введіть суму штрафа</label>
            <Field className={css.input} type="input" name="fineInput"></Field>
          </div>
          <div>
            <button className={css.fineButton}>Додати штраф</button>
            <button className={css.cancelButton}>Відмінити</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
