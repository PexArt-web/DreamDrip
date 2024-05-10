import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getAuth,   onAuthStateChanged,} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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
const auth = getAuth();

// initialize firestore
const db = getFirestore(app);


const sendBtn =  document.querySelector('.sendBtn')

sendBtn.addEventListener('click', async(e)=>{
    e.preventDefault()
    console.log(document.querySelector('.postcontent'));

})