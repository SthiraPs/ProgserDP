// Importing necessary modules from crypto-js
import * as CryptoJS from "crypto-js";

// Defining a secret key for HMAC SHA256
const secret = "your_secret_key"; // Replace 'your_secret_key' with a real secret key

// TypeScript interface for the JWT Header
interface JwtHeader {
  alg: string;
  typ: string;
}

// TypeScript interface for the JWT Payload
interface JwtPayload {
  iat: number;
  iss: string;
  exp: number;
  email: string;
  role: string;
}

// Function to encode source string to base64url
function _base64url(source: CryptoJS.lib.WordArray): string {
  // Encode in classical base64
  let encodedSource = CryptoJS.enc.Base64.stringify(source);

  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, "");

  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, "-");
  encodedSource = encodedSource.replace(/\//g, "_");

  // Return the base64 encoded string
  return encodedSource;
}

// Function to generate JWT token
export function generateJWTToken(email: string, role: string): string {
  // Define token header
  const header: JwtHeader = {
    alg: "HS256",
    typ: "JWT",
  };

  // Calculate the issued at and expiration dates
  const date = new Date();
  const iat = Math.floor(date.getTime() / 1000);
  const exp = Math.floor((date.getTime() + 60 * 60 * 1000) / 1000); // Adds one hour to the current time

  // Define token payload
  const payload: JwtPayload = {
    iat: iat,
    iss: "PROGSER_DP",
    exp: exp,
    email: email,
    role: role,
  };

  // Stringify and encode the header and payload
  const stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
  const encodedHeader = _base64url(stringifiedHeader);
  const stringifiedPayload = CryptoJS.enc.Utf8.parse(JSON.stringify(payload));
  const encodedPayload = _base64url(stringifiedPayload);

  const signatureWordArray = CryptoJS.HmacSHA256(
    `${encodedHeader}.${encodedPayload}`,
    secret
  );

  // Correctly call _base64url with the WordArray and assign its result to a new variable
  const signatureBase64Url = _base64url(signatureWordArray);

  // Build and return the token
  return `${encodedHeader}.${encodedPayload}.${signatureBase64Url}`;
}


export function verifyJWTToken(token: string): boolean {
  const parts = token.split(".");
  const header = parts[0];
  const payload = parts[1];
  const signature = parts[2];

  const signatureCheck = _base64url(
    CryptoJS.HmacSHA256(header + "." + payload, secret)
  );

  // Verify that the resulting signature is valid
  return signature === signatureCheck;
}
