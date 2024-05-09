import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqn_5Swsr7PAnGz1Y2QtAnqyP5-i4bBFE",
  authDomain: "dreamdrip-a0922.firebaseapp.com",
  projectId: "dreamdrip-a0922",
  storageBucket: "dreamdrip-a0922.appspot.com",
  messagingSenderId: "238480014602",
  appId: "1:238480014602:web:26f0278bc51a34837f4ef3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialize firestore

const auth = getAuth();

const signInBtn = document.querySelector(".signInBtn");

signInBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  signInBtn.disabled = true
  signInBtn.innerHTML = ''
  signInBtn.innerHTML = `<div class="spinner-border text-light" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`
  const email = document.querySelector(".email").value;
  const password = document.querySelector(".password").value;


  try {
    const signInTask = await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
        if (user.emailVerified
          === true) {
          window.location.href = './Html/dreamdripHome.html' 
        }else{
          alert('error')
        }
        
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  } catch (error) {console.log(error);}
  finally{
    signInBtn.disabled = false
    signInBtn.innerHTML = ''
  signInBtn.innerHTML = `Sign In`
  }
});
