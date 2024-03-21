import admin from "firebase-admin";
const uid: string = 'MNaNEI7AtIarOTT5Nqmkygwvhi93';

async function generateAuthToken() {
  try {
    return await admin.auth().createCustomToken(uid);
  } catch (error) {
    console.error('Error generating custom token:', error);
    throw error;
  }
}

export default generateAuthToken;