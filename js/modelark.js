/**
 * BytePlus ModelArk API 集成模块
 * 用于与BytePlus ModelArk API交互，提供大模型对话功能
 * 文档: https://docs.byteplus.com/en/docs/ModelArk/1399008
 */

// 接入点配置
const MODELARK_ENDPOINT = 'ep-20250331151030-mxwqh';
const API_URL = 'https://ark.ap-southeast.bytepluses.com/api/v3/chat/completions';
const API_KEY = '0e714ef1-a0dd-48d4-bac2-823dc941e5b5';

// 用于存储会话历史记录的对象
const chatSessions = {};

/**
 * 初始化聊天会话
 * @param {string} sessionId - 会话ID，通常是角色ID
 * @param {string} systemPrompt - 系统提示词，用于设置角色人格
 */
function initChatSession(sessionId, systemPrompt) {
    if (!chatSessions[sessionId]) {
        chatSessions[sessionId] = [{
            role: 'system',
            content: systemPrompt || '你是一个友好的AI助手'
        }];
    }
    console.log(`初始化聊天会话 ${sessionId}，系统提示: ${systemPrompt.substring(0, 50)}...`);
}

/**
 * 向聊天会话添加消息
 * @param {string} sessionId - 会话ID
 * @param {string} role - 角色 (user 或 assistant)
 * @param {string} content - 消息内容
 */
function addMessageToSession(sessionId, role, content) {
    if (!chatSessions[sessionId]) {
        initChatSession(sessionId);
    }
    
    chatSessions[sessionId].push({
        role: role,
        content: content
    });
    
    // 保持会话不要太长（保留最近10条消息）
    if (chatSessions[sessionId].length > 11) { // 1个系统消息 + 10条对话
        // 保留系统消息
        const systemMessage = chatSessions[sessionId][0];
        chatSessions[sessionId] = [
            systemMessage, 
            ...chatSessions[sessionId].slice(-10)
        ];
    }
}

/**
 * 向ModelArk API发送请求
 * @param {string} sessionId - 会话ID
 * @returns {Promise<string>} - AI的回复
 */
async function generateModelResponse(sessionId) {
    if (!chatSessions[sessionId]) {
        console.error('会话不存在，无法生成回复');
        return '对不起，出现了一些错误，请稍后再试。';
    }
    
    try {
        console.log('准备发送请求到BytePlus ModelArk API');
        
        const requestData = {
            model: MODELARK_ENDPOINT,  // 直接使用接入点作为模型参数
            messages: chatSessions[sessionId],
            temperature: 0.7,
            max_tokens: 800
        };
        
        console.log('请求数据:', JSON.stringify(requestData));
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify(requestData)
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API请求失败:', response.status, errorText);
            return '对不起，我现在无法回应，请稍后再试。';
        }
        
        const data = await response.json();
        console.log('API响应:', data);
        
        if (data.choices && data.choices.length > 0) {
            const aiResponse = data.choices[0].message.content;
            // 将AI回复添加到会话中
            addMessageToSession(sessionId, 'assistant', aiResponse);
            return aiResponse;
        } else {
            console.error('API响应中没有找到回复内容');
            return '抱歉，我没能理解你的意思，请换个方式表达。';
        }
    } catch (error) {
        console.error('生成回复时发生错误:', error);
        return '抱歉，我遇到了一些技术问题，请稍后再试。';
    }
}

/**
 * 为角色生成回复
 * @param {string} characterId - 角色ID
 * @param {string} userMessage - 用户消息
 * @param {string} characterPrompt - 角色的系统提示词
 * @returns {Promise<string>} - AI回复
 */
async function generateCharacterResponse(characterId, userMessage, characterPrompt) {
    const sessionId = `character_${characterId}`;
    
    // 如果这是第一次对话，初始化会话
    if (!chatSessions[sessionId]) {
        initChatSession(sessionId, characterPrompt);
    }
    
    // 添加用户消息到会话
    addMessageToSession(sessionId, 'user', userMessage);
    
    // 生成回复
    const response = await generateModelResponse(sessionId);
    return response;
}

// 导出函数以便在其他文件中使用
window.ModelArk = {
    generateCharacterResponse
}; 