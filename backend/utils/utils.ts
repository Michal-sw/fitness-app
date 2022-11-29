const fs = require('fs');

const getPublicKey = () => {
  try {
    const publicKey = fs.readFileSync('public.pem');
    return publicKey;
  } catch {
    return "MOCK_SECRET"
  }
}

export default { getPublicKey };