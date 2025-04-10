# 头部图像 (header-image) 文档

## 概述

本项目中的头部图像(header-image)是一个高160像素、宽1200像素的图片，用于在应用的各个页面顶部显示。头部图像使用Python脚本自动生成，具有深色渐变背景和粒子效果，非常适合深色主题的应用界面。

## 图像位置

头部图像保存在以下位置：
```
/uploads/headers/header-image.jpg
```

## 如何使用

头部图像在多个HTML页面中使用：

1. **index.html** (首页)
   ```html
   <div class="hero-image" style="background-image: url('./uploads/headers/header-image.jpg');">
       <div class="hero-overlay"></div>
   </div>
   ```

2. **explore.html** (发现页)
   ```html
   <div class="hero-image" style="background-image: url('./uploads/headers/header-image.jpg');">
       <div class="overlay"></div>
   </div>
   ```

3. **chat.html** (聊天页)
   ```html
   <div class="hero-image" style="background-image: url('./uploads/headers/header-image.jpg');">
       <div class="hero-overlay"></div>
   </div>
   ```

4. **profile.html** (个人资料页)
   ```html
   <div class="hero-image" style="background-image: url('./uploads/headers/header-image.jpg');">
       <div class="overlay"></div>
   </div>
   ```

## 样式定义

头部图像的样式在`css/style.css`中定义：

```css
.hero-image {
    height: 160px;
    overflow: hidden;
    position: relative;
    margin-bottom: 10px;
    background-size: cover;
    background-position: center;
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%);
    pointer-events: none;
}
```

## 如何重新生成

头部图像可以使用项目提供的Python脚本重新生成：

```bash
cd ai_chat_app
python3 scripts/generate_header.py
```

脚本会在`uploads/headers/`目录中生成新的`header-image.jpg`文件。

## 自定义

如果您想使用自己的图像，可以直接替换`uploads/headers/header-image.jpg`文件，或修改HTML中的背景图像URL。只需确保新图像维持16:3的宽高比，以确保在应用中正确显示。

对于高级自定义，您可以修改`scripts/generate_header.py`脚本，调整以下参数：
- 图像尺寸
- 背景颜色和渐变
- 粒子效果
- 文本内容和样式

## 注意事项

- 确保头部图像的文件大小适中，以避免页面加载缓慢
- 如果您更换了图像，请确保它与应用的整体设计风格相匹配
- 对于移动设备，请确保图像在较小的屏幕上也能正常显示 