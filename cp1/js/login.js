import { auth } from "./firebase_config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// ========================
// VALIDATION
// ========================
function validateEmail(email) {
  return email.includes("@");
}

function validatePassword(password) {
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return pattern.test(password);
}

// ========================
// SIGNUP
// ========================
const signupForm = document.getElementById("signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirmPassword").value;

    if (!validateEmail(email)) {
      alert("Email phải chứa '@'");
      return;
    }

    if (!validatePassword(password)) {
      alert("Mật khẩu phải ≥6 ký tự, gồm chữ HOA, thường và số.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Mật khẩu nhập lại không trùng!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("Đăng ký thành công!");
      })
      .catch((error) => {
        alert("Lỗi đăng ký: " + error.message);
      });
  });
}

// ========================
// LOGIN
// ========================
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!validateEmail(email)) {
      alert("Email phải chứa '@'");
      return;
    }

    if (!validatePassword(password)) {
      alert("Mật khẩu ≥6 ký tự, có chữ HOA, thường và số.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Đăng nhập thành công! Email: " + userCredential.user.email);
      })
      .catch(() => {
        alert("Sai email hoặc mật khẩu!");
      });
  });
}

// ========================
// BONUS: Google Login (advance +0.5)
// ========================
const googleBtn = document.getElementById("googleLogin");

if (googleBtn) {
  googleBtn.addEventListener("click", () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        alert("Google Login thành công! Email: " + result.user.email);
      })
      .catch((err) => {
        alert("Google Login lỗi: " + err.message);
      });
  });
}
