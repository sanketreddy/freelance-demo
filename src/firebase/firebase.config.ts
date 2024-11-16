import * as admin from 'firebase-admin';
import * as serviceAccount from './netflixgpt-e4c1c-firebase-adminsdk-7mcjc-80a6f3fde8.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: 'https://netflixgpt-e4c1c.firebaseio.com',
});

export const firestore = admin.firestore();
