import axios from "axios";

export const uploadCSV = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(
    "http://localhost:8080/api/analyze",
    formData
  );
};
