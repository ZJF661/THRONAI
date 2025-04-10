# AI聊天应用

一个基于Web的AI聊天应用，允许用户与各种AI角色进行对话交流。

## 功能特点

- 多种AI角色可供选择，包括不同类别和特性
- 自定义头图功能，允许开发者更改网站头图
- 角色管理系统，通过JSON配置文件管理角色信息
- 响应式设计，适配不同设备屏幕
- 黑暗主题界面，提供舒适的用户体验

## 目录结构

```
ai_chat_app/
├── css/                    # CSS样式文件
├── js/                     # JavaScript脚本文件
│   ├── main.js             # 主要JS逻辑
│   ├── images.js           # 图片处理脚本
│   └── characters.js       # 角色管理脚本
├── images/                 # 通用图片资源
├── uploads/                # 用户上传的自定义头图
├── characters/             # 角色相关资源
│   ├── character_config.json  # 角色配置文件
│   └── character_images/   # 角色头像图片
├── index.html              # 首页
├── chat.html               # 聊天页面
├── explore.html            # 发现页面
└── profile.html            # 个人资料页面
```

## 开发指南

### 自定义头图

开发者可以通过将图片放入`uploads`目录来更改网站头图。详细说明请参阅`README-header-image.md`文件。

### 角色管理

应用使用`characters/character_config.json`文件管理所有AI角色的信息。开发者可以通过编辑此文件添加或修改角色。角色头像图片应放置在`characters/character_images/`目录中。

具体使用方法请参考`characters/README.md`文件。

#### 角色配置示例:

```json
{
  "characters": [
    {
      "id": "demon-hunter",
      "name": "唐纳德 恶魔猎手",
      "avatar": "demon-hunter.jpg",
      "description": "一个狂暴血腥的猎魔好对手，喜欢血肉与战斗的疯狂",
      "tags": ["恶魔", "猎手"],
      "status": "hot",
      "preference": "双性恋",
      "opening": "嘿，你好啊猎物，需要我的猎魔服务吗？",
      "personality": "暴力、直接、嗜血",
      "category": "sadism"
    }
  ]
}
```

## 部署说明

本应用是一个纯前端应用，可以通过以下方式部署：

1. 克隆仓库到本地
2. 使用任何HTTP服务器托管项目文件夹
3. 访问服务器提供的URL

示例（使用Python内置服务器）:

```bash
cd ai_chat_app
python3 -m http.server 8080
```

然后在浏览器中访问: http://localhost:8080 