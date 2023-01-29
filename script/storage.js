"use strict";

// 1. Bổ sung Animation cho Sidebar
const nacEl = document.getElementById("sidebar");
nacEl.addEventListener("click", function () {
  this.classList.toggle("active");
});

// add 2 object thú cưng mẫu vào mảng petArr
const data1 = {
  id: "P001",
  name: "Tom",
  age: 3,
  type: "Cat",
  weight: 5,
  length: 50,
  color: "green",
  breed: "Tabby",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  date: new Date(),
};

const data2 = {
  id: "P002",
  name: "Tyke",
  age: 5,
  type: "Dog",
  weight: 3,
  length: 40,
  color: "black",
  breed: "Mixed Breed",
  vaccinated: false,
  dewormed: true,
  sterilized: false,
  date: new Date(),
};

// dữ liệu breed để test ban đầu không cần nhập
const breed1 = {
  breed: "Mixed Breed",
  type: "Dog",
};

const breed2 = {
  breed: "Tabby",
  type: "Cat",
};

const breed3 = {
  breed: "Chó Phú Quốc",
  type: "Dog",
};

const breed4 = {
  breed: "Mèo mướp",
  type: "Cat",
};

// 2. Lưu dữ liệu dưới LocalStorage

////////////////////////////////
// Lấy dữ liệu petArr
if (!getFromStorage("petArr")) {
  // nếu arr rỗng/k tồn tại->null->false: !false->true: add dữ liệu vào petArr
  // gán dữ liệu để test
  saveToStorage("petArr", [data1, data2]);
}
const petArr = getFromStorage("petArr");

////////////////////////////////////
// lấy dữ liệu breedArr
if (!getFromStorage("breedArr")) {
  // gán dữ liệu để test
  saveToStorage("breedArr", [breed1, breed2, breed3, breed4]);
}
const breedArr = getFromStorage("breedArr");

////////////////////////////////////
// Hàm lấy dữ liệu: parse phân tích cú pháp: [...]
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

////////////////////////////////////
// Hàm lưu dữ liệu: đang có dấu ngoặc vuông sẽ giữ nguyên '[...]'
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
