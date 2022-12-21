const fs = require('fs');

const getPublicKey = () => {
  try {
    const publicKey = fs.readFileSync('public.pem');
    return publicKey;
  } catch {
    return "MOCK_SECRET"
  }
}

const getPrivateKey = () => {
  try {
    const privateKey = fs.readFileSync('private.pem');
    return privateKey;
  } catch {
    return "MOCK_SECRET"
  }
}

export default { getPublicKey, getPrivateKey };