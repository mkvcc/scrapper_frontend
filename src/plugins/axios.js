
import axios from "axios";

let base = "http://localhost:9797"
let url = new URL("/api/", base);


axios.defaults.baseURL = url.href;
axios.defaults.headers.common["Accept"] = "application/json";

let token ;
try {
    let token_string = localStorage.getItem("token")
    token = JSON.parse(token_string) ;

} catch (e) {
    console.log("token errro" , e)
    token = localStorage.setItem("token" , undefined)
}

axios.interceptors.request.use(
  (config) => {
    const urlsExcludedForBearerHeader = [
      "/login",
      "/forgot",
      "/register",
      "/reset",
      `${window.location.origin}/version.json`,
    ];

    if (urlsExcludedForBearerHeader.indexOf(config.url) === -1) {
      config.headers.Authorization = "Bearer " + token;
    }
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
      console.log('request error ',error) ;
      if (error.request.status == 401) {
        console.log("auth error") ;
        window.location.href = '/login';
      }
    return Promise.reject(error);
  }
);

export default axios ;