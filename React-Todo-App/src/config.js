import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA2CwgF1Et4BjR6mxR4Q5GY1A1fgqM3j8M",
  authDomain: "todo-app-5304d.firebaseapp.com",
  projectId: "todo-app-5304d",
  storageBucket: "todo-app-5304d.appspot.com",
  messagingSenderId: "942444490645",
  appId: "1:942444490645:web:256d6b23b930c9ba97109c",
  measurementId: "G-D6S46XV582"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const email_auth  = getAuth();
const provider = new GoogleAuthProvider();
export { app, auth, provider };