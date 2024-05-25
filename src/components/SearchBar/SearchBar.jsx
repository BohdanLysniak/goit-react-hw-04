import clsx from "clsx";
import toast from "react-hot-toast";
import { Field, Form, Formik } from "formik";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  return (
    <header className={clsx(css.header)}>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, actions) => {
          if (!values.query.trim()) {
            toast.error("Please, enter the text", {
              duration: 5000,
              position: "top-center",
              style: {
                color: "blue",
                backgroundColor: "white"
              }
            });
          }
          onSearch(values.query);
          actions.resetForm();
        }}
      >
        <Form className={clsx(css.form)}>
          <Field
            className={clsx(css.field)}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={clsx(css.btnSearch)} type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </header>
  );
}
