/**
 * AI聊天应用 - 主JavaScript文件
 * 处理页面交互、导航和基本功能
 */

/**
 * 页面初始化
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('main.js: 页面DOM内容已加载');

    // 确认characters.js已加载
    if (typeof window.initCharacters !== 'function') {
        console.error('main.js: characters.js未正确加载，initCharacters函数不可用');
    } else {
        console.log('main.js: characters.js已加载，initCharacters函数可用');
        
        // 确保角色数据包含personalityTags
        document.addEventListener('charactersLoaded', function() {
            console.log('main.js: charactersLoaded事件触发，开始检查personalityTags');
            ensureCharacterPersonalityTags();
        });
    }

    // 调用头图加载函数
    if (typeof loadHeaderImage === 'function') {
        loadHeaderImage();
        console.log('正在加载自定义头图...');
    }
    
    // 网站导航高亮当前页面
    console.log('main.js: 调用highlightCurrentPage');
    highlightCurrentPage();
    
    // 初始化加载更多按钮
    console.log('main.js: 调用initLoadMoreButton');
    initLoadMoreButton();
    
    // 初始化类别切换功能
    console.log('main.js: 调用initCategorySwitch');
    initCategorySwitch();
    
    // 在聊天页面，检查URL参数
    if (window.location.pathname.includes('chat.html')) {
        console.log('main.js: 当前是聊天页面，检查URL参数');
        const urlParams = new URLSearchParams(window.location.search);
        const characterId = urlParams.get('character');
        console.log('main.js: URL参数character值:', characterId);
        if (characterId && typeof window.renderChatPageCharacter === 'function') {
            // 确保角色数据加载完成后再渲染
            if (window.allCharacters && window.allCharacters.length > 0) {
                console.log('main.js: 角色数据已加载，调用renderChatPageCharacter');
                window.renderChatPageCharacter(characterId);
            } else {
                // 如果角色数据还未加载，等待加载完成事件
                console.log('main.js: 角色数据未加载，添加charactersLoaded事件监听');
                document.addEventListener('charactersLoaded', function() {
                    console.log('main.js: 收到charactersLoaded事件，调用renderChatPageCharacter');
                    window.renderChatPageCharacter(characterId);
                });
            }
        }
    }
});

/**
 * 确保所有角色都有personalityTags属性
 * 如果缺少，则添加默认标签
 */
function ensureCharacterPersonalityTags() {
    if (!window.allCharacters) {
        console.error('main.js: allCharacters未定义，无法修复personalityTags');
        return;
    }
    
    // 定义所有角色的默认性格标签
    const defaultPersonalityTags = {
        "1": ["神秘诡异", "冷傲孤僻", "魅力独特"], // Eris（厄里斯）
        "2": ["活泼开朗", "古灵精怪", "天真烂漫"], // Nova（诺娃）
        "3": ["神秘莫测", "狡黠多谋", "充满诱惑"], // Luca（卢卡）
        "4": ["热情奔放", "自由随性", "叛逆大胆"], // Axel（阿克塞尔）
        "5": ["高傲冷艳", "性感迷人", "心思细腻"], // Sable（塞布尔）
        "6": ["冷静理智", "果断决绝", "坚韧不拔"]  // Damon（达蒙）
    };
    
    console.log('main.js: 开始检查allCharacters的personalityTags');
    window.allCharacters.forEach(character => {
        // 如果角色没有personalityTags或者为空数组
        if (!character.personalityTags || !Array.isArray(character.personalityTags) || character.personalityTags.length === 0) {
            console.log(`main.js: 角色 ${character.name} (ID: ${character.id}) 缺少personalityTags，添加默认标签`);
            
            // 使用默认标签或空数组
            character.personalityTags = defaultPersonalityTags[character.id] || [];
            console.log(`main.js: 角色 ${character.name} 添加了默认标签:`, character.personalityTags);
        } else {
            console.log(`main.js: 角色 ${character.name} 已有personalityTags:`, character.personalityTags);
        }
    });
    
    console.log('main.js: personalityTags检查完成');
    
    // 重新渲染首页角色列表
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
        console.log('main.js: 当前在首页，重新渲染角色列表');
        if (typeof window.renderHomePageCharacters === 'function') {
            window.renderHomePageCharacters();
        }
    }
}

/**
 * 初始化头图
 * 检查是否有自定义头图并加载
 */
function initHeaderImage() {
    // 头图处理逻辑来自images.js
    if (typeof loadHeaderImage === 'function') {
        loadHeaderImage();
    }
}

/**
 * 高亮当前页面的导航项
 */
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    
    // 底部导航栏
    const bottomNavLinks = document.querySelectorAll('.navbar-nav .nav-link');
    bottomNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.includes(href) || 
            (href === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('/index.html')))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // 顶部导航栏（如果存在）
    const topNavLinks = document.querySelectorAll('.navbar-collapse .nav-link');
    topNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPath.includes(href) || 
            (href === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('/index.html')))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * 初始化类别切换功能
 */
function initCategorySwitch() {
    // 修复类型切换功能
    const typeElements = document.querySelectorAll('.type');
    if (typeElements.length > 0) {
        console.log('找到类型元素:', typeElements.length);
        typeElements.forEach(element => {
            element.addEventListener('click', function() {
                const categoryName = this.querySelector('span').textContent.toLowerCase();
                console.log('main.js: 类型元素被点击:', categoryName);
                
                // 移除所有类型的active类
                typeElements.forEach(el => el.classList.remove('active'));
                
                // 添加当前类型的active类
                this.classList.add('active');
                
                // 渲染对应类型的角色
                if (typeof window.renderHomePageCharacters === 'function') {
                    console.log('main.js: 调用renderHomePageCharacters渲染类别', categoryName);
                    window.renderHomePageCharacters();
                } else {
                    console.error('main.js: renderHomePageCharacters函数不存在');
                }
            });
        });
    } else {
        console.warn('未找到类型切换元素 .type');
    }
}

/**
 * 初始化"加载更多"按钮
 */
function initLoadMoreButton() {
    const loadMoreBtn = document.querySelector('.btn.btn-outline-danger.rounded-pill');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // 点击动画效果
            this.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 加载中...';
            
            // 模拟加载延迟
            setTimeout(() => {
                // 获取当前类别
                const activeCategory = document.querySelector('.category.active span')?.textContent.toLowerCase() || 'sadism';
                const characters = getCharactersByCategory(activeCategory);
                
                // 随机选择几个角色添加到列表
                const container = document.querySelector('.card-container');
                const startIndex = container.children.length;
                
                // 如果还有更多角色可以加载
                if (startIndex < characters.length) {
                    const endIndex = Math.min(startIndex + 2, characters.length);
                    for (let i = startIndex; i < endIndex; i++) {
                        const card = createCharacterCard(characters[i]);
                        container.appendChild(card);
                    }
                    
                    // 恢复按钮状态
                    this.innerHTML = '加载更多';
                } else {
                    // 没有更多角色可加载
                    this.innerHTML = '没有更多了';
                    this.disabled = true;
                }
            }, 1000);
        });
    }
}

/**
 * 生成随机ID
 * 用于生成临时ID或标识符
 * @returns {string} UUID格式的随机ID
 */
function generateRandomId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// 初始化聊天相关功能
function initChatFeatures() {
    // 滚动到聊天底部
    const chatContent = document.querySelector('.chat-content');
    if (chatContent) {
        chatContent.scrollTop = chatContent.scrollHeight;
    }
    
    // 添加表情包选择功能（示例）
    const emojiButton = document.querySelector('.action-buttons button:first-child');
    if (emojiButton) {
        emojiButton.addEventListener('click', function() {
            // 这里可以实现表情选择面板
            alert('表情功能将在下一版本实现');
        });
    }
    
    // 添加其他功能按钮事件
    const otherButtons = document.querySelectorAll('.action-buttons button:not(:first-child)');
    otherButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('此功能将在下一版本实现');
        });
    });
}

// 初始化首页功能
function initHomeFeatures() {
    // 分类切换功能
    const categories = document.querySelectorAll('.featured-toggle .category');
    
    categories.forEach(category => {
        category.addEventListener('click', function() {
            // 清除所有active状态
            categories.forEach(c => c.classList.remove('active'));
            
            // 添加当前项的active状态
            this.classList.add('active');
            
            // 切换类别名称样式
            categories.forEach(c => {
                c.querySelector('span').classList.remove('text-danger', 'fw-bold');
                c.querySelector('span').classList.add('text-secondary');
            });
            
            // 设置当前选中的样式
            this.querySelector('span').classList.remove('text-secondary');
            this.querySelector('span').classList.add('text-danger', 'fw-bold');
        });
    });
    
    // 过滤开关功能
    const filterToggle = document.getElementById('filterToggle');
    if (filterToggle) {
        filterToggle.addEventListener('change', function() {
            // 根据开关状态更新显示内容
            // 示例：简单的提示
            if (this.checked) {
                console.log('启用内容过滤');
            } else {
                console.log('禁用内容过滤');
            }
        });
    }
    
    // 角色卡片点击事件
    const aiCards = document.querySelectorAll('.ai-card');
    aiCards.forEach(card => {
        card.addEventListener('click', function() {
            window.location.href = 'chat.html';
        });
    });
}

// 发送消息函数
function sendMessage() {
    const messageInput = document.querySelector('.input-area input');
    const chatContent = document.querySelector('.messages');
    
    if (messageInput && chatContent && messageInput.value.trim() !== '') {
        const messageText = messageInput.value.trim();
        
        // 创建用户消息元素
        const userMessageHTML = `
            <div class="message user-message d-flex mb-4 justify-content-end">
                <div class="message-content text-end">
                    <div class="message-bubble bg-danger p-3 rounded">
                        <p class="mb-0">${messageText}</p>
                    </div>
                    <div class="message-time small text-secondary mt-1">${getCurrentTime()}</div>
                </div>
                <div class="avatar ms-3 align-self-end">
                    <img src="${IMAGES.userAvatar}" alt="用户" class="rounded-circle" width="40" height="40">
                </div>
            </div>
        `;
        
        // 添加用户消息
        chatContent.insertAdjacentHTML('beforeend', userMessageHTML);
        
        // 清空输入框
        messageInput.value = '';
        
        // 滚动到底部
        chatContent.scrollTop = chatContent.scrollHeight;
        
        // 模拟AI回复（在实际应用中，这里应该调用后端API）
        setTimeout(() => {
            simulateAIResponse();
        }, 1000);
    }
}

// 发送快捷回复
function sendQuickReply(text) {
    const chatContent = document.querySelector('.messages');
    
    if (chatContent) {
        // 创建用户消息元素
        const userMessageHTML = `
            <div class="message user-message d-flex mb-4 justify-content-end">
                <div class="message-content text-end">
                    <div class="message-bubble bg-danger p-3 rounded">
                        <p class="mb-0">${text}</p>
                    </div>
                    <div class="message-time small text-secondary mt-1">${getCurrentTime()}</div>
                </div>
                <div class="avatar ms-3 align-self-end">
                    <img src="${IMAGES.userAvatar}" alt="用户" class="rounded-circle" width="40" height="40">
                </div>
            </div>
        `;
        
        // 添加用户消息
        chatContent.insertAdjacentHTML('beforeend', userMessageHTML);
        
        // 滚动到底部
        chatContent.scrollTop = chatContent.scrollHeight;
        
        // 特殊回复会触发特殊AI回应
        setTimeout(() => {
            simulateSpecialAIResponse(text);
        }, 1000);
    }
}

// 模拟AI回复
function simulateAIResponse() {
    const chatContent = document.querySelector('.messages');
    
    // AI回复选项
    const aiResponses = [
        "我明白你的想法。作为一个恶魔猎手，我见过太多人类的黑暗面。",
        "这很有趣，不是吗？在黑暗与光明的边缘游走。",
        "我喜欢你的直接。不需要隐藏，不需要伪装。我们都知道自己在追求什么。",
        "有时候我会想，人类和恶魔，到底谁更可怕？你觉得呢？",
        "这世界上最危险的不是恶魔，而是那些内心已经被黑暗侵蚀却还装作纯洁的人类。"
    ];
    
    // 随机选择一个回复
    const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
    
    // 创建AI消息元素
    const aiMessageHTML = `
        <div class="message ai-message d-flex mb-4">
            <div class="avatar me-3 align-self-end">
                <img src="${IMAGES.character1}" alt="唐纳德" class="rounded-circle" width="40" height="40">
            </div>
            <div class="message-content">
                <div class="message-bubble bg-secondary p-3 rounded">
                    <p class="mb-0">${randomResponse}</p>
                </div>
                <div class="message-time small text-secondary mt-1">${getCurrentTime()}</div>
            </div>
        </div>
    `;
    
    // 添加AI消息
    chatContent.insertAdjacentHTML('beforeend', aiMessageHTML);
    
    // 滚动到底部
    chatContent.scrollTop = chatContent.scrollHeight;
}

// 模拟特殊关键词的AI回复
function simulateSpecialAIResponse(triggerText) {
    const chatContent = document.querySelector('.messages');
    
    let specialResponse = "我不确定我理解你的意思...";
    
    // 根据不同的触发词显示不同回复
    if (triggerText.toUpperCase().includes("FUCK YOU")) {
        specialResponse = "我也很高兴认识你。看来我们有共同的语言习惯。不过，也许我们可以尝试更有建设性的对话方式？";
    }
    
    // 创建AI消息元素
    const aiMessageHTML = `
        <div class="message ai-message d-flex mb-4">
            <div class="avatar me-3 align-self-end">
                <img src="${IMAGES.character1}" alt="唐纳德" class="rounded-circle" width="40" height="40">
            </div>
            <div class="message-content">
                <div class="message-bubble bg-secondary p-3 rounded">
                    <p class="mb-0">${specialResponse}</p>
                </div>
                <div class="message-time small text-secondary mt-1">${getCurrentTime()}</div>
            </div>
        </div>
    `;
    
    // 添加AI消息
    chatContent.insertAdjacentHTML('beforeend', aiMessageHTML);
    
    // 滚动到底部
    chatContent.scrollTop = chatContent.scrollHeight;
}

// 获取当前时间
function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    
    // 确保分钟是两位数
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    return `${hours}:${minutes}`;
}

/**
 * 渲染首页角色列表
 * 根据当前选中的类别过滤并显示角色
 */
function renderHomePageCharacters() {
    // 修改类型选择器的获取方式，同时支持.type和.category选择器
    const activeType = document.querySelector('.type.active span')?.textContent.toLowerCase();
    const activeCategory = document.querySelector('.categories .category.active span')?.textContent.toLowerCase();
    
    // 优先使用type选择器的值，如果没有则使用category选择器，默认为sadism
    const category = activeType || activeCategory || 'sadism';
    console.log('main.js renderHomePageCharacters: 当前活动类别:', category);
    
    const characters = getCharactersByCategory(category);
    
    // 清空当前角色列表
    const container = document.querySelector('.card-container');
    if (container) {
        container.innerHTML = '';
        
        // 添加对应类别的角色卡片
        const displayCount = Math.min(4, characters.length); // 初始显示4个角色
        for (let i = 0; i < displayCount; i++) {
            const card = createCharacterCard(characters[i]);
            container.appendChild(card);
        }
        
        // 重置"加载更多"按钮状态
        const loadMoreBtn = document.querySelector('.btn.btn-outline-danger.rounded-pill');
        if (loadMoreBtn) {
            loadMoreBtn.innerHTML = '加载更多';
            loadMoreBtn.disabled = characters.length <= displayCount;
            
            if (characters.length <= displayCount) {
                loadMoreBtn.innerHTML = '没有更多了';
            }
        }
    }
}

/**
 * 根据类别获取角色列表
 * @param {string} category - 类别名称
 * @returns {Array} - 过滤后的角色数组
 */
function getCharactersByCategory(category) {
    // 检查全局对象中是否存在角色类别数据
    if (window.charactersByCategory && window.charactersByCategory[category]) {
        console.log(`找到类别 ${category} 的角色数据，共 ${window.charactersByCategory[category].length} 个角色`);
        return window.charactersByCategory[category];
    } else if (window.charactersByCategory) {
        console.log(`未找到类别 ${category} 的角色数据，可用类别:`, Object.keys(window.charactersByCategory));
        // 如果类别不存在但charactersByCategory已初始化，返回空数组
        return [];
    }
    
    // 如果charactersByCategory对象不存在，说明角色数据可能尚未加载完成
    console.warn('角色类别数据尚未加载，等待加载完成后重试');
    
    // 添加角色加载完成后的事件监听，在控制台输出调试信息
    document.addEventListener('charactersLoaded', function onCharactersLoaded() {
        console.log('角色数据加载完成，现在可以获取类别数据');
        // 移除事件监听器，避免重复执行
        document.removeEventListener('charactersLoaded', onCharactersLoaded);
    }, { once: true });
    
    return [];
}

/**
 * 创建角色卡片元素
 * @param {Object} character - 角色数据
 * @returns {HTMLElement} - 卡片DOM元素
 */
function createCharacterCard(character) {
    console.log('main.js: 创建角色卡片:', character);
    
    // 创建卡片容器
    const card = document.createElement('div');
    card.className = 'card character-card mx-2 mb-4 p-0';
    card.dataset.id = character.id;
    
    // 设置卡片内容，保持角色原始名称和描述
    card.innerHTML = `
        <div class="position-relative">
            <img src="uploads/avatars/${character.avatar}" class="card-img-top" alt="${character.name}" style="height: 220px; object-fit: contain; background-color: #222;">
            <div class="card-badges position-absolute bottom-0 start-0 m-2">
                <div class="d-flex">
                    <span class="badge rounded-pill bg-danger me-1">
                        <i class="fas fa-eye me-1"></i>13001
                    </span>
                </div>
            </div>
        </div>
        <div class="card-body p-2">
            <h5 class="card-title">${character.name}</h5>
            <p class="card-text small text-white-50">${character.description || '暂无描述'}</p>
            <button class="btn btn-sm btn-danger rounded-pill px-3">开始聊天</button>
        </div>
    `;
    
    // 添加点击事件，跳转到聊天页面
    card.querySelector('button').addEventListener('click', () => {
        location.href = `chat.html?character=${character.id}`;
    });
    
    return card;
}

/**
 * 页面加载完成后执行的初始化代码
 */
document.addEventListener('DOMContentLoaded', () => {
    // 初始化角色列表
    renderHomePageCharacters();
    
    // 添加类别点击事件监听
    const categoryElements = document.querySelectorAll('.categories .category');
    categoryElements.forEach(element => {
        element.addEventListener('click', function() {
            // 移除所有类别的active状态
            categoryElements.forEach(el => el.classList.remove('active'));
            // 为当前类别添加active状态
            this.classList.add('active');
            // 重新渲染角色列表
            renderHomePageCharacters();
        });
    });
    
    // 添加"加载更多"按钮事件监听
    const loadMoreBtn = document.querySelector('.btn.btn-outline-danger.rounded-pill');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const activeCategory = document.querySelector('.categories .category.active span')?.textContent.toLowerCase() || 'sadism';
            const characters = getCharactersByCategory(activeCategory);
            const container = document.querySelector('.card-container');
            const currentCount = container.querySelectorAll('.character-card').length;
            
            // 添加更多角色卡片（最多再加4个）
            const displayMoreCount = Math.min(4, characters.length - currentCount);
            for (let i = 0; i < displayMoreCount; i++) {
                const card = createCharacterCard(characters[currentCount + i]);
                container.appendChild(card);
            }
            
            // 更新按钮状态
            if (currentCount + displayMoreCount >= characters.length) {
                loadMoreBtn.innerHTML = '没有更多了';
                loadMoreBtn.disabled = true;
            }
        });
    }
}); 