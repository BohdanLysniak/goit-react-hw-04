import { useState } from "react";
import { useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { getPhotos } from "../../../apiService/unsplash-api";
import "./App.css";
import { ErrorMessage } from "formik";
import { Toaster } from "react-hot-toast";

function App() {
  const [gallery, setGallery] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [IsError, setIsError] = useState(false);

  useEffect(() => {
    if (!searchQuery.trim()) return;

    async function fetchPhotos() {
      try {
        setIsLoading(true);
        setIsError(false);
        const { result } = await getPhotos(searchQuery, page);
        setGallery(prevState => {
          return [...prevState, ...result];
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
      {IsError && <ErrorMessage />}
      <Toaster />
    </>
  );
}

export default App;
