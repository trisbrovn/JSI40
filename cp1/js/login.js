import { auth, db } from "./firebase_config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  or,
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

import { User } from "./entities.js";
function validateEmail(email) {
  return email.includes("@");
}

function validatePassword(password) {
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return pattern.test(password);
}

const signupForm = document.getElementById("signup-form");

function validateSignupForm(email, username, password, confirmPassword) {
  if (username.length < 6) {
    alert("Tên người dùng phải có 6 kí tự trở lên.");
    return false;
  }
  if (username.includes(" ")) {
    alert("Tên người dùng không được có dấu cách.");
    return false;
  }

  if (!validateEmail(email)) {
    alert("Email không hợp lệ! Phải chứa ký tự '@'");
    return false;
  }

  if (!validatePassword(password)) {
    alert("Mật khẩu phải ≥6 ký tự, gồm chữ hoa, thường và số.");
    return false;
  }

  if (password !== confirmPassword) {
    alert("Mật khẩu nhập lại không trùng khớp.");
    return false;
  }

  return true;
}

if (signupForm) {
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("signupUsername");
    const email = document.getElementById("signupEmail");
    const password = document.getElementById("signupPassword");
    const confirmPassword = document.getElementById("signupConfirmPassword");

    if (
      validateSignupForm(
        email.value,
        username.value,
        password.value,
        confirmPassword.value
      )
    ) {
      const q = query(
        collection(db, "users"),
        or(
          where("username", "==", username.value),
          where("email", "==", email.value)
        )
      );

      let isDuplicated = false;
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        isDuplicated = true;
      });

      if (isDuplicated) {
        alert("Email hoặc Username đã tồn tại! Vui lòng đăng nhập.");
        return;
      }

      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then(async (userCredential) => {
          const user = userCredential.user;

          const newUser = new User(username.value, email.value, user.uid);

          const docRef = await addDoc(
            collection(db, "users"),
            newUser.toObject()
          );
          console.log("Document written with ID: ", docRef.id);

          localStorage.setItem("currentUser", user.uid);

          alert("Đăng ký thành công!");
          location.href = "#";
        })
        .catch((error) => {
          console.error("Signup error:", error.message);
        });
    }
  });
}

const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail");
    const password = document.getElementById("loginPassword");

    if (!validateEmail(email.value)) {
      alert("Email phải chứa ký tự '@'");
      return;
    }

    if (!validatePassword(password.value)) {
      alert("Mật khẩu phải ≥6 ký tự, có chữ hoa, thường và số.");
      return;
    }

    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;

        localStorage.setItem("currentUser", user.uid);

        alert("Đăng nhập thành công!");
      })
      .catch((error) => {
        alert("Sai email hoặc mật khẩu!");
        console.error("Login error:", error.message);
      });
  });
}