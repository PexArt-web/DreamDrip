// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  TwitterAuthProvider,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVSn-9lFGGk3sSmrNzpd7kL2SsI6ECBwc",
  authDomain: "dreamdrip-a0922.firebaseapp.com",
  projectId: "dreamdrip-a0922",
  storageBucket: "dreamdrip-a0922.appspot.com",
  messagingSenderId: "238480014602",
  appId: "1:238480014602:web:26f0278bc51a34837f4ef3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GithubAuthProvider();


/** Git sign in */
const gitBtn = document.querySelector(".gitBtn");
gitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const gitAuth = await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        console.log(user, 'user details');
        console.log(result, 'git result');
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        console.log(error, 'git');
        console.log(credential, 'credential');
        // ...
      });
  } catch (error) {console.log(error);}
});

// Twitter sign in

const twitter_provider = new TwitterAuthProvider();

const twitterBtn = document.querySelector(".twitterBtn");

twitterBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const twit = await signInWithPopup(auth, twitter_provider)
      .then((result) => {
        console.log(result, "result");
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const secret = credential.secret;
        console.log(credential, "cred");
        // The signed-in user info.
        const user = result.user;
        console.log(user, "user");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = TwitterAuthProvider.credentialFromError(error);
        // ...
      });
  } catch (error) {
    console.log("error", error);
  } finally {
    console.log("done");
  }
});

/** Sign in With Google */

const googleBtn = document.querySelector('.google')
const google_provider = new GoogleAuthProvider()

googleBtn.addEventListener('click',async(e)=>{
  e.preventDefault()
  try {
    const google_signIn = await signInWithPopup(auth, google_provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      console.log(result,'result');
      console.log(user, 'user');
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error, 'error');
      // ...
    });
  } catch (error) {
    
  }
})

