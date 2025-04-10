# 互动图标和音效配置指南

## 概述

AI聊天应用中的互动功能支持自定义图标和音效。本文档将指导您如何配置这些资源。

## 文件夹结构

互动资源存储在以下文件夹中：

```
ai_chat_app/
└── interactions/
    ├── icons/    # 存放互动图标
    └── sounds/   # 存放互动音效
```

## 支持的互动类型

目前支持以下三种互动：

1. 鞭打 (whip)
2. 手铐 (handcuffs)
3. 滴蜡 (wax)

## 配置图标

您可以为每种互动类型提供自定义图标：

1. 准备您的图标文件（推荐PNG格式，尺寸建议为64x64像素）
2. 将图标文件命名为对应的互动类型名称，例如：`whip.png`
3. 将文件放入 `interactions/icons/` 文件夹

如果没有提供自定义图标，系统将使用默认的Font Awesome图标。

## 配置音效

您可以为每种互动类型提供自定义音效：

1. 准备您的音效文件（MP3格式）
2. 将音效文件命名为对应的互动类型名称，例如：`whip.mp3`
3. 将文件放入 `interactions/sounds/` 文件夹

## 音效文件要求

- 格式：MP3
- 大小：建议不超过500KB，以确保快速加载
- 长度：建议不超过3秒，以获得最佳用户体验

## 配置示例

以"鞭打"互动为例：

1. 创建图标：`interactions/icons/whip.png`
2. 创建音效：`interactions/sounds/whip.mp3`

系统会自动检测并使用这些文件。

## 技术说明

互动配置在 `js/chat.js` 文件中的 `interactionConfig` 对象中定义：

```javascript
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
```

当用户点击互动按钮时，系统会调用 `playInteractionSound()` 函数播放对应的音效。 