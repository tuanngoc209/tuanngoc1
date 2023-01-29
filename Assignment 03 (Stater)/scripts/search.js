"use strict";

if (currentUser) {
  const navPageNum = document.getElementById("nav-page-num"); // chứa nút chuyển trang
  const inputQuery = document.getElementById("input-query");
  const btnSubmit = document.getElementById("btn-submit");

  const newsContainer = document.getElementById("news-container"); // chứa kết quả
  const btnPrev = document.getElementById("btn-prev");
  const pageNum = document.getElementById("page-num");
  const btnNext = document.getElementById("btn-next");

  let totalResults = 0;
  let keywords = "";
  navPageNum.style.display = "none";

  btnSubmit.addEventListener("click", function () {
    pageNum.textContent = "1";
    newsContainer.innerHTML = "";
    // kiểm tra user đã nhập keyword chưa
    if (inputQuery.value.trim().length === 0) {
      // ẩn các nút chuyển trang nếu không nhập keyword
      navPageNum.style.display = "none";
      alert("Vui lòng nhập keywords để tìm kiếm");
    } else {
      keywords = inputQuery.value;
      // gọi hàm hiển thị list news
      getDataNewsByKeywords(keywords, 1);
    }
  });

  async function getDataNewsByKeywords(keywords, page) {
    try {
      // kết nối vs API và lấy dữ liệu
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${keywords}&sortBy=relevancy&pageSize=${currentUser.pageSize}&page=${page}&apiKey=c498027180df4295b4fe4d773cc18d2c`
      );

      const data = await res.json();
      //console.log(data);

      // check lỗi quá 100 lần request/1 ngày
      if (data.status === "error" && data.code === "rateLimited") {
        // ẩn các nút chuyển trang nếu có lỗi
        navPageNum.style.display = "none";
        throw new Error(data.message);
      }

      // nếu không có bài viết thì thông báo:
      if (data.totalResults == 0) {
        // ẩn các nút chuyển trang nếu có lỗi
        navPageNum.style.display = "none";
        throw new Error("Không có bài viết liên quan, vui lòng nhập lại");
      }

      // bắt lỗi khi chạy từ tập tin không thông qua server
      // khi có lỗi mới phát sinh corsNotAllowed
      if (data.status === "error" && data.code === "corsNotAllowed") {
        throw new Error(data.message);
      }

      // hiển thị các nút chuyển trang
      navPageNum.style.display = "block";

      // gọi hàm hiển thịt list News
      displayNewList(data);
    } catch (err) {
      alert(err.message);
    }
  }

  //  hàm kt đk để ẩn nút pre
  function checkBtnPrev() {
    // nếu page Number là 1 thì ẩn đi
    if (pageNum.textContent == 1) {
      btnPrev.style.display = "none";
    } else {
      btnPrev.style.display = "block";
    }
  }

  //  hàm kt đk để ẩn nút next
  function checkBtnNext() {
    // .ceil làm tròn lên số nguyên
    if (pageNum.textContent == Math.ceil(totalResults / currentUser.pageSize)) {
      btnNext.style.display = "none";
    } else {
      btnNext.style.display = "block";
    }
  }

  // bắt sự kiện nút pre
  btnPrev.addEventListener("click", function () {
    getDataNewsByKeywords(keywords, --pageNum.textContent);
  });

  // bắt sự kiện nút next
  btnNext.addEventListener("click", function () {
    getDataNewsByKeywords(keywords, ++pageNum.textContent);
  });

  // hàm hiển thị list news lên trang
  function displayNewList(data) {
    // lấy giá trị tổng news
    totalResults = data.totalResults;
    // gọi các hàm check ẩn/hiện nút:
    checkBtnPrev();
    checkBtnNext();

    let html = "";
    data.articles.forEach(function (article) {
      html += `
          <div class="new-content">
            <div class="img-banner">
              <img src=${
                article.urlToImage
                  ? article.urlToImage
                  : "no_image_available.jpg"
              } class="card-img"
                alt="img">
            </div>
  
            <div class="content">            
              <h4>${article.title}</h4>
              <p>${article.description}</p>
              <button><a href=${article.url}
                target='_blank'>View</a></button>								
            </div>
          </div>`;
    });

    newsContainer.innerHTML = html;
  }
} else {
  alert("Vui lòng đăng nhập để cài đặt");
  window.location.assign("../index.html");
}
