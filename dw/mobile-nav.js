// 移动端导航菜单交互
(function() {
  function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (!navToggle || !navLinks) {
      console.warn('Navigation elements not found');
      return;
    }

    // 切换菜单显示状态
    navToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navLinks.classList.toggle('open');

      // 更新按钮文本
      if (navLinks.classList.contains('open')) {
        navToggle.textContent = '✕';
        navToggle.setAttribute('aria-label', '关闭菜单');
      } else {
        navToggle.textContent = '☰';
        navToggle.setAttribute('aria-label', '打开菜单');
      }
    });

    // 点击页面其他区域关闭菜单
    document.addEventListener('click', function(e) {
      if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        navLinks.classList.remove('open');
        navToggle.textContent = '☰';
        navToggle.setAttribute('aria-label', '打开菜单');
      }
    });

    // 点击菜单项后关闭菜单
    const menuItems = navLinks.querySelectorAll('.nav__link');
    menuItems.forEach(item => {
      item.addEventListener('click', function() {
        navLinks.classList.remove('open');
        navToggle.textContent = '☰';
        navToggle.setAttribute('aria-label', '打开菜单');
      });
    });

    // 窗口大小改变时，如果切换到桌面视图，关闭移动菜单
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (window.innerWidth > 560 && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          navToggle.textContent = '☰';
          navToggle.setAttribute('aria-label', '打开菜单');
        }
      }, 250);
    });
  }

  // 页面加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav);
  } else {
    initMobileNav();
  }
})();
