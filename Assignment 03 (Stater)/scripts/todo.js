"use strict";

if (currentUser) {
  const todoList = document.getElementById("todo-list");
  const btnAdd = document.getElementById("btn-add");
  const inputTask = document.getElementById("input-task");

  displayTodoList();

  // b. Hiển thị các Task
  // hàm hiển thị thông tin todoList
  function displayTodoList() {
    let html = "";

    // từ mảng todoArr lọc ra các task của currentUser
    todoArr
      .filter((todo) => todo.owner === currentUser.username)
      .forEach((todo) => {
        html += `
        <li class=${todo.isDone ? "checked" : ""}>${
          todo.task
        }<span class="close">×</span></li>
        `;
      });

    todoList.innerHTML = html;

    // bắt các sự kiện
    eventToggleTasks();
    eventDeleteTasks();
  }

  // a. Thêm mới Todo và Lưu dữ liệu vào LocalStorage
  btnAdd.addEventListener("click", function () {
    // kiểm tra xem input đc nhập chưa
    if (inputTask.value.trim().length === 0) {
      alert("Vui lòng nhập nhiệm vụ");
    } else {
      const todo = new Task(inputTask.value, currentUser.username, false);

      // thêm task mới vào mảng todoArr
      todoArr.push(todo);
      // lưu dữ liệu xuống localStorage
      saveToStorage("todoArr", todoArr);
      // hiển thị lại list các task
      displayTodoList();
      //    reset dữ liệu từ form nhập
      inputTask.value = "";
    }
  });

  // c. Toggle Task
  // hàm thay đổi trạng thái công việc khi kích vào
  function eventToggleTasks() {
    // lấy tất cả li nằm trong #todo-list
    document.querySelectorAll("#todo-list li").forEach((liEl) => {
      liEl.addEventListener("click", (e) => {
        // tránh nút delete: html li có 1 con là span
        if (e.target !== liEl.children[0]) {
          // toggle-chuyển đổi class checked - thêm trong HTML
          liEl.classList.toggle("checked");
          // tìm task vừa click vào (toggle) - tìm trong mảng ở code javascript do lúc click chỉ là tác động HTML
          const todo = todoArr.find(
            (todoItem) =>
              todoItem.owner === currentUser.username &&
              todoItem.task === liEl.textContent.slice(0, -1) // lấy nội dung text, loại bỏ x
          );
          // sau đó thay đổi thuộc tính isDone
          todo.isDone = liEl.classList.contains("checked") ? true : false;
          // cập nhật localStorage
          saveToStorage("todoArr", todoArr);
        }
      });
    });
  }

  // d. Delete Task
  //   hàm bắt sự kiện xóa các task
  function eventDeleteTasks() {
    // lấy tất cả nút Delete: bắt sự kiện nút
    document.querySelectorAll("#todo-list .close").forEach(function (closeEl) {
      closeEl.addEventListener("click", function () {
        // hỏi xác nhận xóa
        const isDelete = confirm("Bạn chắc chắn muốn xóa chứ?");

        if (isDelete) {
          // tìm vị trí task bị ấn xóa trong mảng todoArr
          const index = todoArr.findIndex(
            (item) =>
              item.owner === currentUser.username &&
              item.task === closeEl.parentElement.textContent.slice(0, -1)
          );

          // xóa task ra khỏi todoArr
          todoArr.splice(index, 1);
          // cập nhật storage
          saveToStorage("todoArr", todoArr);

          // hiển thị lại list todo
          displayTodoList();
        }
      });
    });
  }
} else {
  alert("Vui lòng đăng nhập để xem");
  window.location.assign("../index.html");
}
