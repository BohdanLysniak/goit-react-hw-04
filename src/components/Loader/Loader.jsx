import { Audio } from "react-loader-spinner";
import clsx from "clsx";
import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={clsx(css.loader)}>
      {" "}
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="three-dots-loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  );
}
