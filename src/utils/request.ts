import axios, { type AxiosResponse, type ResponseType } from "axios";

const token = localStorage.getItem("token");

axios.interceptors.request.use(
  function (config) {
    if (!config.headers) {
      config.headers;
    }
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: any, token: string | null = null): void => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axios.interceptors.response.use(
  function (response) {
    if (response.headers["content-type"]?.includes("application/json")) {
      const data = response.data;
      if (data.status) {
        return data;
      } else {
        return Promise.reject(data);
      }
    } else if (response.status === 200) {
      return response;
    }

    return Promise.reject(response);
  },

  async function (error) {
    if (error?.response) {
      const status = error.response.status;
      const message =
        error.response.data?.message || "Something went wrong. Please try again.";

      switch (status) {
        case 400:
          console.error("Bad Request:", message);
          return Promise.reject({ status, message });

        case 401:
          console.error("Unauthorized:", message);
          // 🔹 Refresh token logic could go here instead of rejecting directly
          return Promise.reject({ status, message });

        case 403:
          console.error("Forbidden:", message);
          return Promise.reject({ status, message });

        case 404:
          console.error("Not Found:", message);
          return Promise.reject({ status, message });

        case 500:
          console.error("Internal Server Error:", message);
          return Promise.reject({ status, message });

        default:
          console.error("Unhandled API Error:", message);
          return Promise.reject({ status, message });
      }
    } else if (error.request) {
      // No response received
      console.error("No response from server:", error.request);
      return Promise.reject({
        status: 0,
        message: "No response from server. Please check your connection.",
      });
    } else {
      // Axios config / network issue
      console.error("Axios Error:", error.message);
      return Promise.reject({ status: 0, message: error.message });
    }
  }
);



// Enable GPT-5 mini (Preview) for all clients
export const request = async ({
  url,
  method = "GET",
  params,
  body,
  headers,
  responseType,
}: {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  params?: any;
  body?: any;
  headers?: any;
  responseType?: ResponseType;
}) => {
  const BASE_URL = import.meta.env.VITE_APP_API_URL;
  const res: AxiosResponse = await axios.request({
    url: BASE_URL + url,
    method,
    params,
    data: body,
    headers,
    responseType,
  });

  return res;
};
