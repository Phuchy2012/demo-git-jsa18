const announceItems = [
  "SALE TỚI 50% TUẦN NÀY",
  "FREESHIP ĐƠN TỪ 500K",
  "HÀNG MỚI VỀ MỖI TUẦN",
  "ĐỔI TRẢ TRONG 7 NGÀY",
  "THANH TOÁN KHI NHẬN HÀNG"
];
const announceTrack = document.getElementById('announceTrack');
const announceHtml = announceItems.map(t => `<span>${t}</span>`).join('');
announceTrack.innerHTML = announceHtml + announceHtml;

const banner = document.querySelector(".page-header");

// Tạo khối chứa ảnh
const bannerImage = document.createElement("div");
bannerImage.className = "banner-image";

// Tạo ảnh
const img = document.createElement("img");
img.src = "https://dongphuchaianh.vn/wp-content/uploads/2022/03/quan-ao-the-thao-cho-nam-va-nu.jpg";
img.alt = "Quần áo thể thao HY Clothes";

// Đưa ảnh vào khối
bannerImage.appendChild(img);

// Đưa khối ảnh vào banner
banner.appendChild(bannerImage);