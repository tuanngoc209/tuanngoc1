"use strict";

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
const formEl = document.getElementById("container-form");
const submitBtn = document.getElementById("submit-btn");

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
      <button class="btn btn-danger" onclick="editPet('${
        element.id
      }')">Edit</button>
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

//////////////////////////////////
// hàm sửa dữ liệu thông tin thú cưng
function editPet(id) {
  // hiện lên form nhập
  formEl.classList.remove("hide");

  // tìm đến dữ liệu thú cưng cần edit
  const pet = petArr.find((petItem) => petItem.id === id);

  // hiển thị những thông tin lên form nhập
  idInput.value = id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;

  // hiển thị đúng Breed cho từng loại DOG-CAT
  renderBreed();
  // hiển thị breed-trước khi edit
  breedInput.value = `${pet.breed}`;
}

// hàm hiện đúng breed theo DOG-CAT
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

/////////////////////////////////////////
// Sự kiện nút Submit
submitBtn.addEventListener("click", function () {
  // lấy dữ liệu từ form
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
    //date: new Date(),
  };

  // gọi hàm xác thực Validate
  const isValidate = validateData(data);

  if (isValidate) {
    //
    const index = petArr.findIndex((pet) => pet.id === data.id);

    // vẫn giữ nguyên Ngày thú cưng như cũ
    data.date = petArr[index].date;

    // cập dữ liệu thú cưng đó
    petArr[index] = data;
    saveToStorage("petArr", petArr);

    // ẩn form và hiện bảng dữ liệu
    formEl.classList.add("hide");
    renderTableData(petArr);
  }
});

// Validate-xác thực dữ liệu
function validateData(data) {
  let isValidate = true;
  if (data.id.trim() === "") {
    alert("Please provide ID");
    isValidate = false;
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
