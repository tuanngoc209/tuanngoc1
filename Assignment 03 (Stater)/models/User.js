"use strict";

// 1. Tạo Class User
class User {
  constructor(
    firstname,
    lastname,
    username,
    password,
    //
    pageSize = 10,
    category = "business"
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
    //
    this.pageSize = pageSize;
    this.category = category;
  }
}

// chứa các thông tin về Task trong Todo List
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
