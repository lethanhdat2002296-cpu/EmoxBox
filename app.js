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
      <div onclick="openFeaturedModal('${box.id}')" class="gift-img-wrap" style="cursor: pointer;">
        ${box.badge ? `<span class="gift-badge">${box.badge}</span>` : ''}
        <img src="${box.image}" alt="${box.name}" class="gift-img">
      </div>
      <div class="gift-content">
        <h3 class="gift-title" onclick="openFeaturedModal('${box.id}')" style="cursor: pointer; display: inline-block;">${box.name}</h3>
        <p class="gift-desc">${box.desc}</p>
        <div class="gift-footer">
          <span class="gift-price">${formatPrice(box.price)}</span>
          <button class="btn btn-primary" onclick="openFeaturedModal('${box.id}')">Thêm giỏ</button>
        </div>
      </div>
    </div>
  `).join('');
}

function handleLogout(e) {
  if (e) e.preventDefault();
  localStorage.removeItem('emobox_user');
  window.location.reload();
}

// Khởi chạy khi load
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();

    // Update User Menu in Navbar across all pages
  const userMenuBody = document.querySelector('.user-menu-body');
  const currentUser = JSON.parse(localStorage.getItem('emobox_user'));
  
  if (userMenuBody) {
    // Redirect unauthenticated users to login
    if (!currentUser && !window.location.pathname.includes('login.html') && !window.location.pathname.includes('register.html')) {
      window.location.href = 'login.html';
      return; // Dừng thực thi các mã phía dưới nếu chuyển hướng
    }

    // Remove existing login/logout links if any
    const existingAuthLinks = userMenuBody.querySelectorAll('a[href="login.html"], a[onclick="handleLogout(event)"], a[onclick="handleLogout()"]');
    existingAuthLinks.forEach(link => link.remove());

    const authLink = document.createElement('a');
    authLink.className = 'user-menu-item';
    
    if (currentUser) {
      authLink.textContent = 'Đăng xuất';
      authLink.href = '#';
      authLink.onclick = handleLogout;
    } else {
      authLink.textContent = 'Đăng nhập / Đăng ký';
      authLink.href = 'login.html';
    }
    
    userMenuBody.insertBefore(authLink, userMenuBody.firstChild);
  }

  if (currentUser) {
    const navUserName = document.querySelector('.user-name');
    const navAvatar = document.querySelector('.user-avatar-sm');
    const navUserSub = document.querySelector('.user-sub');
    
    if (navUserName) navUserName.textContent = currentUser.name;
    if (navAvatar) navAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
    
    if (navUserSub) {
      let planLabel = 'Tài khoản thường';
      if(currentUser.plan === '3-months') planLabel = 'Thành viên 3 Tháng';
      if(currentUser.plan === '6-months') planLabel = 'Thành viên 6 Tháng';
      if(currentUser.plan === '12-months') planLabel = 'Thành viên 12 Tháng';
      navUserSub.textContent = planLabel;
    }
  }

  // Intercept calendar and wallet links
  const protectedLinks = document.querySelectorAll('a[href="calendar.html"], a[href="wallet.html"]');
  protectedLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const user = JSON.parse(localStorage.getItem('emobox_user'));
      if (!user || user.plan === 'none' || !user.plan) {
        e.preventDefault(); // prevent navigation
        if (typeof showToast === 'function') {
          showToast('Chức năng dành cho thành viên');
        } else {
          alert('Chức năng dành cho thành viên');
        }
      }
    });
  });

  // Hard check for wallet page if accessed directly
  if (window.location.pathname.includes('wallet.html')) {
    if (!currentUser || currentUser.plan === 'none' || !currentUser.plan) {
      alert('Chức năng dành cho thành viên. Đang chuyển hướng...');
      window.location.href = 'index.html';
    }
  }

  // Update plan buttons in plans.html
  if (window.location.pathname.includes('plans.html') && currentUser) {
    const planButtons = document.querySelectorAll('.plan-card button');
    planButtons.forEach(btn => {
      if (currentUser.plan === '3-months' && btn.textContent.includes('3 Tháng')) {
        btn.textContent = 'Đang sử dụng';
        btn.style.opacity = '0.7';
        btn.disabled = true;
      } else if (currentUser.plan === '6-months' && btn.textContent.includes('6 Tháng')) {
        btn.textContent = 'Đang sử dụng';
        btn.style.opacity = '0.7';
        btn.disabled = true;
      } else if (currentUser.plan === '12-months' && btn.textContent.includes('12 Tháng')) {
        btn.textContent = 'Đang sử dụng';
        btn.style.opacity = '0.7';
        btn.disabled = true;
      }
    });
  }
});
