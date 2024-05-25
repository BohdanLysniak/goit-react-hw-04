import { useState } from "react";
import { useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import { getPhotos } from "../../../apiService/unsplash-api";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [gallery, setGallery] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [IsError, setIsError] = useState(false);

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
              color: "pink",
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

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {gallery.length > 0 && <ImageGallery images={gallery} />}
      {gallery.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {IsError && <ErrorMessage />}
      {isLoading && <Loader />}
      <Toaster />
    </>
  );
}

export default App;
