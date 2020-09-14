import axios from "axios";

export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export function getImageUrl(imageBuffer) {
  try {
    return `data:image/jpg;base64,${btoa(
      new Uint8Array(imageBuffer).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
      }, "")
    )}`;
  } catch (error) {
    console.log(error);
  }
}
