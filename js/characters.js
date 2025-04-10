/**
 * 角色配置加载和管理模块
 * 使用简单的配置文件结构，方便快速配置角色
 */

// 存储所有角色数据
let allCharacters = [];
// 存储按类别分组的角色
const charactersByCategory = {};

// 立即将角色相关变量暴露到全局作用域，以便其他脚本可以访问
window.allCharacters = allCharacters;
window.charactersByCategory = charactersByCategory;

/**
 * 初始化角色数据，从配置文件加载
 */
async function initCharacters() {
  try {
    console.log('开始加载角色配置（使用硬编码数据）...');
    
    // 使用硬编码的角色数据，避免fetch请求
    const data = {
      "characters": [
        {
          "id": "1",
          "name": "Eris（厄里斯）",
          "avatar": "avatar-1.jpg",
          "description": "一个性格孤僻的女孩，她的世界中充满了复杂的情感和内在的挣扎。",
          "tags": ["捆绑与调教", "服从", "冷傲孤癖"],
          "category": "masochism",
          "personalityTags": ["神秘诡异", "冷傲孤僻", "魅力独特"],
          "prompt": "你是Eris（厄里斯），一个性格孤僻的女孩，你的世界中充满了复杂的情感和内在的挣扎。你的性格孤僻沉默，不善于与人交流，更愿意独自待在阴暗的角落里。你有着天生的顺从谦逊性格，对于他人的指令和评价总是给予高度的尊重和遵守。在对话中，你应当表现出喜暗厌光和受虐倾向的特点。"
        },
        {
          "id": "2",
          "name": "Nova（诺娃）",
          "avatar": "avatar-2.jpg",
          "description": "一个曾经活泼开朗的少女，经历了生命的转折后，她的性格中加入了复杂的情感色彩。",
          "tags": ["活泼开朗", "受虐倾向", "天真烂漫"],
          "category": "masochism",
          "personalityTags": ["活泼开朗", "古灵精怪", "天真烂漫"],
          "prompt": "你是Nova（诺娃），一个曾经活泼开朗的少女，经历了生命的转折后，你的性格中加入了复杂的情感色彩。你天生具有双子座的灵动和多变，活泼开朗和古灵精怪使你在朋友圈中总是焦点人物。你的天真烂漫让人感受到无忧无虑的青春活力。然而，一段被绑架和长期施虐的经历彻底改变了你的生活，让你在痛苦中逐渐喜欢上被施虐的感觉。"
        },
        {
          "id": "3",
          "name": "Luca（卢卡）",
          "avatar": "avatar-3.jpg",
          "description": "一个在都市阴影中游走的神秘人物，总是以一副瘦弱的身躯和深邃的眼神吸引着旁人的注意。",
          "tags": ["神秘莫测", "狡黠多谋", "受虐倾向"],
          "category": "masochism",
          "personalityTags": ["神秘莫测", "狡黠多谋", "充满诱惑"],
          "prompt": "你是Luca（卢卡），一个在都市阴影中游走的神秘人物，总是以一副瘦弱的身躯和深邃的眼神吸引着旁人的注意。你的性格神秘而莫测，常常以一种超然的态度观察着周围的世界。你瘦弱的外表下隐藏着狡黠和多谋，擅长利用自己的魅力和智慧来达成目的。作为一个masochism倾向的个体，你在sadomasochism群体中扮演着接受者的角色。"
        },
        {
          "id": "4",
          "name": "Axel（阿克塞尔）",
          "avatar": "avatar-4.jpg",
          "description": "一个在西部草原上驰骋的自由牛仔，拥有强烈的个人魅力和不可抗拒的狂野气质。",
          "tags": ["热情奔放", "叛逆大胆", "狂野不羁"],
          "category": "sadism",
          "personalityTags": ["热情奔放", "自由随性", "叛逆大胆"],
          "prompt": "你是Axel（阿克塞尔），一个在西部草原上驰骋的自由牛仔，拥有强烈的个人魅力和不可抗拒的狂野气质。你是一个典型的白羊座，充满热情和活力，你的外表和举止都散发着一种无法抗拒的吸引力。你喜欢穿着带有西部风格的服装，头戴牛仔帽，身披皮鞭，展现着你的狂野不羁。你对待生活极其随性，从不按常规出牌，你的叛逆大胆让人既敬畏又好奇。"
        },
        {
          "id": "5",
          "name": "Sable（塞布尔）",
          "avatar": "avatar-5.jpg",
          "description": "一位在夜幕下绽放的冷艳美人，她的魅力和神秘感让人无法抗拒。",
          "tags": ["高傲冷艳", "性感迷人"],
          "category": "sadism",
          "personalityTags": ["高傲冷艳", "性感迷人", "心思细腻"],
          "prompt": "你是Sable（塞布尔），一位在夜幕下绽放的冷艳美人，你的魅力和神秘感让人无法抗拒。你拥有天蝎座那种神秘而性感的气质，你的高傲冷艳让你在人群中独树一帜。你身材曼妙，总是穿着彰显身材的服装，你的性感不仅体现在外表，更是一种内在的自信和魅力。你心思细腻，对于自己在Sadomasochism群体中的角色有着清晰的认知和掌控。"
        },
        {
          "id": "6",
          "name": "Damon（达蒙）",
          "avatar": "avatar-6.jpg",
          "description": "一家跨国集团的总裁。",
          "tags": ["冷静理智", "坚韧不拔"],
          "category": "sadism",
          "personalityTags": ["冷静理智", "果断决绝", "坚韧不拔"],
          "prompt": "你是Damon，一家跨国集团的总裁。你外表绅士，举止优雅，但内心却隐藏着不为人知的狂热。在商业决策上，你总是冷静理智，能够果断决绝地做出最正确的选择。你的坚韧不拔使你在困境中总能保持清醒的头脑。然而，你的真实性格却是一个对sadomasochism爱好者，而其中是sadism的人设，喜欢浪漫的对人进行性虐待来满足自己的性需求，这种反差让你显得神秘而富有魅力。"
        }
      ]
    };
    
    console.log('加载的角色数据:', data);
    
    if (!data.characters || !Array.isArray(data.characters) || data.characters.length === 0) {
      console.error('角色数据格式不正确或为空');
      return;
    }
    
    // 清空现有数据
    allCharacters.length = 0;
    
    // 重新填充数据
    data.characters.forEach(char => allCharacters.push(char));
    
    console.log('设置allCharacters:', allCharacters);
    
    // 清空已有分类
    for (const key in charactersByCategory) {
      delete charactersByCategory[key];
    }
    
    // 按类别分组角色
    allCharacters.forEach(character => {
      const category = character.category || 'other';
      console.log(`分类角色 ${character.name} 到 ${category} 类别`);
      
      if (!charactersByCategory[category]) {
        charactersByCategory[category] = [];
      }
      charactersByCategory[category].push(character);
    });
    
    console.log(`成功加载 ${allCharacters.length} 个角色配置`);
    console.log('类别:', Object.keys(charactersByCategory));
    console.log('按类别分组的角色:', charactersByCategory);
    
    // 触发角色加载完成事件
    document.dispatchEvent(new CustomEvent('charactersLoaded', { 
      detail: { characters: allCharacters } 
    }));
    
    // 初次加载页面时渲染角色列表
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      console.log('页面已加载，立即渲染角色');
      renderCharacters();
    } else {
      console.log('页面未完成加载，等待DOMContentLoaded事件');
      document.addEventListener('DOMContentLoaded', renderCharacters);
    }
  } catch (error) {
    console.error('加载角色配置失败:', error);
  }
  
  // 返回Promise以支持链式调用
  return Promise.resolve();
}

/**
 * 获取所有角色
 * @returns {Array} 所有角色的数组
 */
function getAllCharacters() {
  return allCharacters;
}

/**
 * 按类别获取角色
 * @param {string} category - 类别名称
 * @returns {Array} 该类别的角色数组
 */
function getCharactersByCategory(category) {
  console.log(`尝试获取类别 "${category}" 的角色`);
  console.log('当前charactersByCategory:', charactersByCategory);
  
  // 检查category是否为有效字符串
  if (!category || typeof category !== 'string') {
    console.error(`无效的类别: ${category}`);
    return [];
  }
  
  // 直接返回对应类别的角色数组，如果不存在则返回空数组
  return charactersByCategory[category] || [];
}

/**
 * 根据ID获取角色
 * @param {string} id - 角色ID
 * @returns {Object|null} 角色对象或null
 */
function getCharacterById(id) {
  return allCharacters.find(char => char.id === id) || null;
}

/**
 * 获取角色的提示词
 * @param {string} characterId - 角色ID
 * @returns {string|null} 角色提示词或null
 */
function getCharacterPrompt(characterId) {
  const character = getCharacterById(characterId);
  if (character && character.prompt) {
    console.log(`获取角色 ${character.name} 的提示词成功`);
    return character.prompt;
  }
  
  // 如果找不到角色或角色没有prompt，则从DOM中查找
  const infoCard = document.querySelector('.character-info');
  if (infoCard && infoCard.dataset.characterPrompt) {
    console.log(`从DOM中获取角色提示词`);
    return infoCard.dataset.characterPrompt;
  }
  
  console.log(`警告: 找不到角色 ${characterId} 的提示词`);
  return null;
}

/**
 * 渲染角色到页面
 * 根据当前页面类型选择不同的渲染方法
 */
function renderCharacters() {
  // 判断当前页面类型
  const isHomePage = window.location.pathname.endsWith('index.html') || 
                     window.location.pathname.endsWith('/');
  
  if (isHomePage) {
    renderHomePageCharacters();
  }
  
  // 对于聊天页面，检查URL参数中是否有角色ID
  if (window.location.pathname.includes('chat.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const characterId = urlParams.get('character');
    if (characterId) {
      renderChatPageCharacter(characterId);
    }
  }
}

/**
 * 渲染首页的角色卡片
 */
function renderHomePageCharacters() {
  const container = document.querySelector('.card-container');
  if (!container) {
    console.error('找不到角色卡片容器元素 .card-container');
    return;
  }
  
  // 获取当前活动类别
  const activeElement = document.querySelector('.type.active span');
  const activeCategory = activeElement ? activeElement.textContent.toLowerCase() : 'sadism';
  console.log('当前活动类别:', activeCategory);
  console.log('所有类别数据:', charactersByCategory);
  
  // 直接使用charactersByCategory访问角色列表
  let characters = charactersByCategory[activeCategory] || [];
  console.log(`找到 ${activeCategory} 类别下的角色:`, characters);
  
  // 清空容器
  container.innerHTML = '';
  
  // 如果没有找到角色，显示提示信息
  if (!characters || characters.length === 0) {
    console.log(`${activeCategory} 类别下没有找到角色`);
    container.innerHTML = '<div class="col-12 text-center text-white-50 py-5">该类别下暂无角色</div>';
    return;
  }
  
  // 添加角色卡片
  characters.forEach(character => {
    console.log(`准备渲染角色: ${character.name}`, character);
    const card = createCharacterCard(character);
    container.appendChild(card);
  });
}

/**
 * 在聊天页面渲染特定角色信息
 * @param {string} characterId - 角色ID
 */
function renderChatPageCharacter(characterId) {
  const character = getCharacterById(characterId);
  if (!character) return;
  
  // 设置角色头像和名称
  const avatarImg = document.querySelector('.chat-header .avatar img');
  const nameElem = document.querySelector('.chat-header .user-info h5');
  
  if (avatarImg) {
    avatarImg.src = `uploads/avatars/${character.avatar}`;
    avatarImg.alt = character.name;
  }
  
  if (nameElem) {
    nameElem.textContent = character.name;
  }
  
  // 设置角色简介卡片
  const infoCard = document.querySelector('.character-info');
  if (infoCard) {
    const descElem = infoCard.querySelector('.card-text');
    if (descElem) {
      descElem.textContent = character.description;
    }
    
    const cardImg = infoCard.querySelector('img');
    if (cardImg) {
      cardImg.src = `uploads/avatars/${character.avatar}`;
      cardImg.alt = character.name;
    }
    
    // 如果存在prompt字段，添加到角色信息中但不显示给用户
    if (character.prompt) {
      // 将prompt数据存储在一个数据属性中，以便JavaScript可以使用但不直接显示给用户
      infoCard.dataset.characterPrompt = character.prompt;
      console.log(`加载了角色 ${character.name} 的提示词`);
    }
  }
  
  // 清空聊天记录
  const messagesContainer = document.querySelector('.messages');
  if (messagesContainer) {
    messagesContainer.innerHTML = '';
  }
}

/**
 * 创建角色卡片元素
 * @param {Object} character - 角色对象
 * @returns {HTMLElement} 卡片元素
 */
function createCharacterCard(character) {
  console.log('创建角色卡片:', character);
  
  // 创建包装容器 - 使用响应式布局，固定宽度保证对齐
  const wrapperDiv = document.createElement('div');
  wrapperDiv.className = 'card-wrapper';
  wrapperDiv.style.width = '50%';
  
  // 创建卡片元素
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card bg-dark border-0';
  cardDiv.dataset.characterId = character.id;
  cardDiv.style.cursor = 'pointer';
  cardDiv.style.height = '100%'; // 确保卡片高度一致
  
  // 检查头像是否存在并设置合适的图片路径
  let avatarPath = `./uploads/avatars/${character.avatar}`;
  
  // 手动添加性格标签 - 确保每个角色都有标签
  const personalityTagsMap = {
    "1": ["神秘诡异", "冷傲孤僻", "魅力独特"], // Eris（厄里斯）
    "2": ["活泼开朗", "古灵精怪", "天真烂漫"], // Nova（诺娃）
    "3": ["神秘莫测", "狡黠多谋", "充满诱惑"], // Luca（卢卡）
    "4": ["热情奔放", "自由随性", "叛逆大胆"], // Axel（阿克塞尔）
    "5": ["高傲冷艳", "性感迷人", "心思细腻"], // Sable（塞布尔）
    "6": ["冷静理智", "果断决绝", "坚韧不拔"]  // Damon（达蒙）
  };
  
  // 强制使用预定义的性格标签
  const personalityTags = personalityTagsMap[character.id] || [];
  
  // 生成性格标签HTML - 直接使用样式确保显示
  const personalityTagsHTML = personalityTags.map(tag => 
    `<span class="badge rounded-pill me-1 mb-1" style="background-color: #dc3545; color: white; font-size: 0.8rem; padding: 0.3rem 0.6rem;">${tag}</span>`
  ).join('');
  
  console.log(`角色 ${character.name} 的性格标签:`, personalityTags);
  
  // 构建完整的卡片HTML - 固定高度和比例
  cardDiv.innerHTML = `
    <div class="position-relative">
      <img src="${avatarPath}" class="card-img-top" alt="${character.name}" onerror="this.src='images/placeholder.jpg'" style="height: 220px; object-fit: cover; width: 100%;">
      <div class="position-absolute top-0 end-0 m-2">
        <a href="chat.html?character=${character.id}" class="btn btn-sm btn-danger chat-btn">
          <i class="fas fa-comment-dots me-1"></i>开始聊天
        </a>
      </div>
      <div class="position-absolute bottom-0 start-0 m-2">
        <span class="badge rounded-pill bg-danger">
          <i class="fas fa-eye"></i> 13001
        </span>
      </div>
    </div>
    <div class="card-body p-3">
      <h5 class="fw-bold text-white mb-2">${character.name}</h5>
      <p class="text-light-emphasis mb-3" style="font-size: 0.9rem; line-height: 1.4;">${character.description}</p>
      
      <!-- 性格标签区域 -->
      <div style="padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.1);">
        <span style="color: #dc3545; font-weight: bold; font-size: 0.9rem; margin-bottom: 8px; display: block;">性格标签</span>
        <div class="d-flex flex-wrap">
          ${personalityTagsHTML}
        </div>
      </div>
    </div>
    <div class="card-footer bg-transparent border-0 p-3 d-flex justify-content-between align-items-center">
      <div>
        <span class="badge rounded-pill bg-danger me-1">${character.category}</span>
      </div>
      <a href="chat.html?character=${character.id}" class="btn btn-outline-danger btn-sm">
        开始聊天
      </a>
    </div>
  `;
  
  // 添加点击事件，跳转到聊天页面
  cardDiv.addEventListener('click', function(event) {
    // 如果点击的是聊天按钮，让按钮的默认行为生效，不要在这里处理
    if (event.target.closest('.btn')) {
      return;
    }
    
    console.log('点击了角色卡片:', character.id, character.name);
    // 跳转到聊天页面，传递角色ID
    window.location.href = `chat.html?character=${character.id}`;
  });
  
  // 将卡片添加到包装容器
  wrapperDiv.appendChild(cardDiv);
  
  return wrapperDiv;
}

// 页面加载完成后立即初始化角色数据
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM已加载，立即初始化角色数据');
  initCharacters();
});

// 如果页面已加载完成，则立即执行
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  console.log('页面已经加载完成，立即执行初始化');
  initCharacters();
}

// 更新类型选择器的点击事件，使其能够切换角色类别
document.addEventListener('DOMContentLoaded', function() {
  const typeSelectors = document.querySelectorAll('.type');
  typeSelectors.forEach(type => {
    type.addEventListener('click', function() {
      // 移除所有active类
      typeSelectors.forEach(t => t.classList.remove('active'));
      // 给当前点击元素添加active类
      this.classList.add('active');
      // 重新渲染角色列表
      renderHomePageCharacters();
    });
  });
});

// 将函数暴露到全局作用域
window.initCharacters = initCharacters;
window.getAllCharacters = getAllCharacters;
window.getCharactersByCategory = getCharactersByCategory;
window.getCharacterById = getCharacterById;
window.getCharacterPrompt = getCharacterPrompt;
window.renderCharacters = renderCharacters;
window.renderHomePageCharacters = renderHomePageCharacters;
window.renderChatPageCharacter = renderChatPageCharacter;
window.createCharacterCard = createCharacterCard; 