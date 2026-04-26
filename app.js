// js/app.js

// Khởi tạo giỏ hàng từ localStorage
let cart = JSON.parse(localStorage.getItem('emobox_cart')) || [];

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  if (badge) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
  }
}

function addToCart(boxId) {
  const existingItem = cart.find(item => item.id === boxId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: boxId, quantity: 1 });
  }
  localStorage.setItem('emobox_cart', JSON.stringify(cart));
  updateCartBadge();
  showToast('Đã thêm vào giỏ hàng!');
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

function toggleNav() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('active');
}

function toggleUserMenu() {
  const menu = document.getElementById('userMenu');
  menu.classList.toggle('active');
}

// Xử lý click ra ngoài để đóng user menu
document.addEventListener('click', (e) => {
  const userBtn = document.getElementById('userBtn');
  const userMenu = document.getElementById('userMenu');
  if (userBtn && userMenu && !userBtn.contains(e.target) && !userMenu.contains(e.target)) {
    userMenu.classList.remove('active');
  }
});

// Mobile dropdown toggle
document.querySelectorAll('.nav-dropdown > a').forEach(el => {
  el.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      e.target.parentElement.classList.toggle('active');
    }
  });
});

// Render dữ liệu trang chủ
function renderEmotionGrid() {
  const grid = document.getElementById('emotionGrid');
  if (!grid || typeof EMOTIONS === 'undefined') return;
  
  grid.innerHTML = EMOTIONS.map(emo => `
    <a href="finder.html?emotion=${emo.id}" class="emotion-card">
      <div class="emotion-icon">${emo.emoji}</div>
      <div class="emotion-name">${emo.label}</div>
    </a>
  `).join('');
}

function renderFeaturedBoxes() {
  const grid = document.getElementById('featuredGrid');
  if (!grid || typeof FEATURED_BOXES === 'undefined') return;
  
  grid.innerHTML = FEATURED_BOXES.map(box => `
    <div class="gift-card">
      <a href="box-detail.html?id=${box.id}" class="gift-img-wrap">
        ${box.badge ? `<span class="gift-badge">${box.badge}</span>` : ''}
        <img src="${box.image}" alt="${box.name}" class="gift-img">
      </a>
      <div class="gift-content">
        <a href="box-detail.html?id=${box.id}"><h3 class="gift-title">${box.name}</h3></a>
        <p class="gift-desc">${box.desc}</p>
        <div class="gift-footer">
          <span class="gift-price">${formatPrice(box.price)}</span>
          <button class="btn btn-primary" onclick="addToCart('${box.id}')">Thêm giỏ</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Khởi chạy khi load
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
});
