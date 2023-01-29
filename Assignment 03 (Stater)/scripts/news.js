"use strict";

if (currentUser) {
  const newsContainer = document.getElementById("news-container");
  const btnPrev = document.getElementById("btn-prev");
  const pageNum = document.getElementById("page-num");
  const btnNext = document.getElementById("btn-next");

  // biến tính số news tối đa trả về từ API
  let totalResults = 0;

  getDataNews("us", 1);

  // 6. Hiển thị các bài viết
  // hàm lấy data news từ API và hiển thị list news ra web
  async function getDataNews(country, page) {
    try {
      // kết nối vs API và lấy dữ liệu
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${currentUser.category}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=c498027180df4295b4fe4d773cc18d2c`
      );
      const data = await res.json();
      //console.log(data);

      // check lỗi quá 100 lần request/1 ngày
      if (data.status === "error" && data.code === "rateLimited") {
        throw new Error(data.message);
      }

      // bắt lỗi khi chạy từ tập tin không thông qua server
      // khi có lỗi mới phát sinh corsNotAllowed
      if (data.status === "error" && data.code === "corsNotAllowed") {
        throw new Error(data.message);
      }

      // gọi hàm hiển thịt list News
      displayNewList(data);
    } catch (err) {
      alert("Error: " + err.message);
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
      if (
        pageNum.textContent == Math.ceil(totalResults / currentUser.pageSize)
      ) {
        btnNext.style.display = "none";
      } else {
        btnNext.style.display = "block";
      }
    }

    // 7. Chuyển trang cho các bài viết
    // bắt sự kiện nút pre
    btnPrev.addEventListener("click", function () {
      getDataNews("us", --pageNum.textContent);
    });
    // bắt sự kiện nút next
    btnNext.addEventListener("click", function () {
      getDataNews("us", ++pageNum.textContent);
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
              article.urlToImage ? article.urlToImage : "no_image_available.jpg"
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
  }
} else {
  alert("Vui lòng đăng nhập để truy cập");
  window.location.assign("../index.html");
}
