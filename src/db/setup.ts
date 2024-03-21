import admin from "firebase-admin";

const serviceAccount = require("../../electron-poc-2425-firebase-adminsdk-6lc4f-675aba5dda.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

export default firestore;