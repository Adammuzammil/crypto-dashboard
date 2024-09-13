import jwtDecode from "jwt-decode";
import { getAccessToken } from "./getAccessToken";

export const getUserInfo = () => {
  const token = getAccessToken();
  console.log("Access Token:", token); // Log the token

  if (!token) {
    console.log("No token found");
    return null;
  }

  try {
    const decoded = jwtDecode(token);
    console.log("Decoded token:", decoded); // Log the decoded token
    return {
      uid: decoded.user_id,
      email: decoded.email,
      // Add any other user properties that are included in your JWT
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
