import clsx from "clsx";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ images }) {
  return (
    <ul>
      {images.map(image => (
        <li className={clsx(css.galleryItem)} key={image.id}>
          <ImageCard imageData={image} />
        </li>
      ))}
    </ul>
  );
}
