import clsx from "clsx";
import css from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  return (
    <>
      <p className={clsx(css.error)}>
        There was an error during the trick. Please reload the page!
      </p>
    </>
  );
}
