"use strict";

const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");

const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");

displayHome();

// 4. Home Page
function displayHome() {
  //  nếu có người login thì ẩn loginModal và hiện mainContent
  if (currentUser) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    // thêm thông báo welcome
    welcomeMessage.textContent = `Welcome ${currentUser.firstname}`;

    // nếu chưa ai đăng nhập thì hiện loginModal
  } else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}

// 5. Chức năng Logout
btnLogout.addEventListener("click", function () {
  const isLogout = confirm("Bạn chắc chắn muốn Logout?");
  if (isLogout) {
    // gán currentUser trạng thái null
    currentUser = null;
    // update storage
    saveToStorage("currentUser", currentUser);
    // hiển thị trang hôm chưa có login
    displayHome();
  }
});
