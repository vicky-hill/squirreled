import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCT2vViP7h9WcVD998s8wt9bxZ4B0HaPdo",
  authDomain: "hot-sauce-9985c.firebaseapp.com",
  projectId: "hot-sauce-9985c",
  storageBucket: "hot-sauce-9985c.appspot.com",
  messagingSenderId: "787897816912",
  appId: "1:787897816912:web:cba26670642d785d127e55"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const authorization = {
  resetPassword: (options, email) => async dispatch => {
    const [success, failure] = options.types;
    const promise = (resolve, reject) => {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          resolve(dispatch({
            type: success
          }));
        })
        .catch(err => {
          console.log(err)
          reject(dispatch({
            type: failure,
            payload: err.message
          }));
        });
    }

    return new Promise(promise);
  }
}