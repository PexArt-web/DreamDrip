import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getFirestore,
  collection,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import {
  getStorage, ref, uploadBytesResumable,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";
import {
  getAuth,
  onAuthStateChanged,
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
const auth = getAuth();

// initialize firestore
const db = getFirestore(app);
const storage = getStorage();
const storageRef = ref(storage, 'postFile/posterFileURL.jpg');
const colRef = collection(db, "users");



const sendBtn = document.querySelector(".sendBtn");

sendBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  onAuthStateChanged(auth,async(user)=>{
    sendBtn.disabled = true
    sendBtn.innerHTML = `<div class="spinner-border text-light p-1" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`
    const [file] = document.querySelector('.files').files
    try {
      const uploadTask = await uploadBytesResumable(storageRef, file)
        const gt = await getDownloadURL(storageRef).then((postFileURL) => {
        console.log('File available at', postFileURL);
      });
      console.log(gt, 'here');
      // 
  
      const docRef = doc(
        colRef, user.uid,'usersPost', 'userscontent'
      )

      const textcontent = document.querySelector('.textcontent').value
      const createNewDoc = await setDoc(docRef,{
        textcontent,
        
      })
    
  
      // 
    } catch (error) {
      console.log(error);
    }finally{
      sendBtn.disabled = false 
      sendBtn.innerHTML = ` <i class=" bi bi-send-fill"></i>`
    }
  })
 
  //
});
