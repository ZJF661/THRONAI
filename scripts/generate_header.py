#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import random
import sys

# 确保正确的目录路径
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(SCRIPT_DIR)
OUTPUT_DIR = os.path.join(ROOT_DIR, "uploads", "headers")
OUTPUT_PATH = os.path.join(OUTPUT_DIR, "header-image.jpg")

# 图片尺寸
WIDTH = 1200
HEIGHT = 160

def create_gradient_background(width, height):
    """创建深色渐变背景"""
    # 创建黑色背景
    background = np.zeros((height, width, 3), dtype=np.uint8)
    
    # 添加深色渐变
    for y in range(height):
        for x in range(width):
            # 主要是黑色到深红色的渐变
            r = int(20 + (x / width) * 40)  # 红色渐变从20到60
            g = int(5 + (x / width) * 10)   # 绿色渐变从5到15
            b = int(10 + (x / width) * 15)  # 蓝色渐变从10到25
            background[y, x] = [r, g, b]
    
    return Image.fromarray(background)

def add_particles(img, num_particles=150):
    """添加粒子效果"""
    draw = ImageDraw.Draw(img)
    width, height = img.size
    
    for _ in range(num_particles):
        x = random.randint(0, width)
        y = random.randint(0, height)
        size = random.randint(1, 3)
        
        # 创建不同亮度的粒子
        brightness = random.randint(100, 255)
        color = (brightness, brightness//2, brightness//3, random.randint(50, 180))
        
        draw.ellipse((x, y, x+size, y+size), fill=color)
    
    return img

def add_text(img, text="AI 聊天体验"):
    """添加文字到图片"""
    draw = ImageDraw.Draw(img)
    width, height = img.size
    
    # 尝试多个字体位置
    font_paths = [
        os.path.join(ROOT_DIR, "fonts", "msyh.ttc"),  # 微软雅黑
        "/System/Library/Fonts/STHeiti Light.ttc",     # macOS中文字体
        "/System/Library/Fonts/PingFang.ttc",          # macOS中文字体
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"  # Linux字体
    ]
    
    font_size = 50
    font = None
    
    # 尝试加载字体
    for font_path in font_paths:
        if os.path.exists(font_path):
            try:
                font = ImageFont.truetype(font_path, font_size)
                break
            except Exception as e:
                print(f"无法加载字体 {font_path}: {e}")
    
    # 如果无法加载字体，使用默认字体
    if font is None:
        font = ImageFont.load_default()
        font_size = 30
        print("使用默认字体")
    
    # 计算文本位置 - 居中
    try:
        text_width = draw.textlength(text, font=font)
    except:
        # 对于较老版本的PIL
        text_width = font.getsize(text)[0]
    
    x = (width - text_width) // 2
    y = (height - font_size) // 2
    
    # 添加文字阴影
    shadow_offset = 2
    draw.text((x+shadow_offset, y+shadow_offset), text, fill=(0, 0, 0, 200), font=font)
    
    # 添加主文字
    draw.text((x, y), text, fill=(255, 255, 255, 255), font=font)
    
    return img

def add_blur_effect(img, radius=3):
    """添加模糊效果"""
    return img.filter(ImageFilter.GaussianBlur(radius))

def create_header_image():
    """创建完整的头部图片"""
    # 确保输出目录存在
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # 创建基本图像
    img = create_gradient_background(WIDTH, HEIGHT)
    
    # 添加效果层
    img = add_particles(img)
    img = add_text(img)
    
    # 轻微模糊 - 给粒子效果一个柔和的外观
    img = add_blur_effect(img, radius=1)
    
    # 增加一些随机元素
    draw = ImageDraw.Draw(img)
    width, height = img.size
    
    # 添加一些随机线条效果
    for _ in range(5):
        start_x = random.randint(0, width//4)
        start_y = random.randint(0, height)
        end_x = random.randint(3*width//4, width)
        end_y = random.randint(0, height)
        
        # 创建渐变线条
        for i in range(3):
            offset = i * 2
            alpha = 100 - i * 30
            draw.line(
                (start_x+offset, start_y+offset, end_x+offset, end_y+offset), 
                fill=(200, 50, 50, alpha), 
                width=1
            )
    
    # 保存图像
    img.save(OUTPUT_PATH, quality=95)
    print(f"头部图片已生成并保存到: {OUTPUT_PATH}")
    return OUTPUT_PATH

if __name__ == "__main__":
    try:
        path = create_header_image()
        print(f"成功创建图片: {path}")
        # 显示输出目录的绝对路径，方便查找
        print(f"图片目录绝对路径: {os.path.abspath(OUTPUT_DIR)}")
    except Exception as e:
        print(f"创建图片时出错: {e}")
        sys.exit(1) 