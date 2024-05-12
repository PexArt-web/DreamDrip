import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  collection,
  getDoc,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import {
  getStorage,
  ref,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

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

//initialize firestore
const db = getFirestore(app);
const usernameRef = collection(db, "Blog_users_username");
const auth = getAuth();

onAuthStateChanged(auth, async (user) => {
  const docRef = doc(usernameRef, user.uid);
  const colRef = collection(db, "userscontent");
  // const postRef = doc(colRef)
  try {
    const querySnapshot = await getDocs(colRef);
    const usernameRef = await getDoc(docRef);
    let user_name;
    if (usernameRef.exists()) {
      user_name = usernameRef.data().username;
    }
    const showPost = document.querySelector(".showPost");
    showPost.innerHTML = "";
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let mediaUrl;

      if (doc.data().typeCategory == "images") {
        mediaUrl = `<img src="${
          doc.data().fileUrl
        }" class="card-img-top postImg" alt="..." id='postImg'></img>`;
      } else if (doc.data().typeCategory == "videos") {
        mediaUrl = `<video src="${
          doc.data().fileUrl
        }" class="postVid"></video>`;
      }else if(doc.data().typeCategory == 'unknown'){
        mediaUrl = ''
      }
      showPost.innerHTML += `<div class="card mb-2">
  <nav class="navbar bg-body-tertiary">
      <div class="container-fluid userWrap">
          <a class="user_name" href="#">
              <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Logo" width="20" height="20" class="d-inline-block align-text-center rounded-circle userImage ">
              ${user_name}
            </a>
      </div>
    </nav>
<!-- <h5 class="card-title">Card title</h5> -->
<p class="card-text">${doc.data().textcontent}</p>
<p>${mediaUrl}</p>
<p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
</div>`;
      console.log(doc.data());
    });
  } catch (error) {
    console.log(error);
  }
});

const postBtn = document.querySelector(".postbtn");

postBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const container = document.querySelector(".wrapp");
  window.location.href = "./dreamDrip_home.html";
});
