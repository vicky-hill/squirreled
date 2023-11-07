import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDjZunmT_pciOjRAEuDBVGIR5oqlFlztPU",
  authDomain: "squirreled-27d04.firebaseapp.com",
  projectId: "squirreled-27d04",
  storageBucket: "squirreled-27d04.appspot.com",
  messagingSenderId: "1068260936491",
  appId: "1:1068260936491:web:b17d1e41c3bacbf198536e"
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