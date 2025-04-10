#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

def create_header_image(output_path, width=1200, height=160):
    """
    创建一个高品质的AI聊天应用头部图片
    
    参数:
        output_path: 输出图片的保存路径
        width: 图片宽度
        height: 图片高度
    """
    # 创建深色背景
    background_color = (15, 15, 20)
    img = Image.new('RGB', (width, height), background_color)
    draw = ImageDraw.Draw(img)
    
    # 添加渐变效果
    for i in range(height):
        alpha = int(255 * (1 - i / height * 1.2))
        if alpha < 0:
            alpha = 0
        highlight_color = (50, 90, 150, alpha)
        draw.line([(0, i), (width, i)], fill=highlight_color)
    
    # 添加光点效果
    np.random.seed(42)  # 为了可重复性
    for _ in range(50):
        x = np.random.randint(0, width)
        y = np.random.randint(0, height)
        size = np.random.randint(2, 8)
        brightness = np.random.randint(100, 200)
        draw.ellipse([(x-size, y-size), (x+size, y+size)], 
                    fill=(brightness, brightness, brightness, 150))
    
    # 添加网格线条
    line_color = (40, 60, 100, 30)
    for x in range(0, width, 50):
        draw.line([(x, 0), (x, height)], fill=line_color, width=1)
    for y in range(0, height, 20):
        draw.line([(0, y), (width, y)], fill=line_color, width=1)
    
    # 添加应用名称
    try:
        # 尝试加载字体，如果不存在使用默认字体
        font_path = "/System/Library/Fonts/STHeiti Light.ttc"
        title_font = ImageFont.truetype(font_path, 48)
        subtitle_font = ImageFont.truetype(font_path, 24)
    except IOError:
        # 使用默认字体
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
    
    # 应用标题
    title = "AI 聊天助手"
    title_color = (220, 220, 255)
    title_position = (width // 2, height // 2 - 20)
    
    # 添加阴影效果
    for offset in [(2, 2), (2, -2), (-2, 2), (-2, -2)]:
        shadow_position = (title_position[0] + offset[0], title_position[1] + offset[1])
        draw.text(shadow_position, title, font=title_font, fill=(0, 0, 0, 100), anchor="mm")
    
    # 主标题
    draw.text(title_position, title, font=title_font, fill=title_color, anchor="mm")
    
    # 副标题
    subtitle = "与AI角色进行沉浸式对话"
    subtitle_color = (180, 180, 220)
    subtitle_position = (width // 2, height // 2 + 20)
    draw.text(subtitle_position, subtitle, font=subtitle_font, fill=subtitle_color, anchor="mm")
    
    # 添加高光效果
    highlight = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    highlight_draw = ImageDraw.Draw(highlight)
    
    # 顶部高光
    for i in range(30):
        alpha = int(150 * (1 - i / 30))
        highlight_draw.line([(0, i), (width, i)], fill=(255, 255, 255, alpha))
    
    # 应用高光
    img = Image.alpha_composite(img.convert('RGBA'), highlight)
    
    # 应用轻微模糊
    img = img.filter(ImageFilter.GaussianBlur(radius=1))
    
    # 保存图片
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    img = img.convert('RGB')
    img.save(output_path, quality=95)
    print(f"头部图片已成功创建并保存到: {output_path}")
    
    return img

if __name__ == "__main__":
    # 获取脚本当前目录
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 获取项目根目录
    project_root = os.path.dirname(current_dir)
    
    # 图片输出路径
    output_path = os.path.join(project_root, "images", "header-image.jpg")
    
    # 创建图片
    create_header_image(output_path) 