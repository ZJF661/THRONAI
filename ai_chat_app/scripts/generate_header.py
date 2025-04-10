#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import random
import math

def create_gradient_background(width, height, color1=(20, 20, 40), color2=(60, 20, 80)):
    """创建渐变背景"""
    image = Image.new('RGB', (width, height), color1)
    draw = ImageDraw.Draw(image)
    
    for y in range(height):
        # 计算当前位置的渐变颜色
        r = int(color1[0] + (color2[0] - color1[0]) * y / height)
        g = int(color1[1] + (color2[1] - color1[1]) * y / height)
        b = int(color1[2] + (color2[2] - color1[2]) * y / height)
        
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    return image

def add_particles(image, num_particles=100):
    """添加粒子效果"""
    draw = ImageDraw.Draw(image)
    width, height = image.size
    
    for _ in range(num_particles):
        x = random.randint(0, width)
        y = random.randint(0, height)
        size = random.randint(1, 3)
        opacity = random.randint(50, 200)
        color = (255, 255, 255, opacity)
        
        draw.ellipse([(x, y), (x + size, y + size)], fill=color)
    
    return image

def add_text(image, text="AI 聊天助手", font_size=48):
    """添加文字到图像"""
    draw = ImageDraw.Draw(image)
    width, height = image.size
    
    try:
        # 尝试加载字体，如果失败则使用默认字体
        font = ImageFont.load_default()
    except IOError:
        font = ImageFont.load_default()
    
    # 添加文字阴影
    shadow_offset = 2
    position = (width//2, height//2)
    draw.text((position[0] + shadow_offset, position[1] + shadow_offset), text, font=font, fill=(0, 0, 0, 150), anchor="mm")
    
    # 添加主要文字
    draw.text(position, text, font=font, fill=(255, 255, 255, 255), anchor="mm")
    
    return image

def add_blur_effect(image, radius=2):
    """添加模糊效果"""
    return image.filter(ImageFilter.GaussianBlur(radius))

def create_header_image(width=1200, height=160, output_path=None):
    """创建完整的头图"""
    if output_path is None:
        # 默认保存到uploads/headers目录
        output_path = "uploads/headers/header-image.jpg"
    
    # 确保输出目录存在
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # 创建基础渐变背景
    image = create_gradient_background(width, height, color1=(20, 20, 40), color2=(60, 20, 80))
    
    # 添加粒子效果
    image = add_particles(image, num_particles=150)
    
    # 轻微模糊以创建深度感
    image = add_blur_effect(image, radius=1)
    
    # 添加文字
    image = add_text(image, text="AI 聊天助手", font_size=48)
    
    # 保存图像
    image.save(output_path, quality=95)
    print(f"头图已生成并保存到: {output_path}")
    return output_path

if __name__ == "__main__":
    # 生成头图并保存
    create_header_image() 