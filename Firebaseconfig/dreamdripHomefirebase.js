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
//
const auth = getAuth();
//initialize firestore
const db = getFirestore(app);

onAuthStateChanged(auth, async (user) => {
  const usernameRef = collection(db, "Blog_users_username");
  const docRef = doc(usernameRef, user.uid);
  try {
    const displayName = await getDoc(docRef);
    const colRef = collection(db, "userscontent");
    let user_name;
    if (displayName.exists()) {
      user_name = displayName.data().username;
      console.log(user_name, "display name");
    }
    const querySnapshot = await getDocs(colRef);
    const show_post = document.querySelector('.showPost')
    show_post.innerHTML = ''
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      let mediaUrl = ''
      if (doc.data().typeCategory == "images") {
        mediaUrl = `<img src="${
          doc.data().fileUrl
        }" class="card-img-top postImg" alt="..." id='postImg'></img>`;
      } else if (doc.data().typeCategory == "videos") {
        mediaUrl = `<video src="${
          doc.data().fileUrl
        }" class="postVid"></video>`;
      }else if(doc.data().typeCategory == 'unknown'){
        mediaUrl = null
      }
      const convertedtime =  doc.data().createdAt
      const date = convertedtime.toDate();
      const timeUpdated = moment(date).fromNow()
      show_post.innerHTML += `
      <div class="card mb-2 p-2">
      <nav class="navbar bg-body-tertiary">
          <div class="container-fluid userWrap">
              <a class="user_name text-dark" href="#">
                  <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxANEA8NDQ8QDQ0NEBANDQ0NEBANDQ0NFREWFhURFRUYHSggGBolGxUVITEhJSk3Li4uFx8zOD8tNygtOisBCgoKDQ0NFQ0NFSsdFRktKy0tKy0rKystLSstKysrLSsrKzcrKysrLTcrKy0rLS0rKystKy0tKysrKysrKysrK//AABEIAKgBLAMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQIH/8QAIhABAAEEAgICAwAAAAAAAAAAAOEBMUHwEdFRwWGBIaGx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDiRISIEhIKG3Nuoom/oQUg25TrKi0OfSU38kZRFpX2c+ickZUJXtOq5XvyB1U7TquV78gdHO/SY+vJ35+AXn0JGTbgc+jkjJt0Dn1/U59kZ+ScgEkZJyqlUWqSC7+kNv8AAAipt0BFQAqJUVolNuTkRSTbk5BQ5/vk53lRU2xt/g26C7YjBt0jKi7YjBtzn1kFnBGEpX3kjKIs4XbM8+8r35VTquF78M8/yuV78iHXhe/Hwzz+Pryvfn4AjBtjqmTneQIwbZKdZOfeUCME4OfWU595FWMJOFjKTlRdskm3JygBt/hNuoqG3TboKi7dNuKJVduld/INCEiKSEgvYi7dRUNubcFITbkZBSDbkZBaV9nPpKb+SMoLz7EnK7cQ6qdp1XK9+QOl39M4+vK7f4AgKdZNuoc+jn2kZNuKQSRknKBCV7WMpOVFSTbk5ADboCoCAgCiVVKgoAKSgI0gApQ26bdRpINuRlBSE25GVFINukZBZVmcrtwOqr2z1XK7cBWevK7f4AhUjJtwIEjK7cCCUjJOQVDbm3BUk26TkFQ24gAgAAolVSoKACiAKAIogCkBCgQEApCEAsiSoEiSoAigQIoECQAQSQSASACV7CvaCoICoAoCAqCVBoQBQAUQBSgUEUhCAUgRRpICAJVJAFSQBUEBUFCAgAgSAFSQQCQAQAABRFQBKqlQUAFEUAABdwgC7gjwECKm4AF3BuEIBa/efBuElQJ8G4RVDcG4RQNwbhBBY8G4QAjwbggA3BuBAVAFAAAQAABFSoKIoAAKIAoAKgAogIpCALIScgKyoCocgAACALAkAKgCgAAIACAoIAVCoAAKIAoIDQgCiAKCAoACoAKgAqACoAAABCAogCoAAACKgAACACiAKACiAKIoAACoAogCiKAIoAAAAAgCiAAAAICiAAACAAAAAAACgAAAoAAAAAAAAAAAAAAAAAAAIAAAAgAAAAA//9k=" alt="Logo" width="25" height="25" class="d-inline-block align-text-center rounded-circle userImage ">
                  ${user_name}
                </a>
          </div>
        </nav>
    <!-- <h5 class="card-title">Card title</h5> -->
    <p class="card-text">${doc.data().textcontent}</p>
    <p>${mediaUrl}</p>
    <p class="card-text"><small class="text-body-secondary">Last updated ${timeUpdated}</small></p>
    </div>
    <hr>
      `

      
    ;
    });
      
  } catch (error) {
    console.log(error, "user error");
  }
});





const postBtn = document.querySelector(".postbtn");

postBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const container = document.querySelector(".wrapp");
  window.location.href = "./dreamDrip_home.html";
});
 