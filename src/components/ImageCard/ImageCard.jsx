import clsx from "clsx";
import css from "./ImageCard.module.css";

export default function ImageCard({ imageData }) {
  return (
    <div className={clsx(css.imageCardWrapper)}>
      <img
        // onClick={() => onClick(photo.urls.regular, photo.description)}
        className={css.photo}
        src={imageData.urls.small}
        alt={imageData.description}
      />
    </div>
  );
}
