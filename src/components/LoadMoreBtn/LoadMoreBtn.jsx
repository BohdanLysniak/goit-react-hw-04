import clsx from "clsx";
import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick }) {
  return (
    <button type="button" className={clsx(css.loadMoreBtn)} onClick={onClick}>
      Load more
    </button>
  );
}
