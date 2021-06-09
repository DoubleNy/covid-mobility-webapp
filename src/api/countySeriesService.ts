import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";

const SERIES_URL = `${BASE_URL}/google/ro/counties`;

export const getRoCountiesSeries = async () => {
  return await axios.get(SERIES_URL);
};
