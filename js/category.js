/* =========================================================
   CATEGORY.JS
   Dùng chung cho:
   - Áo thể thao
   - Quần thể thao
   - Giày thể thao

   CATEGORY_TYPE phải được khai báo trước file này.
   ========================================================= */

(function () {

  /* =========================
     KIỂM TRA DỮ LIỆU
     ========================= */

  if (typeof CATEGORY_TYPE === "undefined") {
    console.error("CATEGORY_TYPE chưa được khai báo.");
    return;
  }

  if (typeof CATALOG === "undefined") {
    console.error("CATALOG chưa được khai báo.");
    return;
  }


  /* =========================
     THANH THÔNG BÁO
     ========================= */

  const announceItems = [
    "SALE TỚI 50% TUẦN NÀY",
    "FREESHIP ĐƠN TỪ 500K",
    "HÀNG MỚI VỀ MỖI TUẦN",
    "ĐỔI TRẢ TRONG 7 NGÀY",
    "THANH TOÁN KHI NHẬN HÀNG"
  ];

  const announceTrack = document.getElementById("announceTrack");

  if (announceTrack) {
    const html = announceItems
      .map(text => `<span>${text}</span>`)
      .join("");

    announceTrack.innerHTML = html + html;
  }


  /* =========================
     LỌC ĐÚNG DANH MỤC
     ========================= */

  let allItems = CATALOG.filter(
    product => product.type === CATEGORY_TYPE
  );

  let activeGender = "all";
  let activeSort = "default";


  /* =========================
     DOM
     ========================= */

  const grid = document.getElementById("productGrid");
  const resultCount = document.getElementById("resultCount");
  const bannerCount = document.getElementById("bannerCount");


  /* =========================
     HIỂN THỊ SỐ SẢN PHẨM
     ========================= */

  if (bannerCount) {
    bannerCount.textContent = allItems.length;
  }


  /* =========================
     CHUYỂN GIÁ THÀNH NUMBER
     ========================= */

  function parsePrice(price) {
    if (!price) return 0;

    return Number(
      String(price)
        .replace(/\./g, "")
        .replace("đ", "")
        .replace(/[^\d]/g, "")
    ) || 0;
  }


  /* =========================
     LẤY SẢN PHẨM HIỂN THỊ
     ========================= */

  function getVisibleItems() {

    let items;

    if (activeGender === "all") {
      items = allItems.slice();
    } else {
      items = allItems.filter(
        product => product.gender === activeGender
      );
    }


    /* Sắp xếp giá tăng */
    if (activeSort === "price-asc") {

      items.sort(
        (a, b) => parsePrice(a.price) - parsePrice(b.price)
      );

    }


    /* Sắp xếp giá giảm */
    else if (activeSort === "price-desc") {

      items.sort(
        (a, b) => parsePrice(b.price) - parsePrice(a.price)
      );

    }


    /* Hàng mới */
    else if (activeSort === "new") {

      items.sort(
        (a, b) =>
          (b.isNew ? 1 : 0) -
          (a.isNew ? 1 : 0)
      );

    }


    return items;
  }


  /* =========================
     RENDER SẢN PHẨM
     ========================= */

  function render() {

    if (!grid) {
      console.error("Không tìm thấy #productGrid");
      return;
    }

    const items = getVisibleItems();


    /* Số lượng */
    if (resultCount) {
      resultCount.textContent = items.length;
    }


    /* Không có sản phẩm */
    if (items.length === 0) {

      grid.innerHTML = `
        <p class="empty-state">
          Không tìm thấy sản phẩm phù hợp bộ lọc.
        </p>
      `;

      return;
    }


    /* Render sản phẩm */

    grid.innerHTML = items.map((product) => {

      const realIdx = allItems.indexOf(product);

      const image =
        product.img ||
        "https://via.placeholder.com/600x700?text=HY+Clothes";

      const name =
        product.name || "Sản phẩm HY Clothes";

      const category =
        product.cat || "";

      const price =
        product.price || "0đ";

      const oldPrice =
        product.old || "";

      const badge = product.isNew
        ? '<span class="tag-new">MỚI VỀ</span>'
        : `<span class="tag-off">${product.off || ""}</span>`;


      return `
        <div class="card">

          <div class="card-media">

            <img
              src="${image}"
              alt="${name}"
              loading="lazy"
              onerror="this.onerror=null;this.src='https://via.placeholder.com/600x700?text=HY+Clothes';"
            >

            ${badge}

            <button
              class="fav"
              aria-label="Yêu thích"
            >
              ♡
            </button>

          </div>

          <div class="card-body">

            <span class="card-cat">
              ${category}
            </span>

            <span class="card-name">
              ${name}
            </span>

            <div class="price-row">

              <span class="price-now mono">
                ${price}
              </span>

              <span class="price-old mono">
                ${oldPrice}
              </span>

            </div>

            <button
              class="btn-add-cart"
              data-idx="${realIdx}"
            >
              Thêm vào giỏ
            </button>

          </div>

        </div>
      `;

    }).join("");


    /* =========================
       NÚT THÊM GIỎ HÀNG
       ========================= */

    grid
      .querySelectorAll(".btn-add-cart")
      .forEach(button => {

        button.addEventListener("click", function (event) {

          const index = Number(
            event.currentTarget.dataset.idx
          );

          const product = allItems[index];

          if (!product) {
            console.error(
              "Không tìm thấy sản phẩm:",
              index
            );
            return;
          }


          if (typeof addToCart === "function") {

            addToCart(product);

          } else {

            console.error(
              "Không tìm thấy hàm addToCart(). Kiểm tra cart.js"
            );

          }

        });

      });

  }


  /* =========================
     BỘ LỌC NAM / NỮ / UNISEX
     ========================= */

  document
    .querySelectorAll(".filter-pill")
    .forEach(pill => {

      pill.addEventListener("click", function () {

        document
          .querySelectorAll(".filter-pill")
          .forEach(item => {
            item.classList.remove("active");
          });


        pill.classList.add("active");


        activeGender =
          pill.dataset.gender || "all";


        render();

      });

    });


  /* =========================
     SẮP XẾP
     ========================= */

  const sortSelect =
    document.getElementById("sortSelect");


  if (sortSelect) {

    sortSelect.addEventListener(
      "change",
      function (event) {

        activeSort =
          event.target.value;

        render();

      }
    );

  }


  /* =========================
     RENDER LẦN ĐẦU
     ========================= */

  render();

})();