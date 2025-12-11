// 渲染动物类型卡片（可选功能，用于展示部分动物类型）
(function() {
  async function renderTypeCards() {
    try {
      // 这个功能是可选的，如果页面上有.type-grid元素才会渲染
      const typeGrid = document.querySelector('.type-grid');
      if (!typeGrid) {
        console.log('type-grid element not found, skipping type cards rendering');
        return;
      }

      const response = await fetch('animals.json');
      if (!response.ok) {
        throw new Error('Failed to load animals data');
      }

      const animals = await response.json();

      // 选择一些代表性的动物类型展示
      const featuredAnimals = animals.slice(0, 20);

      // 清空现有内容
      typeGrid.innerHTML = '';

      // 动物类型描述
      const animalDescriptions = {
        '狗': '忠诚陪伴型',
        '猫': '独立优雅型',
        '狼': '领袖战略型',
        '狐': '机敏智取型',
        '狮': '王者自信型',
        '熊': '沉稳守护型',
        '兔': '警觉温和型',
        '仓鼠': '安逸专注型',
        '天鹅': '优雅理想型',
        '鹿': '温和纯净型',
        '鹰': '高傲远见型',
        '乌鸦': '聪慧社交型',
        '水豚': '随和社交型',
        '鲸': '深邃智慧型',
        '鹦鹉': '活泼社交型',
        '章鱼': '多面智慧型',
        '鲨鱼': '专注目标型',
        '海豚': '智慧协作型',
        '浣熊': '机灵探索型',
        '猫鼬': '责任协作型'
      };

      // 渲染类型卡片
      featuredAnimals.forEach((animal, index) => {
        const card = document.createElement('div');
        card.className = 'type-card';
        card.innerHTML = `
          <div class="type-emoji">${animal.emoji}</div>
          <div class="type-name">${animal.name}</div>
          <div class="type-role">${animalDescriptions[animal.name] || '独特性格型'}</div>
        `;

        // 添加延迟动画效果
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
          card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 100);

        typeGrid.appendChild(card);
      });

    } catch (error) {
      console.error('Error rendering type cards:', error);
    }
  }

  // 页面加载完成后渲染
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderTypeCards);
  } else {
    renderTypeCards();
  }
})();
