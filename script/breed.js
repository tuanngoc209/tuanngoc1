"use strict";

const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const btnSubmit = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

// hiển thị danh sách
renderTableBreed(breedArr);

// Bắt sự kiện vào nút submit
btnSubmit.addEventListener("click", function () {
  // lấy dữ liệu từ form
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };

  // validate dữ liệu
  const isValidate = validate(data);

  if (isValidate) {
    // thêm dữ liệu vào mảng các breed
    breedArr.push(data);
    // cập nhật dữ liệu
    saveToStorage("breedArr", breedArr);

    // hiển thị lại bảng
    renderTableBreed(breedArr);

    // xóa thông tin từ input form
    deleteForm();
  }
});

function validate(data) {
  let isValidate = true;

  // nếu để trống hoặc khoảng trắng thì báo lỗi
  if (breedInput.value.trim().length === 0) {
    alert("Please input for breed !");
    isValidate = false;
  }

  // bắt lỗi phải chọn Type
  if (data.type === "Select Type") {
    alert("Please select Type!");
    isValidate = false;
  }
  return isValidate;
}

// Hàm xóa nội dung form input
function deleteForm() {
  breedInput.value = "";
  typeInput.value = "Select Type";
}

// Hàm hiển thị lên bảng
function renderTableBreed() {
  tableBodyEl.innerHTML = "";

  // mỗi loại breed ta sẽ thêm 1 row vào bảng
  breedArr.forEach((breedItem, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td scope="col">${index + 1}</td>
    <td scope="col">${breedItem.breed}</td>
    <td scope="col">${breedItem.type}</td>
    <td>
    <button type="button" class="btn btn-danger" onclick="deleteBreed('${
      breedItem.breed
    }')">Delete</button></td>
    `;

    tableBodyEl.appendChild(row);
  });
}

// Hàm xóa
function deleteBreed(breed) {
  // Xác nhận xóa
  const isDelete = confirm("Are you sure?");

  if (isDelete) {
    // thực hiện bước xóa ở đây
    for (let i = 0; i < breedArr.length; i++) {
      if (breed === breedArr[i].breed) {
        // xóa khỏi mảng
        breedArr.splice(i, 1);
        // cập nhật dữ liệu local storage
        saveToStorage("breedArr", breedArr);
        // gọi lại hàm hiển thị
        renderTableBreed(breedArr);
        break;
      }
    }
  }
}
