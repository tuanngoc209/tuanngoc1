"use strict";

// 9. Thay đổi thiết lập
if (currentUser) {
  const inputPageSize = document.getElementById("input-page-size");
  const inputCategory = document.getElementById("input-category");
  const btnSubmit = document.getElementById("btn-submit");

  btnSubmit.addEventListener("click", function () {
    if (validate()) {
      // cập nhật lại currentUser
      currentUser.pageSize = Number.parseInt(inputPageSize.value);
      currentUser.category = inputCategory.value;
      saveToStorage("currentUser", currentUser);

      // cập nhật lại mảng userArr
      const index = userArr.findIndex(
        (userItem) => userItem.username === currentUser.username
      );
      userArr[index] = currentUser;
      saveToStorage("userArr", userArr);

      // reset lại form nhập
      alert("Cài đặt thành công");
      inputPageSize.value = "";
      inputCategory.value = "";
    }
  });

  function validate() {
    let isValidate = true;

    // kiểm tra inputPageSize
    if (Number.isNaN(Number.parseInt(inputPageSize.value))) {
      alert("News per page không hợp lệ");
      isValidate = false;
    }

    // kiểm tra inputCategory
    if (inputCategory.value === "") {
      alert("Vui lòng nhập News Category");
      isValidate = false;
    }

    return isValidate;
  }
} else {
  alert("Vui lòng đăng nhập để cài đặt");
  window.location.assign("../index.html");
}
