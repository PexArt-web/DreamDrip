import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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
  // const db = getFirestore(app);
//   const usernameRef = collection(db, "Blog_users_username");
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log(user);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  const postBtn = document.querySelector('.postbtn')

  postBtn.addEventListener('click',async(e)=>{
    e.preventDefault()
    const container = document.querySelector('.wrapp')
   window.location.href = './dreamDrip_home.html'
  })