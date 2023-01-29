"use strict";
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const findBtn = document.getElementById("find-btn");
const tableBodyEl = document.getElementById("tbody");
const formEl = document.getElementById("container-form");

renderTableData(petArr); // ban đầu mở lên sẽ hiện được các object đã add vào mảng trong code

findBtn.addEventListener("click", function () {
  let petArrFind = petArr;

  if (idInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value));
  }

  if (nameInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.name.includes(nameInput.value));
  }

  if (typeInput.value !== "Select Type") {
    petArrFind = petArrFind.filter((pet) => pet.type === typeInput.value);
  }

  if (breedInput.value !== "Select Breed") {
    petArrFind = petArrFind.filter((pet) => pet.breed === breedInput.value);
  }

  if (vaccinatedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
  }

  if (dewormedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
  }

  if (sterilizedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
  }

  renderTableData(petArrFind);
});

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
       `;
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

// gọi hàm hiển thị tất cả breed
renderBreed();

function renderBreed() {
  breedArr.forEach(function (breedItem) {
    const option = document.createElement("option");
    option.innerHTML = `${breedItem.breed}`;
    breedInput.appendChild(option);
  });
}
