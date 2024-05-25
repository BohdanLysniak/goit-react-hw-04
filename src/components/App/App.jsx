import { useState, useEffect } from "react";
import clsx from "clsx";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import { getPhotos } from "../../../apiService/unsplash-api";
import css from "./App.module.css";
import toast, { Toaster } from "react-hot-toast";
import ImageModal from "../ImageModal/ImageModal";

function App() {
  const [gallery, setGallery] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [IsError, setIsError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [modalImageAlt, setModalImageAlt] = useState("");

  useEffect(() => {
    if (!searchQuery.trim()) return;

    async function fetchPhotos() {
      try {
        setIsLoading(true);
        setIsError(false);
        const { results, total_pages } = await getPhotos(searchQuery, page);
        if (total_pages === 0) {
          toast("No image was found for your request", {
            duration: 5000,
            position: "top-center",
            style: {
              color: "blue",
              backgroundColor: "white"
            }
          });
        }
        setTotalPages(total_pages);
        setGallery(prevState => {
          return [...prevState, ...results];
        });
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPhotos();
  }, [searchQuery, page]);

  const handleSearch = async searchValue => {
    setSearchQuery(searchValue);
    setPage(1);
    setGallery([]);
  };

  const handleLoadMore = async () => {
    setPage(page + 1);
  };

  const openModal = (imgUrl, alt) => {
    setModalIsOpen(true);
    setModalImageSrc(imgUrl);
    setModalImageAlt(alt);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalImageSrc("");
    setModalImageAlt("");
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)"
    }
  };

  return (
    <div className={clsx(css.appWrapper)}>
      <SearchBar onSearch={handleSearch} />
      {gallery.length > 0 && (
        <ImageGallery images={gallery} onOpenModal={openModal} />
      )}
      {page < totalPages && gallery.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {IsError && <ErrorMessage />}
      {isLoading && <Loader />}
      <Toaster />
      <ImageModal
        onOpen={modalIsOpen}
        onClose={closeModal}
        style={customStyles}
        modalImageUrl={modalImageSrc}
        modalImageAlt={modalImageAlt}
      />
    </div>
  );
}

export default App;
