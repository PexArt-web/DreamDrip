import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc
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
const colRef = collection(db, "userscontent");

const sendBtn = document.querySelector(".sendBtn");

sendBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  // Listen for changes in the authentication state
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      console.log("No user logged in");
      return; // Stop the function if no user is logged in
    }

    // Disable the send button and show a loading spinner
    sendBtn.disabled = true;
    sendBtn.innerHTML = `<div class="spinner-border text-light p-1" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>`;

    // Get the file from the file input
    const [file] = document.querySelector('.files').files;
    if (!file) {
      console.log("No file selected");
      sendBtn.disabled = false;
      sendBtn.innerHTML = `<i class="bi bi-send-fill"></i>`;
      return; // Stop the function if no file is selected
    }

    try {
      // Upload the file to Firebase Storage
     // Define the path and file name in storage
     const fileType = file.type
     let typeCategory = "unkonwn"
     if (fileType.startsWith('image/')) {
       typeCategory = 'images'
     }else if (fileType.startsWith('video/')) {
      typeCategory = 'videos'
     }else{
      console.log('others', fileType);
     }
     console.log('file.type', typeCategory);
      const uploadTask = await uploadBytesResumable(storageRef, file);
    

      // Get the download URL
      const postFileURL = await getDownloadURL(uploadTask.ref);
      console.log('File available at', postFileURL);

      // Get text content from a textarea or input
      let textcontent = document.querySelector('.textcontent').value;
      // preview value
      let fileValueWrap = document.querySelector('.fileValueWrap')

      // Reference to the Firestore collection and document
      // const docRef = doc(colRef, "usersPosts", user.uid,); // Adjust collection and document path as needed

      // Create or update the document with text content and file URL
      const createNewDoc = await addDoc(colRef, {
        textcontent,
        typeCategory,
        fileUrl: postFileURL // Save the file URL in Firestore
      });
      console.log("Document written with ID: ", colRef.id);
      document.querySelector('.textcontent').value = ``
      fileValueWrap.innerHTML = ''

    } catch (error) {
      console.error("Error uploading file or saving document: ", error);
    } finally {
      // Reset the send button
      sendBtn.disabled = false;
      sendBtn.innerHTML = `<i class="bi bi-send-fill"></i>`;
    }
  });
});


