import toast, { Toaster } from "react-hot-toast";
import { Field, Form, Formik } from "formik";

export default function SearchBar({ onSearch }) {
  return (
    <header>
      <Toaster position="top-center" reverseOrder={false} />
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, actions) => {
          onSearch(values.query);
          actions.resetForm();
        }}
      >
        <Form>
          <Field
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </header>
  );
}
