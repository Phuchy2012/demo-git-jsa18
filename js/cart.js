

const CART_KEY = 'hy_cart_v1';

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Lỗi đọc giỏ hàng:', e);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCartCount();
  renderCartDrawer();
}


function parsePrice(priceStr) {
  return Number(String(priceStr).replace(/[^\d]/g, '')) || 0;
}

function formatPrice(num) {
  return num.toLocaleString('vi-VN') + 'đ';
}


function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.name === product.name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      name: product.name,
      price: parsePrice(product.price),
      img: product.img,
      cat: product.cat,
      qty: 1
    });
  }

  saveCart(cart);
  openCartDrawer();
  bumpCartIcon();
}

function removeFromCart(name) {
  let cart = getCart();
  cart = cart.filter(item => item.name !== name);
  saveCart(cart);
}

function changeQty(name, delta) {
  const cart = getCart();
  const item = cart.find(i => i.name === name);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(name);
    return;
  }
  saveCart(cart);
}

function clearCart() {
  saveCart([]);
}

/* ---------- Tổng số lượng & tổng tiền ---------- */
function cartTotalQty() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}

function cartTotalPrice() {
  return getCart().reduce((sum, i) => sum + i.qty * i.price, 0);
}

/* ---------- Cập nhật số trên icon giỏ hàng ở header ---------- */
function renderCartCount() {
  const badge = document.getElementById('cartCount');
  if (!badge) return;
  const qty = cartTotalQty();
  badge.textContent = qty;
  badge.style.display = qty > 0 ? 'flex' : 'none';
}

/* ---------- Hiệu ứng nhỏ khi thêm hàng ---------- */
function bumpCartIcon() {
  const btn = document.getElementById('cartIconBtn');
  if (!btn) return;
  btn.classList.remove('bump');
  void btn.offsetWidth; // reset animation
  btn.classList.add('bump');
}

/* ---------- Render nội dung ngăn kéo giỏ hàng ---------- */
function renderCartDrawer() {
  const list = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  const emptyEl = document.getElementById('cartEmpty');
  if (!list || !totalEl) return;

  const cart = getCart();

  if (cart.length === 0) {
    list.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'block';
    totalEl.textContent = formatPrice(0);
    return;
  }

  if (emptyEl) emptyEl.style.display = 'none';

  list.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.name}">
      <div class="cart-item-info">
        <span class="cart-item-cat">${item.cat}</span>
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-price mono">${formatPrice(item.price)}</span>
        <div class="cart-item-qty">
          <button onclick="changeQty('${item.name.replace(/'/g, "\\'")}', -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty('${item.name.replace(/'/g, "\\'")}', 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart('${item.name.replace(/'/g, "\\'")}')" aria-label="Xóa">×</button>
    </div>
  `).join('');

  totalEl.textContent = formatPrice(cartTotalPrice());
}

/* ---------- Mở / đóng ngăn kéo giỏ hàng ---------- */
function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (!drawer || !overlay) return;
  drawer.classList.add('open');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (!drawer || !overlay) return;
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* ---------- Khởi tạo khi trang load ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderCartCount();
  renderCartDrawer();

  const cartIconBtn = document.getElementById('cartIconBtn');
  if (cartIconBtn) cartIconBtn.addEventListener('click', openCartDrawer);

  const closeBtn = document.getElementById('cartCloseBtn');
  if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);

  const overlay = document.getElementById('cartOverlay');
  if (overlay) overlay.addEventListener('click', closeCartDrawer);

  const clearBtn = document.getElementById('cartClearBtn');
  if (clearBtn) clearBtn.addEventListener('click', clearCart);
});