#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
from PIL import Image, ImageDraw, ImageFont

def create_placeholder_image(width=300, height=300, output_path=None):
    """创建一个简单的占位图像，带有占位文本"""
    if output_path is None:
        output_path = "/Users/mahuakeji/Desktop/AI陪聊网页版/ai_chat_app/images/placeholder.jpg"
    
    # 确保输出目录存在
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # 创建一个灰色背景图像
    image = Image.new('RGB', (width, height), (50, 50, 50))
    draw = ImageDraw.Draw(image)
    
    # 在图像中央绘制文本
    try:
        font = ImageFont.load_default()
    except IOError:
        font = ImageFont.load_default()
    
    text = "图像\n加载失败"
    text_color = (200, 200, 200)
    
    # 在图像中央绘制文本
    draw.text((width//2, height//2), text, fill=text_color, font=font, anchor="mm", align="center")
    
    # 保存图像
    image.save(output_path, quality=90)
    print(f"占位图像已生成并保存到: {output_path}")
    return output_path

if __name__ == "__main__":
    # 生成占位图像并保存
    create_placeholder_image() 