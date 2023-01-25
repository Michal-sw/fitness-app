const fs = require('fs');
const jwt = require('jsonwebtoken');

export const getPublicKey = (): string => {
  try {
    const publicKey = fs.readFileSync('public.pem');
    return publicKey;
  } catch {
    return "MOCK_SECRET"
  }
};

export const getPrivateKey = (): string => {
  try {
    const privateKey = fs.readFileSync('private.pem');
    return privateKey;
  } catch {
    return "MOCK_SECRET"
  }
};

export const getNewTokenPair = (login: String) => {
  const privateKey = getPrivateKey();

  // The tokens must be paired with the user in the database
  // 15 minute expire
  const refreshToken = jwt.sign({ login }, privateKey, {
    expiresIn: 60*15
  });
  // 5 minutes expire
  const token = jwt.sign({ login }, privateKey, {
    expiresIn: 60*5
  });

  return {
    refreshToken,
    token
  }
};

export const getCookie = (cookies: String, key: string): string => {
  const cookiesSplitted = cookies.split("; ");
  const targetCookie = cookiesSplitted.find(cookie => cookie.startsWith(key));
  
  return targetCookie?.slice(key.length + 1) || "";
};

export const getCorrectObject = (result: any) => ({ result, statusCode: 200 });
export const getErrorObject = (statusCode: number, message?: string) => ({ statusCode, result: message });

export default { getPublicKey, getPrivateKey, getCookie, getCorrectObject, getErrorObject, getNewTokenPair };