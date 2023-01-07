const fs = require('fs');

const getPublicKey = (): string => {
  try {
    const publicKey = fs.readFileSync('public.pem');
    return publicKey;
  } catch {
    return "MOCK_SECRET"
  }
}

const getPrivateKey = (): string => {
  try {
    const privateKey = fs.readFileSync('private.pem');
    return privateKey;
  } catch {
    return "MOCK_SECRET"
  }
}

const getCookie = (cookies: String, key: string): string => {
  const cookiesSplitted = cookies.split("; ");
  const targetCookie = cookiesSplitted.find(cookie => cookie.startsWith(key));
  
  return targetCookie?.slice(key.length + 1) || "";
}

export default { getPublicKey, getPrivateKey, getCookie };