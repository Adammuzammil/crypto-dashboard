// utils/auth.js
import Cookies from "js-cookie";

export const getAccessToken = () => {
  const token = Cookies.get("accessToken");
  console.log("Retrieved token from cookie:", token); // Log the retrieved token
  return token;
};
