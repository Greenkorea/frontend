import queryString from "qs";

const api = {};

api.get = (endpoint, query = {}) => {
  let isJson = true;

  const URL = `${import.meta.env.VITE_API_URL}${endpoint}?${queryString.stringify(query)}`;

  return fetch(URL, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      const contentType = res.headers.get("content-type");
      if (contentType.includes("openxmlformats")) {
        isJson = false;
        return res.blob();
      }
      return res.json();
    })
    .then((res) => {
      if (!isJson) return res;

      if (res.statusCode >= 300) {
        const error = new Error();
        error.status = res.statusCode;
        error.statusCode = res.statusCode;
        error.message = res.error || res.message;
        throw error;
      }

      return res;
    });
};

export default api;
