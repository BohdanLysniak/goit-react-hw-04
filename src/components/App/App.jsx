import { useState } from "react";
import { useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { getPhotos } from "../../../apiService/photos";
import "./App.css";

function App() {
  const [gallery, setGallery] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!searchQuery.trim()) return;

    async function fetchImages() {
      try {
        const data = await getPhotos(searchQuery, page);
        setGallery(prevState => [...prevState, ...data]);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("temporarily");
      }
    }
    fetchImages();
  }, [searchQuery, page]);

  const handleSearch = () => {};

  return (
    <>
      <SearchBar onSearch={handleSearch} />
    </>
  );
}

export default App;
