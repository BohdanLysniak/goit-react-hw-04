import clsx from "clsx";
import css from "./ImageCard.module.css";

export default function ImageCard({ imageData, onOpenModal }) {
  return (
    <div className={clsx(css.imageCardWrapper)}>
      <img
        onClick={() =>
          onOpenModal(imageData.urls.regular, imageData.description)
        }
        className={css.photo}
        src={imageData.urls.small}
        alt={imageData.description}
      />
    </div>
  );
}
