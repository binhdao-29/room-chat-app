import firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDiDPGbPQB7yHssT011fsQGY4hGWQUWgho",
  authDomain: "room-chat-c83cd.firebaseapp.com",
  projectId: "room-chat-c83cd",
  storageBucket: "room-chat-c83cd.appspot.com",
  messagingSenderId: "760851407000",
  appId: "1:760851407000:web:683322fbc838e0d706f0ed",
  measurementId: "G-M0MEX1P2WV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator('http://localhost:9099');
if (window.location.hostname === 'localhost') {
  db.useEmulator('localhost', '8080');
}

export { db, auth };
export default firebase;