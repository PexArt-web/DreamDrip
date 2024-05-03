alert('in')
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInWithPopup, FacebookAuthProvider, TwitterAuthProvider,signInWithRedirect } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
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
const provider = new FacebookAuthProvider();

const facebookBtn = document.querySelector('.facebookBtn')

facebookBtn.addEventListener('click', async(e)=>{
  e.preventDefault()
  facebookBtn.innerHTML = `<div class="spinner-border text-light" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`
   try {
   const facebook_in = await signInWithPopup(auth, provider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;
    console.log(user);

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

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
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });

   } catch (error) {
    console.log(error);
   } finally {
    facebookBtn.innerHTML = 'Sign Up With Facebook'
   }
})

// Twitter

const twitter_provider = new TwitterAuthProvider();

const twitterBtn  = document.querySelector('.twitterBtn')

twitterBtn.addEventListener('click', async (e)=>{
  e.preventDefault()
  try {
    const twit = await signInWithPopup(auth,twitter_provider)
    .then((result) => {
    console.log(result,'result');
    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    const credential = TwitterAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const secret = credential.secret;
    console.log(credential,'cred');
    // The signed-in user info.   
    const user = result.user;
    console.log(user, 'user');
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
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
    console.log('error', error);
  } finally{
    console.log('done');
  }
})
