import { auth, db } from "./firebase_config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  or,
  getDoc,
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
import { User } from "./entities.js";

// ================================================
// login

// ================================================
// signup
const signupForm = document.getElementById("signup-form");
function validateSignupForm(email, username, password, confirmPassword) {
  // username >= 6 +no space
  if (username.length < 6) {
    alert("Ten người dùng phải có ít nhất 6 ký tự.");
    return false;
  }
  if (username.includes(" ")) {
    alert("Tên người dùng không được dùng dấu cách.");
    return false;
  }
  if (password < 6) {
    alert("Mật khẩu phải có ít nhất 6 ký tự.");
    return false;
  }
  // pass == confirmPassword
  if (password !== confirmPassword) {
    alert("Mật khẩu xác nhận không khớp.");
    return false;
  }
  return true;
}
signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  // -------------------------------
  // validate form
  const username = document.getElementById("signupUsername");
  const email = document.getElementById("signupEmail");
  const password = document.getElementById("signupPassword");
  const confirmPassword = document.getElementById("signupConfirmPassword");
  if (
    validateSignupForm(
      username.value,
      email.value,
      password.value,
      confirmPassword.value
    )
  ) {
    // -------------------------------
    // kiem tra không dc trung email + username cu
    // su dung
    const q = query(
      collection(db, "users"),
      or(
        where("username", "==", username.value),
        where("email", "==", email.value)
      )
    );
    let isDuplicate = false;
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      // neu trung -> khong lam tiep
      isDuplicate = true;
    });
    if (isDuplicate) {
      alert("Email hoặc tên người dùng đã được sử dụng.");
      return; // dung ham ko lam them
    }

    // -------------------------------
    // create account with firebase auth
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;

        // -------------------------------
        // create account with firebase firestore
        const newUser = new User(username.value, email.value , user.uid);

        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "users"), newUser.toObject());
        console.log("Document written with ID: ", docRef.id);
        // luu vao localstorage
        localStorage.setItem("currentUser", user.uid);
        // thong bao dang ki thanh cong -> chuyen sang home
        alert("Đăng ký thành công!");
        location.href = "../index.html";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
        console.error(errorMessage);
      });
  }
});
