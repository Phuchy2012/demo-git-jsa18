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

  const scoreItems = [
    ["50%","GIẢM TỐI ĐA ÁO & QUẦN"],
    ["30%","GIÀY CHẠY BỘ CHÍNH HÃNG"],
    ["7","NGÀY ĐỔI TRẢ MIỄN PHÍ"],
    ["24H","GIAO HÀNG NỘI THÀNH"],
    ["10%","ƯU ĐÃI THÀNH VIÊN MỚI"]
  ];
  const scoreTrack = document.getElementById('scoreTrack');
  const scoreHtml = scoreItems.map(([n,l]) => `<div class="score-item"><span class="score-num">${n}</span><span class="score-label">${l}</span></div>`).join('');
  scoreTrack.innerHTML = scoreHtml + scoreHtml;

  const products = [
    {
      img:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR-RSxsC2n-CbHC9SoE5gMKnesOsgsf9xyCKqqK9o97xLsc6XMy0Gb5Pa1hns9YSeIsMECA0a_zKzEmVV-r07I3b8yDbycJfBWtUn0w9MPoa_rZhsKiZCqYmDnElUs2tfjBwnbEdeAo&usqp=CAc",
      cat:"Áo thể thao · Nam", name:"Áo Polo Thể Thao Active-Fit",
      price:"349.000đ", old:"459.000đ", off:"-24%"
    },
    {
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiVve7qXHrk6YppcpkQ7VKE1n-3zI_RH_DRCgIdR18Tw&s",
      cat:"Đầm thể thao · Nữ", name:"Váy Tennis Nữ Thoáng Khí",
      price:"529.000đ", old:"622.000đ", off:"-15%", isNew:true
    },
    {
      img:"https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80&auto=format&fit=crop",
      cat:"Giày · Unisex", name:"Giày Chạy Bộ Air Zoom Speed",
      price:"1.290.000đ", old:"1.850.000đ", off:"-30%"
    },
    {
      img:"https://images.unsplash.com/photo-1521369909029-2afed882baee?w=600&q=80&auto=format&fit=crop",
      cat:"Phụ kiện", name:"Mũ Lưỡi Trai Thể Thao Dri-Fit",
      price:"219.000đ", old:"245.000đ", off:"-10%", isNew:true
    },
    {
      img:"https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcScXYG61ZMp3HHv12w0UGIfhqERHN8YCW8q3cM17HzAy-AG-dAmXdkRjc5uKeHy98mYXs_2l8IfZPy2xwd1ruS3cXikeDvvD4g_diJUs-vcfja2t2R5p_ojd6g1G_GshxKXWvRgDhk&usqp=CAc",
      cat:"Quần thể thao · Nữ", name:"Quần Legging Nữ Cạp Cao",
      price:"389.000đ", old:"485.000đ", off:"-20%"
    },
    {
      img:"https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=600&q=80&auto=format&fit=crop",
      cat:"Áo khoác · Nam", name:"Áo Khoác Gió Nam Chống Nước",
      price:"649.000đ", old:"790.000đ", off:"-18%"
    },
    {
      img:"https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600&q=80&auto=format&fit=crop",
      cat:"Giày · Nam", name:"Giày Sneaker Streetwear Retro",
      price:"899.000đ", old:"1.150.000đ", off:"-22%", isNew:true
    },
    {
      img:"https://runningshorts.com/wp-content/uploads/2023/10/10-amazing-mens-short-athletic-shorts-for-2023-1698335606.jpg",
      cat:"Quần thể thao · Nam", name:"Quần Short Chạy Bộ Nhẹ",
      price:"259.000đ", old:"310.000đ", off:"-16%"
    }
  ];

  const grid = document.getElementById('productGrid');
  grid.innerHTML = products.map((p, idx) => `
    <div class="card">
      <div class="card-media">
        <img src="${p.img}" alt="${p.name}">
        ${p.isNew ? '<span class="tag-new">MỚI VỀ</span>' : `<span class="tag-off">${p.off}</span>`}
        <button class="fav" aria-label="Yêu thích">♡</button>
      </div>
      <div class="card-body">
        <span class="card-cat">${p.cat}</span>
        <span class="card-name">${p.name}</span>
        <div class="price-row">
          <span class="price-now mono">${p.price}</span>
          <span class="price-old mono">${p.old}</span>
        </div>
        <button class="btn-add-cart" data-idx="${idx}">Thêm vào giỏ</button>
      </div>
    </div>
  `).join('');

  /* Gắn sự kiện thêm vào giỏ cho từng nút, dùng addToCart() từ cart.js */
  grid.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = Number(e.currentTarget.dataset.idx);
      addToCart(products[idx]);
    });
  });

  function togglePw(id, btn){
    const input = document.getElementById(id);
    const isPw = input.type === 'password';
    input.type = isPw ? 'text' : 'password';
    btn.textContent = isPw ? 'Ẩn' : 'Hiện';
  }

  function checkStrength(val){
    const bars = [document.getElementById('s1'), document.getElementById('s2'), document.getElementById('s3')];
    let score = 0;
    if(val.length >= 8) score++;
    if(/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
    if(/[^A-Za-z0-9]/.test(val)) score++;
    const colors = ['#E24B4A', '#EF9F27', '#639922'];
    bars.forEach((b,i) => { b.style.background = i < score ? colors[score-1] : '#D6D9DD'; });
  }