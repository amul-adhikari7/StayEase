import CryptoJS from "crypto-js";

// Function to decode data from base64
export const decodeDataFromBase64 = (base64String) => {
  const jsonString = atob(base64String);
  const data = JSON.parse(jsonString);
  return data;
};

// Function to hash
export const hashValue = (data) => {
  var hash = CryptoJS.HmacSHA256(data, "8gBm/:&EnhH.1/q");
  var hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
  return hashInBase64;
};
