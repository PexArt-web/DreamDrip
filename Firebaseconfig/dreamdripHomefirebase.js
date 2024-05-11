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
  const postRef = doc(db, "usersPosts", user.uid);
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    // const uid = user.uid;
    // console.log(user);

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const showPost = document.querySelector('.showPost')
        showPost.innerHTML= ''
        showPost.innerHTML += `
        <div class="card-body">
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid userWrap">
                <a class="user_name" href="#">
                    <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Logo" width="20" height="20" class="d-inline-block align-text-center rounded-circle userImage ">
                    ${docSnap.data().username}
                  </a>
            </div>
          </nav>
      <!-- <h5 class="card-title">Card title</h5> -->
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit. coming soon stay tuned</p>
      <img src="..." class="card-img-top postImg" alt="...">
      <video src="" class="d-none postVid"></video>
      <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
    </div>
      `
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }

      const postSnap = await getDoc(postRef)
      if (postSnap.exists()) {
        console.log('post data', postSnap.data());
        const postText = document.querySelector('.card-text')
        postText.innerHTML = ''
        postText.innerHTML = `${postSnap.data().textcontent}`
        if (postSnap.data().typeCategory == 'images') {
          const postImg = document.querySelector('.postImg')
          postImg.src = `${postSnap.data().fileUrl}`
        }else if(postSnap.data().typeCategory == 'videos'){
          const postVid = document.querySelector('.postVid')
          postVid.classList.remove('d-none')
          postVid.src = `${postSnap.data().fileUrl}`
        }
      }else{
        console.log('no post document');
      }
    } catch (error) {
      console.log(error);
    }

    // ...
  } else {
    // User is signed out
    // ...
  }
});

const postBtn = document.querySelector(".postbtn");

postBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const container = document.querySelector(".wrapp");
  window.location.href = "./dreamDrip_home.html";
});
