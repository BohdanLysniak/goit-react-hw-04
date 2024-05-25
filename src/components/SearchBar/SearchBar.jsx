import toast from "react-hot-toast";
import { Field, Form, Formik } from "formik";

export default function SearchBar({ onSearch }) {
  return (
    <header>
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
