import axios from "axios";

const YOUR_ACCESS_KEY = "MO0D2E1uLgRjL52sXSFcUnnBD2ln0XYMIQo5mt7N13M";

axios.defaults.baseURL = "https://api.unsplash.com/v1/";

export const getPhotos = async (searchValue, currentPage) => {
  const response = await axios.get("/search/photos", {
    params: {
      client_id: YOUR_ACCESS_KEY,
      query: searchValue,
      page: currentPage,
      orientation: "landscape",
      per_page: 12
    }
  });
  return response;
};
