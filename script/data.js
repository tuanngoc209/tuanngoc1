"use strict";

const btnExport = document.getElementById("export-btn");
const btnImport = document.getElementById("import-btn");
const fileInput = document.getElementById("input-file");

////////////////////////////////////
// bắt sự kiện nút Export
btnExport.addEventListener("click", function () {
  const isExport = confirm("Bạn xác nhận chắc chắn Export?");
  if (isExport) {
    saveStaticDataToFile();
  }
});

////////////////////////////////////
// Hàm lưu dữ liệu xuống file
function saveStaticDataToFile() {
  // tạo dữ liệu lưu xuống file
  const blob = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)], {
    type: "application/json",
  });

  // lưu file
  saveAs(blob, "petData.json");
}

/////////////////////////////////////////
// bắt sự kiện nút Import
btnImport.addEventListener("click", function () {
  // kiểm tra xem đã chọn tập tin chưa
  if (!fileInput.value) {
    alert("Vui lòng chọn file muốn import!");
  } else {
    // xác nhận import
    const isImport = confirm("Bạn có chắc chắn import?");
    if (isImport) {
      const file = fileInput.files[0];

      const reader = new FileReader();

      // sự kiện load dữ liệu từ file lên
      reader.addEventListener(
        "load",
        function () {
          // kiểm tra cấu trúc của file có hợp lệ với định dạng yêu cầu k
          //   const isValidateFile = checkFile(JSON.parse(reader.result));
          //   if (isValidateFile) {
          //     // lưu dữ liệu xuống localStorage
          //     saveToStorage("petArr", JSON.parse(reader.result));
          //     // thông báo import thành công
          //     alert("Import thành công!");
          //   }

          // lưu dữ liệu xuống localStorage
          saveToStorage("petArr", JSON.parse(reader.result));
          // thông báo import thành công
          alert("Import thành công!");
        },
        false
      );

      // đọc file
      if (file) {
        reader.readAsText(file);
      }

      // reset file input
      fileInput.value = "";
    }
  }
});
