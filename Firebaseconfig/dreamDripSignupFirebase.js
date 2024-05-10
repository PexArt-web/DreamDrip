// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  TwitterAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  collection, 
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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
const usernameRef = collection(db, "Blog_users_username");
const provider = new GithubAuthProvider();

/** Git sign in */
const gitBtn = document.querySelector(".gitBtn");
gitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    gitBtn.disabled = true
    const gitAuth = await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        console.log(user, "user details");
        console.log(result, "git result");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        const body = document.querySelector('body')
        body.classList.add('bg-dark')
        body.innerHTML = ``
        body.innerHTML = `
        <div class="container-fluid bg-dark usernameWrapper slide-in-right">
        <p class = 'account-alert'>
      </p>
      <div class="user_name d-grid justify-content-center mt-3 mb-4">
        <p class="text-center text-light">Set Up your Username</p>
        <input type="text" class="user text-danger text-center">
        <div class="d-grid col-6 mx-auto mt-2">
          <button class="btn btn-danger nextBtn" type="click">Next</button>
          
        </div>
      </div>
    </div> 
        `

        // ///
        const nextBtn = document.querySelector(".nextBtn");
        onAuthStateChanged(auth, (user) => {
          if (user) {
            nextBtn.addEventListener
            ("click", async (e) => {
              e.preventDefault();
              nextBtn.disabled = true
              const userInput = document.querySelector('.user')
              if (userInput.value == '' ) {
              return
              }
              nextBtn.innerHTML = `<div class="spinner-border text-light" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>`; 
              const username = document.querySelector(".user").value;
              const docRef = doc(usernameRef, user.uid);
              try {
                const verify_email = await sendEmailVerification(auth.currentUser)
                .then(()=>{console.log('email sent');})
                .catch((error)=>{
                  console.log(error);
                })
                const createNewDoc = await setDoc(docRef, {
                  username,
                });

                const account_Alert = document.querySelector('.account-alert')
                  account_Alert.innerHTML = ` <div class="alert alert-success" role="alert">
                  Account Creation Successful, we're redirecting you to sign-in page to ensure security of your account, Please verify your email and start exploring our services, Welcome Aboard!
                </div>`
                setTimeout(()=>{
                  window.location.href = `../index.html`
                },6000)
               
              } catch (error) {
                console.log(error);
              } finally {
                console.log("saved");
                nextBtn.innerHTML = `Next`;
                nextBtn.disabled = false
              }
            });
          }
        });

      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        console.log(error, "git");
        console.log(credential, "credential");
        // ...
      });
  } catch (error) {
    console.log(error);
  }finally{
    gitBtn.disabled = false
  }
});

// Twitter sign in

const twitter_provider = new TwitterAuthProvider();

const twitterBtn = document.querySelector(".twitterBtn");

twitterBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    twitterBtn.disabled = true
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
        const body = document.querySelector('body')
        body.classList.add('bg-dark')
        body.innerHTML = ``
        body.innerHTML = `
        <div class="container-fluid bg-dark usernameWrapper slide-in-right">
        <p class = 'account-alert'>
      </p>
      <div class="user_name d-grid justify-content-center mt-3 mb-4">
        <p class="text-center text-light">Set Up your Username</p>
        <input type="text" class="user text-danger text-center">
        <div class="d-grid col-6 mx-auto mt-2">
          <button class="btn btn-danger nextBtn" type="click">Next</button>
          
        </div>
      </div>
    </div> 
        `

        // ///
        const nextBtn = document.querySelector(".nextBtn");
        onAuthStateChanged(auth, (user) => {
          if (user) {
            nextBtn.addEventListener("click", async (e) => {
              e.preventDefault();
              nextBtn.disabled = true
              const userInput = document.querySelector('.user')
              if (userInput.value == '' ) {
              return
              }
              nextBtn.innerHTML = `<div class="spinner-border text-light" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>`;
              const username = document.querySelector(".user").value;
              const docRef = doc(usernameRef, user.uid);
              try {
                const verify_email = await sendEmailVerification(auth.currentUser)
                .then(()=>{console.log('email sent');})
                .catch((error)=>{
                  console.log(error);
                })
                const createNewDoc = await setDoc(docRef, {
                  username,
                });
                const account_Alert = document.querySelector('.account-alert')
                  account_Alert.innerHTML = ` <div class="alert alert-success" role="alert">
                  Account Creation Successful, we're redirecting you to sign-in page to ensure security of your account, Please verify your email and start exploring our services, Welcome Aboard!
                </div>`
                setTimeout(()=>{
                  window.location.href = `../index.html`
                },6000)
               
              } catch (error) {
                console.log(error);
              } finally {
                console.log("saved");
                nextBtn.innerHTML = `Next`;
                nextBtn.disabled = false
                userInput.disabled = false
              }
            });
          }
        });

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
    twitterBtn.disabled = false
  }
});

/** Sign in With Google */

const googleBtn = document.querySelector(".google");
const google_provider = new GoogleAuthProvider();

googleBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    googleBtn.disabled = true
    const google_signIn = await signInWithPopup(auth, google_provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(result, "result");
        console.log(user, "user");
        const body = document.querySelector('body')
        body.classList.add('bg-dark')
        body.innerHTML = ``
        body.innerHTML = `
        <div class="container-fluid bg-dark usernameWrapper slide-in-right">
        <p class = 'account-alert'>
      </p>
      <div class="user_name d-grid justify-content-center mt-3 mb-4">
        <p class="text-center text-light">Set Up your Username</p>
        <input type="text" class="user text-danger text-center">
        <div class="d-grid col-6 mx-auto mt-2">
          <button class="btn btn-danger nextBtn" type="click">Next</button>
          
        </div>
      </div>
    </div> 
        `
        const nextBtn = document.querySelector(".nextBtn");
        onAuthStateChanged(auth, (user) => {
          if (user) {
            nextBtn.addEventListener("click", async (e) => {
              e.preventDefault();
              nextBtn.disabled = true
              const userInput = document.querySelector('.user')
              if (userInput.value == '' ) {
              return
              }
              userInput.disabled = true
              nextBtn.innerHTML = `<div class="spinner-border text-light" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>`;
              const username = document.querySelector(".user").value;
              const docRef = doc(usernameRef, user.uid);
              try {
                const verify_email = await sendEmailVerification(auth.currentUser)
                .then(()=>{console.log('email sent');})
                .catch((error)=>{
                  console.log(error);
                })
                const createNewDoc = await setDoc(docRef, {
                  username,
                });
                const account_Alert = document.querySelector('.account-alert')
                  account_Alert.innerHTML = ` <div class="alert alert-success" role="alert">
                  Account Creation Successful, we're redirecting you to sign-in page to ensure security of your account, Please verify your email and start exploring our services, Welcome Aboard!
                </div>`
                setTimeout(()=>{
                  window.location.href = `../index.html`
                },6000)
               
              } catch (error) {
                console.log(error);
              } finally {
                console.log("saved");
                nextBtn.innerHTML = `Next`;
                nextBtn.disabled = false
                userInput.disabled = false
              }
            });
          }
        });

      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error, "error");
        // ...
      });
  } catch (error) {
  }finally{
    googleBtn.disabled = false
  }
});


/*sign in Email and Password*/
const emailAndpasswordWrapper = document.querySelector('.emailAndPasswordWrap')
emailAndpasswordWrapper.innerHTML = ''
const emailBtn = document.querySelector('.emailBtn')
emailBtn.addEventListener('click',(e)=>{
e.preventDefault()
emailBtn.style.display = 'none'
emailAndpasswordWrapper.innerHTML = `
<button type="button" class="btn btn-danger mb-2 backDanger">Back</button>
<div class="form-floating mb-3">
<input type="email" class="form-control email" id="floatingInput" placeholder="name@example.com">
<label for="floatingInput">Email address</label>
</div>
<div class="form-floating">
<input type="password" class="form-control password" id="floatingPassword" placeholder="Password">
<label for="floatingPassword">Password</label>
</div>
<button type="button" class="btn btn-secondary d-grid mt-3 mx-auto emailSignup justify-content-center">Sign Up</button>
<hr class="divider"> 
`
const backBtn = document.querySelector('.backDanger')
backBtn.addEventListener('click',async(e)=>{
    e.preventDefault()
    emailAndpasswordWrapper.innerHTML = ''
    emailBtn.style.display = 'block'
})

/** signIn Operation */

const emailsignUpBtn = document.querySelector(".emailSignup");
emailsignUpBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.querySelector(".email").value;
  const password = document.querySelector(".password").value;
  console.log(email, password, "new setup");

  if (email == "" || password == "") {
    return;
  }
  emailsignUpBtn.disabled = true;
  emailsignUpBtn.innerHTML = `
  <div class="spinner-border text-light" role="status">
  <span class="visually-hidden">Loading...</span>
  </div>`;
  try {
    const creatUserTask = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const verify_email = await sendEmailVerification(auth.currentUser)
                .then(()=>{console.log('email sent');})
                .catch((error)=>{
                  console.log(error);
                })
    .then((userCredential) => {
      // const user = userCredential.user
      console.log(userCredential);
      console.log('logged in');
      
      const body = document.querySelector('body')
      body.classList.add('bg-dark')
      // usernameWrapper.style.display = "block";
      // wrapper.style.display = "none";
      body.innerHTML = ''
      body.innerHTML = `<div class="container-fluid bg-dark   usernameWrapper slide-in-right">
      <p class = 'account-alert'>
      </p>
      <div class="user_name d-grid justify-content-center mt-3 mb-4">
        <p class="text-center text-light">Set Up your Username</p>
        <input type="text" class="user text-danger text-center">
        <div class="d-grid col-6 mx-auto mt-2">
          <button class="btn btn-danger nextBtn" type="click">Next</button>
          
        </div>
      </div>
    </div>  `

    // /////
    const nextBtn = document.querySelector(".nextBtn");
    onAuthStateChanged(auth, (user) => {
      if (user) {
        nextBtn.addEventListener("click", async (e) => {
          e.preventDefault();
          nextBtn.disabled = true
          // const userInput = document.querySelector('.user')
          const userInput = document.querySelector('.user')
              if (userInput.value == '' ) {
              return
              }
              userInput.disabled = true
          nextBtn.innerHTML = `<div class="spinner-border text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>`;
          const username = document.querySelector(".user").value;
          const docRef = doc(usernameRef, user.uid);
          try {
            const createNewDoc = await setDoc(docRef, {
              username,
            });

            const account_Alert = document.querySelector('.account-alert')
                  account_Alert.innerHTML = ` <div class="alert alert-success" role="alert">
                  Account Creation Successful, we're redirecting you to sign-in page to ensure security of your account, Please verify your email and start exploring our services, Welcome Aboard!
                </div>`
                setTimeout(()=>{
                  window.location.href = `../index.html`
                },6000)
               
          } catch (error) {
            console.log(error);
          } finally {
            console.log("saved");
            nextBtn.innerHTML = `Next`;
            nextBtn.disabled = false
            userInput.disabled = false
          }
        });
      }
    });
    });
  } catch (error) {
    console.log(error);
  } finally {
    emailsignUpBtn.innerHTML = `Sign up`;
    emailsignUpBtn.disabled = false;
  }
});


})



//


