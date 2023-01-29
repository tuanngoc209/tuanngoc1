"use strict";

const inputUsername = document.getElementById("input-username");
const inputPassword = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");

// 3. Chức năng Login
btnSubmit.addEventListener("click", function () {
  // kiểm tra người dùng nhập đủ username và pass chưa
  const isValidate = validate();
  if (isValidate) {
    //  tìm kiếm thông tin username và pass đúng hay k
    const user = userArr.find(
      (item) =>
        item.username === inputUsername.value &&
        item.password === inputPassword.value
    );

    if (user) {
      //alert("Đăng nhập thành công");
      // lưu thông tin user hiện tại đang đăng nhập
      saveToStorage("currentUser", user);
      // chuyển về home
      window.location.assign("../index.html");
    } else {
      alert("Tài khoản không đúng, vui lòng thử lại");
    }
  }
});

// hàm validate kiểm tra input
function validate() {
  let isValidate = true;
  if (inputUsername.value === "") {
    alert("Vui lòng nhập Username");
    isValidate = false;
  }

  if (inputPassword.value === "") {
    alert("Vui lòng nhập Password");
    isValidate = false;
  }

  return isValidate;
}
