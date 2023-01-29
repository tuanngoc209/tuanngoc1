"use strict";

const inputFirstname = document.getElementById("input-firstname");
const inputLastname = document.getElementById("input-lastname");
const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const inputPasswordConfirm = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");

// 2. Chức năng Register
btnSubmit.addEventListener("click", function () {
  // lấy dữ liệu từ input
  const user = new User(
    inputFirstname.value,
    inputLastname.value,
    inputUsername.value,
    inputPassword.value
  );

  // Check validate
  const isValidate = validate(user);

  if (isValidate) {
    // thêm user vào mảng userArr
    userArr.push(user);
    // update dữ liệu xuống localstorage
    saveToStorage("userArr", userArr);

    alert("Đăng kí thành công");

    // chuyển sang trang Login
    window.location.assign("../pages/login.html");
  }
});

function validate(user) {
  let isValidate = true;

  // 1. không có trường nào để trống
  if (user.firstname.trim().length === 0) {
    alert("Vui lòng nhập First Name");
    isValidate = false;
  }
  if (user.lastname.trim().length === 0) {
    alert("Vui lòng nhập Last Name");
    isValidate = false;
  }
  if (user.username.trim().length === 0) {
    alert("Vui lòng nhập Username");
    isValidate = false;
  }

  // 2 input password không để trống
  if (user.password === "") {
    alert("Vui lòng nhập Password");
    isValidate = false;
  }
  if (inputPasswordConfirm.value === "") {
    alert("Vui lòng nhập Confirm Password");
    isValidate = false;
  }

  // không trùng user name
  for (let i = 0; i < userArr.length; i++) {
    if (userArr[i].username === user.username) {
      alert("User Name đã tồn tại");
      isValidate = false;
      break;
    }
  }

  // 2 pass phải giống nhau
  if (user.password != inputPasswordConfirm.value) {
    alert("Password và Confirm Password phải giống nhau");
    isValidate = false;
  }

  // pass có nhiều hơn 8 kí tự
  if (user.password.length <= 8) {
    alert("Password phải có nhiều hơn 8 kí tự");
    isValidate = false;
  }

  return isValidate;
}
