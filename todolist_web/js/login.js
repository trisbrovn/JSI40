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
signupForm.addEventListener("submit", (e) => {
  // -------------------------------
  // validate form
  const username = signupForm.getElementById("signup-username");
  const email = signupForm.getElementById("signup-email");
  const password = signupForm.getElementById("signup-password");
  const confirmPassword = signupForm.getElementById("signup-confirm-password");
  if (
    !validateSignupForm(
      username.value,
      email.value,
      password.value,
      confirmPassword.value
    )
  ) {
    // -------------------------------
    // create account with firebase
  }
});
