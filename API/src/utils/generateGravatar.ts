import * as CryptoJS from 'crypto-js';

export const generateGravatarUrl = async (email: string) => {
  const gravatarBaseUrl = 'https://www.gravatar.com/avatar/';

  const trimmedEmail = email.trim().toLowerCase();
  // Generate MD5 hash of the email
  const hash = CryptoJS.MD5(trimmedEmail).toString();
  // Construct and return the full Gravatar URL
  return `${gravatarBaseUrl}${hash}?s=${200}&d=identicon`;
};