// 渲染首页的动物emoji展示
(function() {
  async function renderAnimals() {
    try {
      const response = await fetch('animals.json');
      if (!response.ok) {
        throw new Error('Failed to load animals data');
      }

      const animals = await response.json();
      const emojiRow = document.getElementById('emoji-row');

      if (!emojiRow) {
        console.warn('emoji-row element not found');
        return;
      }

      // 清空现有内容
      emojiRow.innerHTML = '';

      // 渲染动物emoji卡片
      animals.forEach((animal, index) => {
        const card = document.createElement('div');
        card.className = 'emoji-card';
        card.textContent = animal.emoji;
        card.title = animal.name;

        // 添加延迟动画效果
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
          card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 50);

        emojiRow.appendChild(card);
      });

    } catch (error) {
      console.error('Error rendering animals:', error);
    }
  }

  // 页面加载完成后渲染
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAnimals);
  } else {
    renderAnimals();
  }
})();
