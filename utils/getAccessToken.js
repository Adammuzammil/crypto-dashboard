// utils/auth.js
import Cookies from "js-cookie";

export const getAccessToken = () => {
  const token = Cookies.get("accessToken"); // Log the retrieved token
  return token;
};
