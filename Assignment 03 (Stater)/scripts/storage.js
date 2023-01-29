"use strict";

// hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// -------------- danh sách user -------------------------------------------
// lấy dữ liệu userArr từ LocalStorage
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];
// console.log(users);

// chuyển đổi obj -> Class Instance
const userArr = users.map((user) => parseUser(user));
// trả về 1 mảng chứa các instance của class user
// console.log(userArr);

// -------------- todoList --------------------------------------------------
// lấy dữ liệu user đang đăng nhập
let currentUser = getFromStorage("currentUser")
  ? parseUser(getFromStorage("currentUser"))
  : null;

// lấy dữ liệu todoArr từ localStorage
const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];
// chuyển đổi obj -> Class Instance
const todoArr = todos.map((todo) => parseTask(todo));

// Hàm: chuyển từ JS Object sang Class Instance
function parseUser(userData) {
  const user = new User(
    userData.firstname,
    userData.lastname,
    userData.username,
    userData.password,
    //
    userData.pageSize,
    userData.category
  );
  return user;
}

// Hàm: chuyển từ JS Object sang Class Instance của task Class
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}

const user1 = {
  firstname: "Tôm",
  lastname: "Nguyễn",
  username: "tom",
  password: "123456789",
  //
  pageSize: 3,
  category: "business",
};

const user3 = new User(
  "Hổ",
  "Lò Văn",
  "ho",
  "123456789",
  //
  3,
  "business"
);

const user2 = {
  firstname: "Gà",
  lastname: "Nguyễn",
  username: "ga",
  password: "123456789",
  //
  pageSize: 2,
  category: "science",
};

saveToStorage("userArr", [user1, user2, user3]);

const task1 = {
  task: "đi học",
  owner: "ga",
  isDone: true,
};

const task2 = {
  task: "đi ngủ abc",
  owner: "ga",
  isDone: false,
};

const task3 = {
  task: "đi ngủ ok ok ok",
  owner: "ga",
  isDone: true,
};

const task4 = {
  task: "đi chơi",
  owner: "tom",
  isDone: false,
};

const task5 = {
  task: "lái xe máy",
  owner: "tom",
  isDone: false,
};

const task6 = {
  task: "nấu cơm rửa bát",
  owner: "tom",
  isDone: true,
};

saveToStorage("todoArr", [task1, task2, task3, task4, task5, task6]);
