import axios from "axios";

// This function will insert the token into the axios header when a user request is done

export default function setAuthToken(token) {
  if (token) {
    axios.defaults.headers.common["x-access-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-access-token"];
  }
}
