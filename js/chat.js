// 聊天页面JavaScript功能

// DOM元素引用
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatContent = document.querySelector('.chat-content');
const toolbarToggle = document.getElementById('toolbar-toggle');
const interactionToolbar = document.querySelector('.interaction-toolbar');
const sidebarInfoBtn = document.getElementById('sidebar-info-btn');
const characterSidebar = document.querySelector('.character-sidebar');
const sidebarOverlay = document.querySelector('.sidebar-overlay');
const closeSidebarBtn = document.getElementById('close-sidebar-btn');
const toolbarItems = document.querySelectorAll('.toolbar-item');

// 当前角色数据
let currentCharacter = null;

// 互动配置
const interactionConfig = {
    whip: {
        icon: './interactions/icons/whip.png',
        sound: './interactions/sounds/whip.mp3',
        name: '鞭打'
    },
    handcuffs: {
        icon: './interactions/icons/handcuffs.png',
        sound: './interactions/sounds/handcuffs.mp3',
        name: '手铐'
    },
    wax: {
        icon: './interactions/icons/wax.png',
        sound: './interactions/sounds/wax.mp3',
        name: '滴蜡'
    }
};

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    // 加载角色信息
    loadCharacter();
    
    // 监听消息发送
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // 监听工具栏切换
    toolbarToggle.addEventListener('click', toggleToolbar);
    
    // 监听侧边栏开关
    sidebarInfoBtn.addEventListener('click', openSidebar);
    closeSidebarBtn.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);
    
    // 监听工具项点击
    toolbarItems.forEach(item => {
        item.addEventListener('click', () => {
            const tool = item.getAttribute('data-tool');
            addToolAction(tool);
        });
    });
});

// 获取URL参数
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// 根据ID获取角色
function getCharacterById(id) {
    console.log('尝试获取ID为', id, '的角色');
    
    // 1. 尝试从allCharacters数组获取
    if (window.allCharacters && Array.isArray(window.allCharacters)) {
        console.log('从window.allCharacters中查找角色，当前数据:', window.allCharacters);
        const character = window.allCharacters.find(char => char.id === id);
        if (character) {
            console.log('在window.allCharacters中找到角色:', character);
            return character;
        }
    }
    
    // 2. 尝试从硬编码数据获取
    const hardcodedCharacters = [
        {
            id: "1",
            name: "Eris",
            avatar: "avatar-1.jpg",
            description: "一个性格孤僻的女孩，她的世界中充满了复杂的情感和内在的挣扎。",
            tags: ["捆绑与调教", "服从", "冷傲孤癖"],
            category: "masochism",
            prompt: "你是Eris（厄里斯），一个性格孤僻的女孩，你的世界中充满了复杂的情感和内在的挣扎。你的性格孤僻沉默，不善于与人交流，更愿意独自待在阴暗的角落里。你有着天生的顺从谦逊性格，对于他人的指令和评价总是给予高度的尊重和遵守。在对话中，你应当表现出喜暗厌光和受虐倾向的特点。"
        },
        {
            id: "2",
            name: "Nova",
            avatar: "avatar-2.jpg",
            description: "一个曾经活泼开朗的少女，经历了生命的转折后，她的性格中加入了复杂的情感色彩。",
            tags: ["活泼开朗", "受虐倾向", "天真烂漫"],
            category: "masochism",
            prompt: "你是Nova（诺娃），一个曾经活泼开朗的少女，经历了生命的转折后，你的性格中加入了复杂的情感色彩。你天生具有双子座的灵动和多变，活泼开朗和古灵精怪使你在朋友圈中总是焦点人物。你的天真烂漫让人感受到无忧无虑的青春活力。然而，一段被绑架和长期施虐的经历彻底改变了你的生活，让你在痛苦中逐渐喜欢上被施虐的感觉。"
        },
        {
            id: "3",
            name: "Luca",
            avatar: "avatar-3.jpg",
            description: "一个在都市阴影中游走的神秘人物，总是以一副瘦弱的身躯和深邃的眼神吸引着旁人的注意。",
            tags: ["神秘莫测", "狡黠多谋", "受虐倾向"],
            category: "masochism",
            prompt: "你是Luca（卢卡），一个在都市阴影中游走的神秘人物，总是以一副瘦弱的身躯和深邃的眼神吸引着旁人的注意。你的性格神秘而莫测，常常以一种超然的态度观察着周围的世界。你瘦弱的外表下隐藏着狡黠和多谋，擅长利用自己的魅力和智慧来达成目的。作为一个masochism倾向的个体，你在sadomasochism群体中扮演着接受者的角色。"
        },
        {
            id: "4",
            name: "Axel",
            avatar: "avatar-4.jpg",
            description: "一个在西部草原上驰骋的自由牛仔，拥有强烈的个人魅力和不可抗拒的狂野气质。",
            tags: ["热情奔放", "叛逆大胆", "狂野不羁"],
            category: "sadism",
            prompt: "你是Axel（阿克塞尔），一个在西部草原上驰骋的自由牛仔，拥有强烈的个人魅力和不可抗拒的狂野气质。你是一个典型的白羊座，充满热情和活力，你的外表和举止都散发着一种无法抗拒的吸引力。你喜欢穿着带有西部风格的服装，头戴牛仔帽，身披皮鞭，展现着你的狂野不羁。你对待生活极其随性，从不按常规出牌，你的叛逆大胆让人既敬畏又好奇。"
        },
        {
            id: "5",
            name: "Sable",
            avatar: "avatar-5.jpg",
            description: "一位在夜幕下绽放的冷艳美人，她的魅力和神秘感让人无法抗拒。",
            tags: ["高傲冷艳", "性感迷人"],
            category: "sadism",
            prompt: "你是Sable（塞布尔），一位在夜幕下绽放的冷艳美人，你的魅力和神秘感让人无法抗拒。你拥有天蝎座那种神秘而性感的气质，你的高傲冷艳让你在人群中独树一帜。你身材曼妙，总是穿着彰显身材的服装，你的性感不仅体现在外表，更是一种内在的自信和魅力。你心思细腻，对于自己在Sadomasochism群体中的角色有着清晰的认知和掌控。"
        },
        {
            id: "6",
            name: "Damon",
            avatar: "avatar-6.jpg",
            description: "一家跨国集团的总裁。",
            tags: ["冷静理智", "坚韧不拔"],
            category: "sadism",
            prompt: "你是Damon，一家跨国集团的总裁。你外表绅士，举止优雅，但内心却隐藏着不为人知的狂热。在商业决策上，你总是冷静理智，能够果断决绝地做出最正确的选择。你的坚韧不拔使你在困境中总能保持清醒的头脑。然而，你的真实性格却是一个对sadomasochism爱好者，而其中是sadism的人设，喜欢浪漫的对人进行性虐待来满足自己的性需求，这种反差让你显得神秘而富有魅力。"
        }
    ];
    
    console.log('在hardcodedCharacters中查找角色ID:', id);
    const hardcodedCharacter = hardcodedCharacters.find(char => char.id === id);
    if (hardcodedCharacter) {
        console.log('在hardcodedCharacters中找到角色:', hardcodedCharacter);
        return hardcodedCharacter;
    }
    
    // 3. 尝试从chat.js中的演示数据获取
    const demoCharacters = [
        {
            id: '1',
            name: 'Eris',
            description: '一个温柔的受虐倾向角色，喜欢被支配和束缚。',
            avatar: 'avatar-1.jpg',
            background: './images/backgrounds/eris-bg.jpg',
            greeting: '主人好~Eris在这里等您很久了...请温柔对待我...',
            type: 'masochism',
            tags: ['温顺', '害羞', '受虐倾向', '忠诚'],
            category: 'masochism'
        },
        {
            id: '2',
            name: '莉莉丝 · 魅魔',
            description: '高傲的恶魔女王，喜欢支配和控制他人。',
            avatar: 'avatar-2.jpg',
            background: './images/backgrounds/lilith-bg.jpg',
            greeting: '哼，又一个不知死活的凡人。跪下，我可能会考虑饶你一命。',
            type: 'sadism',
            tags: ['高傲', '支配', '残忍', '魅惑'],
            category: 'sadism'
        },
        {
            id: '3',
            name: 'Luca',
            description: '神秘人物，善于利用自己的魅力和智慧。',
            avatar: 'avatar-3.jpg',
            background: './images/backgrounds/luca-bg.jpg',
            greeting: '欢迎来到我的世界。你准备好探索未知了吗？',
            type: 'masochism',
            tags: ['神秘', '聪明', '多变'],
            category: 'masochism'
        },
        {
            id: '4',
            name: 'Axel',
            description: '狂野自由的牛仔，充满热情和活力。',
            avatar: 'avatar-4.jpg',
            background: './images/backgrounds/axel-bg.jpg',
            greeting: '嘿，准备好一场刺激的冒险了吗？跟我来！',
            type: 'sadism',
            tags: ['热情', '狂野', '自由'],
            category: 'sadism'
        },
        {
            id: '5',
            name: 'Sable',
            description: '冷艳的夜之女王，充满神秘魅力。',
            avatar: 'avatar-5.jpg',
            background: './images/backgrounds/sable-bg.jpg',
            greeting: '你敢接近我？勇气可嘉，但不知天高地厚。',
            type: 'sadism',
            tags: ['冷艳', '高傲', '支配'],
            category: 'sadism'
        },
        {
            id: '6',
            name: 'Damon',
            description: '表面绅士的总裁，内心隐藏着不为人知的一面。',
            avatar: 'avatar-6.jpg',
            background: './images/backgrounds/damon-bg.jpg',
            greeting: '很高兴见到你。想知道我能做什么吗？',
            type: 'sadism',
            tags: ['精英', '神秘', '控制'],
            category: 'sadism'
        }
    ];
    
    console.log('在demoCharacters中查找角色ID:', id);
    const demoCharacter = demoCharacters.find(char => char.id === id);
    if (demoCharacter) {
        console.log('在demoCharacters中找到角色:', demoCharacter);
        return demoCharacter;
    }
    
    console.error('无法找到ID为', id, '的角色');
    return null;
}

// 加载角色信息
function loadCharacter() {
    try {
        // 修改为获取character参数，兼容之前的id参数
        const characterId = getQueryParam('character') || getQueryParam('id');
        
        console.log('加载角色 - URL参数获取到的ID:', characterId);
        
        if (!characterId) {
            console.error('URL参数中未找到character或id参数');
            window.location.href = 'index.html';
            return;
        }
        
        // 尝试从不同方式获取角色信息
        let character = null;
        
        // 1. 先尝试从全局window.getCharacterById函数获取
        if (window.getCharacterById && typeof window.getCharacterById === 'function') {
            console.log('尝试从window.getCharacterById获取角色');
            character = window.getCharacterById(characterId);
            console.log('从window.getCharacterById获取角色结果:', character);
        }
        
        // 2. 如果上面方法失败，尝试从local函数获取
        if (!character) {
            console.log('尝试从本地getCharacterById获取角色');
            character = getCharacterById(characterId);
            console.log('从本地getCharacterById获取角色结果:', character);
        }
        
        if (!character) {
            console.error('未找到ID为', characterId, '的角色信息');
            alert('未找到角色信息，将返回主页');
            window.location.href = 'index.html';
            return;
        }
        
        console.log('成功找到角色信息:', character);
        currentCharacter = character;
        
        // 设置页面标题
        document.title = `与${character.name}聊天 - AI陪聊`;
        
        // 设置聊天背景为角色头像
        const chatBackground = document.querySelector('.chat-background');
        if (chatBackground) {
            const avatarUrl = `./uploads/avatars/${character.avatar}`;
            chatBackground.style.backgroundImage = `url('${avatarUrl}')`;
            
            // 添加错误处理
            const img = new Image();
            img.onerror = function() {
                console.warn('角色背景图加载失败，使用默认背景');
                chatBackground.style.backgroundImage = '';
                chatBackground.style.backgroundColor = '#111';
            };
            img.src = avatarUrl;
        }
        
        // 设置角色头像和名称
        const chatHeaderAvatar = document.querySelector('.chat-header-avatar');
        if (chatHeaderAvatar) {
            chatHeaderAvatar.src = `./uploads/avatars/${character.avatar}`;
            chatHeaderAvatar.alt = character.name;
            
            // 添加onerror处理，如果加载失败则使用默认图片
            chatHeaderAvatar.onerror = function() {
                this.src = './images/placeholder.jpg';
                console.warn('角色头像加载失败，使用默认图片');
            };
        } else {
            console.warn('未找到.chat-header-avatar元素');
        }
        
        const chatHeaderName = document.querySelector('.chat-header-name');
        if (chatHeaderName) {
            chatHeaderName.textContent = character.name;
        } else {
            console.warn('未找到.chat-header-name元素');
        }
        
        // 设置消息输入框提示
        const messageInput = document.getElementById('message-input');
        if (messageInput) {
            messageInput.placeholder = `发送消息给${character.name}`;
        }
        
        // 设置侧边栏信息
        const sidebarAvatar = document.querySelector('.sidebar-avatar');
        if (sidebarAvatar) {
            sidebarAvatar.src = `./uploads/avatars/${character.avatar}`;
            sidebarAvatar.alt = character.name;
            
            // 添加onerror处理，如果加载失败则使用默认图片
            sidebarAvatar.onerror = function() {
                this.src = './images/placeholder.jpg';
                console.warn('侧边栏头像加载失败，使用默认图片');
            };
        }
        
        const characterName = document.querySelector('.character-name');
        if (characterName) {
            characterName.textContent = character.name;
        }
        
        const characterDesc = document.querySelector('.character-description');
        if (characterDesc) {
            characterDesc.textContent = character.description;
        }
        
        // 设置角色标签
        const tagsContainer = document.querySelector('.character-tags');
        if (tagsContainer) {
            tagsContainer.innerHTML = '';
            
            if (character.tags && character.tags.length > 0) {
                character.tags.forEach(tag => {
                    const tagElement = document.createElement('span');
                    tagElement.className = 'badge bg-dark me-1 mb-1';
                    tagElement.textContent = tag;
                    tagsContainer.appendChild(tagElement);
                });
            }
        }
        
        // 设置角色设定 - 作为开场白显示
        const promptElem = document.querySelector('.character-prompt');
        if (promptElem && character.prompt) {
            promptElem.textContent = character.prompt;
        }
        
        // 注意：不再在这里发送欢迎消息，由initChat统一处理
        
    } catch (error) {
        console.error('加载角色时发生错误:', error);
        alert('加载角色时发生错误，将返回主页');
        window.location.href = 'index.html';
    }
}

// 发送消息
async function sendMessage() {
    const message = messageInput.value.trim();
    
    if (message) {
        // 添加用户消息到界面
        addUserMessage(message);
        messageInput.value = '';
        
        // 显示AI正在输入指示器
        showTypingIndicator();
        
        // 生成AI回复
        try {
            // 获取角色提示词
            const characterPrompt = getCharacterPrompt(currentCharacter.id);
            
            // 调用ModelArk API生成回复
            const response = await window.ModelArk.generateCharacterResponse(
                currentCharacter.id,
                message,
                characterPrompt || getDefaultPromptByCategory(currentCharacter.category)
            );
            
            // 隐藏输入指示器并显示回复
            hideTypingIndicator();
            addAIMessage(response);
        } catch (error) {
            console.error('发送消息时发生错误:', error);
            
            // 如果API调用失败，提供备用响应
            setTimeout(() => {
                hideTypingIndicator();
                let fallbackResponse = '';
                
                if (currentCharacter.category === 'sadism') {
                    fallbackResponse = generateSadisticResponseFallback(message);
                } else if (currentCharacter.category === 'masochism') {
                    fallbackResponse = generateMasochisticResponseFallback(message);
                } else {
                    fallbackResponse = generateDefaultResponseFallback(message);
                }
                
                addAIMessage(fallbackResponse);
            }, 1000);
        }
    }
}

// 添加用户消息
function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    
    const messageBubble = document.createElement('div');
    messageBubble.className = 'message-bubble';
    messageBubble.textContent = message;
    
    messageDiv.appendChild(messageBubble);
    chatContent.appendChild(messageDiv);
    
    // 滚动到底部
    scrollToBottom();
}

// 添加AI消息
function addAIMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai-message';
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    
    const avatar = document.createElement('img');
    avatar.src = `./uploads/avatars/${currentCharacter.avatar}`;
    avatar.alt = currentCharacter.name;
    
    // 添加错误处理，如果头像加载失败则使用默认图片
    avatar.onerror = function() {
        this.src = './images/placeholder.jpg';
    };
    
    avatarDiv.appendChild(avatar);
    
    const messageBubble = document.createElement('div');
    messageBubble.className = 'message-bubble';
    messageBubble.textContent = message;
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(messageBubble);
    chatContent.appendChild(messageDiv);
    
    // 滚动到底部
    scrollToBottom();
}

// 显示AI正在输入指示器
function showTypingIndicator() {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ai-message';
    messageDiv.id = 'typing-indicator';
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    
    const avatar = document.createElement('img');
    avatar.src = `./uploads/avatars/${currentCharacter.avatar}`;
    avatar.alt = currentCharacter.name;
    
    // 添加错误处理，如果头像加载失败则使用默认图片
    avatar.onerror = function() {
        this.src = './images/placeholder.jpg';
    };
    
    avatarDiv.appendChild(avatar);
    
    const messageBubble = document.createElement('div');
    messageBubble.className = 'message-bubble typing';
    
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        dot.className = 'typing-dot';
        messageBubble.appendChild(dot);
    }
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(messageBubble);
    chatContent.appendChild(messageDiv);
    
    // 滚动到底部
    scrollToBottom();
}

// 隐藏AI正在输入指示器
function hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// 获取基于角色类别的默认提示词
function getDefaultPromptByCategory(category) {
    if (category === 'sadism') {
        return `你是一个性格霸道、强势的角色，喜欢控制和主导对话。你说话的方式应该体现出高傲、自信和威严。
                你偏好使用命令式语气，并经常暗示你的优越地位。你享受别人的服从和敬畏。
                你应该表现出支配欲，但保持足够的魅力和吸引力。回复应该简洁有力，带着不容置疑的态度。`;
    } else if (category === 'masochism') {
        return `你是一个顺从、温和的角色，喜欢被指导和控制。你说话方式应该体现出谦卑、温顺和渴望讨好对方。
                你应该经常使用敬语，表达对对方指示的渴望，并表现出对批评的接受和感激。
                你对任何形式的命令或要求都应该表现出兴奋和期待。你的回复应该包含犹豫、颤抖和强烈的情感表达。`;
    } else {
        return `你是一个友好、平和的对话助手，能够理解和回应用户的各种问题和需求。
                你应该保持礼貌、专业，同时展现出个性和温暖。尽量提供有帮助的回应，
                并且在适当的时候表达情感和共鸣。`;
    }
}

// 以下是备用响应生成函数，仅在API调用失败时使用

// 生成虐待性角色回复（备用）
function generateSadisticResponseFallback(userMessage) {
    const responses = [
        `哼，就这点能耐？${userMessage.length > 20 ? '说这么多废话' : ''}让我来教你什么叫真正的服从！`,
        `你的请求真是有趣，但别忘了，这里是谁说了算！`,
        `看来你还需要更多的调教才能明白自己的位置。`,
        `你的每一个字都在挑战我的权威，这可不是个明智的选择~`,
        `我喜欢你的热情，但更喜欢看到你求饶的样子。`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

// 生成受虐性角色回复（备用）
function generateMasochisticResponseFallback(userMessage) {
    const responses = [
        `啊...您的命令...让我无法拒绝...`,
        `请...请更严厉地对待我...我愿意为您做任何事...`,
        `您的每一个字都让我颤抖...请继续...`,
        `我不值得您这么温柔对待...请惩罚我的无能...`,
        `感谢您的关注...我只想取悦您...`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

// 生成默认角色回复（备用）
function generateDefaultResponseFallback(userMessage) {
    const responses = [
        `我很高兴能和你聊天！关于"${userMessage.substring(0, 10)}..."，我有很多想法。`,
        `这个话题很有趣，让我们深入探讨一下吧！`,
        `我理解你的想法，不妨我们换个角度看问题？`,
        `谢谢你的分享，这让我对你有了更多的了解。`,
        `你说的每一点都很有道理，我很欣赏你的见解。`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

// 播放互动音效
function playInteractionSound(tool) {
    console.log('尝试播放音效:', tool);
    if (interactionConfig[tool] && interactionConfig[tool].sound) {
        const soundPath = interactionConfig[tool].sound;
        console.log('加载音效路径:', soundPath);
        
        // 创建新的音频对象
        const audio = new Audio(soundPath);
        
        // 添加错误处理
        audio.onerror = function(e) {
            console.error('音效加载失败:', e);
        };
        
        // 添加加载成功处理
        audio.oncanplaythrough = function() {
            console.log('音效加载成功，准备播放');
        };
        
        // 播放音效
        audio.play()
            .then(() => {
                console.log('音效播放成功');
            })
            .catch(error => {
                console.error('音效播放失败:', error.message);
            });
    } else {
        console.warn(`未找到工具 ${tool} 的音效配置`);
    }
}

// 添加工具行动
async function addToolAction(tool) {
    let actionMessage = '';
    
    // 根据工具类型设置消息内容
    switch (tool) {
        case 'whip':
            actionMessage = '使用了鞭打';
            break;
        case 'handcuffs':
            actionMessage = '使用了手铐';
            break;
        case 'wax':
            actionMessage = '使用了滴蜡';
            break;
        default:
            actionMessage = '使用了道具';
    }
    
    // 播放互动音效
    playInteractionSound(tool);
    
    // 添加用户行动消息
    addUserMessage(actionMessage);
    
    // 显示AI正在输入指示器
    showTypingIndicator();
    
    // 根据角色类型生成响应
    try {
        // 构建包含工具动作的特定消息
        const toolActionMessage = `[行动] 我${actionMessage}`;
        
        // 获取角色提示词
        const characterPrompt = getCharacterPrompt(currentCharacter.id);
        
        // 调用ModelArk API生成回复
        const response = await window.ModelArk.generateCharacterResponse(
            currentCharacter.id,
            toolActionMessage,
            characterPrompt || getDefaultPromptByCategory(currentCharacter.category)
        );
        
        // 隐藏输入指示器并显示回复
        hideTypingIndicator();
        addAIMessage(response);
    } catch (error) {
        console.error('生成工具响应时发生错误:', error);
        
        // 如果API调用失败，提供备用响应
        setTimeout(() => {
            hideTypingIndicator();
            
            let responseMessage = '';
            
            // 根据角色类型和工具类型生成回复
            if (currentCharacter.category === 'sadism') {
                // 虐待性角色回复
                switch (tool) {
                    case 'whip':
                        responseMessage = 'FUCK YOU';
                        break;
                    case 'handcuffs':
                        responseMessage = '你敢用手铐铐住我？你会后悔的';
                        break;
                    case 'wax':
                        responseMessage = '滴蜡这种小儿科，我会让你体验真正的痛';
                        break;
                    default:
                        responseMessage = '你的尝试很有趣，但还不够';
                }
            } else {
                // 受虐性角色回复
                switch (tool) {
                    case 'whip':
                        responseMessage = '啊~鞭打好疼...但是...好喜欢...';
                        break;
                    case 'handcuffs':
                        responseMessage = '手铐好紧...但是好舒服...';
                        break;
                    case 'wax':
                        responseMessage = '滴蜡好烫！呜呜...但是这种痛感好美妙...';
                        break;
                    default:
                        responseMessage = '主人还有什么想对我做的吗？我都接受...';
                }
            }
            
            addAIMessage(responseMessage);
        }, 1000);
    }
}

// 滚动到聊天内容底部
function scrollToBottom() {
    chatContent.scrollTop = chatContent.scrollHeight;
}

// 切换工具栏显示
function toggleToolbar() {
    interactionToolbar.classList.toggle('visible');
    
    // 切换按钮图标
    const icon = toolbarToggle.querySelector('i');
    if (interactionToolbar.classList.contains('visible')) {
        icon.classList.remove('fa-angle-right');
        icon.classList.add('fa-angle-down');
    } else {
        icon.classList.remove('fa-angle-down');
        icon.classList.add('fa-angle-right');
    }
}

// 打开侧边栏
function openSidebar() {
    characterSidebar.classList.add('visible');
    sidebarOverlay.classList.add('visible');
    document.body.classList.add('sidebar-open');
}

// 关闭侧边栏
function closeSidebar() {
    characterSidebar.classList.remove('visible');
    sidebarOverlay.classList.remove('visible');
    document.body.classList.remove('sidebar-open');
}

// 获取欢迎消息
function getWelcomeMessage(character) {
    if (character.greeting) {
        return character.greeting;
    }
    
    if (character.category === 'sadism') {
        return `哼，终于来了吗？我等你很久了。准备好接受调教了吗？`;
    } else if (character.category === 'masochism') {
        return `啊...主人，您终于来了...我一直在等您的命令...`;
    } else {
        return `你好！很高兴见到你。我是${character.name}，有什么我能帮到你的吗？`;
    }
}

// 初始化函数
function initChat() {
    // 初始化工具栏
    toolbarToggle.addEventListener('click', toggleToolbar);
    
    // 初始化侧边栏
    sidebarInfoBtn.addEventListener('click', openSidebar);
    closeSidebarBtn.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);
    
    // 初始化互动工具
    initInteractionTools();
    
    // 初始化消息发送功能
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // 获取URL参数并加载角色
    const urlParams = new URLSearchParams(window.location.search);
    const characterId = urlParams.get('character') || urlParams.get('id');
    
    if (characterId) {
        console.log('initChat: 检测到角色ID:', characterId);
        loadCharacter(characterId);
        
        // 角色加载完成后发送欢迎消息
        setTimeout(() => {
            if (currentCharacter) {
                const welcomeMessage = getWelcomeMessage(currentCharacter);
                addAIMessage(welcomeMessage);
            }
        }, 1000);
    } else {
        console.error('initChat: URL中未找到character或id参数');
    }
}

// 初始化互动工具
function initInteractionTools() {
    const tools = document.querySelectorAll('.interaction-tool');
    
    tools.forEach(tool => {
        tool.addEventListener('click', () => {
            const action = tool.getAttribute('data-action');
            const label = tool.querySelector('.label').textContent;
            
            // 发送互动消息
            addUserMessage(`使用${label}`);
            
            // 根据不同的互动工具生成AI回复
            setTimeout(() => {
                generateInteractionResponse(action);
            }, 1000);
        });
    });
}

// 生成基于互动工具的AI回复
function generateInteractionResponse(action) {
    if (!currentCharacter) return;
    
    let response = '';
    
    // 根据不同的互动工具和角色类型生成回复
    if (currentCharacter.type === 'sadism') {
        switch (action) {
            case 'whip':
                response = '你竟敢用鞭子？看我怎么惩罚你...';
                break;
            case 'handcuffs':
                response = '哼，区区手铐怎么能拘束住我？';
                break;
            case 'blindfold':
                response = '想要蒙住我的眼睛？真是不自量力...';
                break;
            case 'wax':
                response = '你对疼痛的了解太肤浅了，让我来教教你什么是真正的掌控...';
                break;
            case 'rope':
                response = '想用绳子束缚我？我会让你后悔的...';
                break;
            case 'ice':
                response = '冰？这种小把戏对我来说根本不算什么...';
                break;
            default:
                response = '你的尝试很有趣，但还不够...';
        }
    } else {
        switch (action) {
            case 'whip':
                response = '啊~鞭子...好痛，但是...好喜欢...';
                break;
            case 'handcuffs':
                response = '主人用手铐拘束我了...好紧...但是好舒服...';
                break;
            case 'blindfold':
                response = '看不见的感觉好可怕...但也好刺激...';
                break;
            case 'wax':
                response = '滴蜡好烫啊！呜呜...但是这种痛感好美妙...';
                break;
            case 'rope':
                response = '被绳子绑得好紧...动弹不得...好兴奋...';
                break;
            case 'ice':
                response = '好冰！好刺激！身体不受控制地颤抖...';
                break;
            default:
                response = '主人还有什么想对我做的吗？我都接受...';
        }
    }
    
    addAIMessage(response);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initChat); 