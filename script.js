"use strict";

const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const tableBodyEl = document.getElementById("tbody");
const healthyBtn = document.getElementById("healthy-btn");
const calculateBmiBtn = document.getElementById("calculate-bmi-btn");

// bắt sự kiện khi ấn vào typeInput lọc đúng DOG-CAT
typeInput.addEventListener("click", renderBreed);

function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";

  const breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");
  const breedCats = breedArr.filter((breedItem) => breedItem.type === "Cat");

  // nếu type là DOG
  if (typeInput.value === "Dog") {
    breedDogs.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });

    // nếu type là CAT
  } else if (typeInput.value === "Cat") {
    breedCats.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
}

// 1. Bắt sự kiện Click vào nút "Submit"
submitBtn.addEventListener("click", function () {
  // 1. Lấy dữ liệu từ các Form Input
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  // 4. Thêm thú cưng vào danh sách
  const validate = validateData(data); //gọi hàm validateData

  // nếu validate=true thì add vào mảng petArr
  if (validate) {
    petArr.push(data); // add data vừa nhập vào mảng
    saveToStorage("petArr", petArr);
    renderTableData(petArr); // gọi hàm hiển thị 5.
    clearInput(); // gọi hàm xóa dữ liệu input 6.
  }
});

// 6. Xóa các dữ liệu nhập trong Form Input
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "black";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

renderTableData(petArr); // ban đầu mở lên sẽ hiện được các object đã add vào mảng trong code

// 5. Hiển thị danh sách thú cưng
function renderTableData(petArr) {
  tableBodyEl.innerHTML = ""; // xóa nội dung hiện có của bảng

  petArr.forEach((element) => {
    const row = document.createElement("tr"); // tạo 1 thẻ tr
    row.innerHTML = `
      <th scope="row">${element.id}</th>
      <td>${element.name}</td>
      <td>${element.age}</td>
      <td>${element.type}</td>
      <td>${element.weight} kg</td>
      <td>${element.length} cm</td>
      <td>${element.breed}</td>
      <td>
        <i class="bi bi-square-fill" style="color: ${element.color}"></i>
      </td>
      <td><i class="bi ${
        element.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td><i class="bi ${
        element.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
      <td><i class="bi ${
        element.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>      
      <td>${displayTime(element.date).slice(8, 10)} / ${displayTime(
      element.date
    ).slice(5, 7)} / ${displayTime(element.date).slice(0, 4)}</td>
      <td>
      <button class="btn btn-danger" onclick="deletePet('${
        element.id
      }')">Delete</button>
  </td>    `;
    tableBodyEl.appendChild(row);
    //${displayTime} / ${petArr[i].date.getMonth()} / ${petArr[    i    ].date.getFullYear()}
  });
}

// Hàm hiển thị thời gian
function displayTime(date) {
  if (typeof date === "string") {
    return date;
  } else if (typeof date === "object") {
    return JSON.parse(JSON.stringify(date));
  }
}

// 7. Xóa một thú cưng
function deletePet(petId) {
  const isDeleted = confirm("Are you sure?"); //người dùng ấn ok: isDeleted trả về true
  if (isDeleted) {
    // thực hiện xóa
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        // xóa khỏi mảng
        petArr.splice(i, 1);
        // cập nhật local storage
        saveToStorage("petArr", petArr);
        // gọi hàm hiển thị
        renderTableData(petArr); // sau khi xóa cần gọi lại hàm này để xóa nội dung cũ đang hiển thị + cập nhật mới mảng hiện tại
        break;
      }
    }
  }
}

// 8. Hiển thị các thú cưng khỏe mạnh
let healthyCheck = true; //biến toàn cục lưu trạng thái hiển thị của danh sách bảng
healthyBtn.addEventListener("click", function () {
  if (healthyCheck === true) {
    // lần đầu chạy vào if sẽ lọc ra các thú cưng khỏe mạnh
    const healthyPetArr = []; // tạo mảng chứa các thú cưng khỏe mạnh
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        healthyPetArr.push(petArr[i]);
      }
    }
    renderTableData(healthyPetArr);
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = false;
  } else {
    // lần sau do healthyCheck bị đổi thành false nên sẽ chạy vào else
    renderTableData(petArr);
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = true;
  }
});

// 3. Validate-xác thực dữ liệu
function validateData(data) {
  let isValidate = true;
  if (data.id.trim() === "") {
    alert("Please provide ID");
    isValidate = false;
  }

  // kiểm tra ID có duy nhất hay không
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must unique!");
      isValidate = false;
      break;
    }
  }

  if (data.name.trim() === "") {
    alert("Please provide name");
    isValidate = false;
  }
  if (isNaN(data.age)) {
    alert("Please provide age");
    isValidate = false;
  }
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    isValidate = false;
  }
  if (data.type.trim() === "Select Type") {
    alert("Please choose type");
    isValidate = false;
  }
  if (isNaN(data.weight)) {
    alert("Please choose weight");
    isValidate = false;
  }
  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    isValidate = false;
  }
  if (isNaN(data.length)) {
    alert("Please choose length");
    isValidate = false;
  }
  if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    isValidate = false;
  }

  if (data.breed.trim() === "Select Breed") {
    alert("Please choose breed");
    isValidate = false;
  }

  return isValidate;
}
