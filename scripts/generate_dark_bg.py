#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
import random
import math

def create_dark_background(width, height, color=(10, 12, 20)):
    """创建深色背景"""
    return Image.new('RGB', (width, height), color)

def add_grid_lines(image, spacing=40, color=(30, 35, 50)):
    """添加网格线"""
    draw = ImageDraw.Draw(image)
    width, height = image.size
    
    # 水平线
    for y in range(0, height, spacing):
        draw.line([(0, y), (width, y)], fill=color, width=1)
    
    # 垂直线
    for x in range(0, width, spacing):
        draw.line([(x, 0), (x, height)], fill=color, width=1)
    
    return image

def add_digital_particles(image, num_particles=200):
    """添加数字粒子效果"""
    draw = ImageDraw.Draw(image)
    width, height = image.size
    
    # 创建不同大小和颜色的粒子
    for _ in range(num_particles):
        x = random.randint(0, width)
        y = random.randint(0, height)
        size = random.randint(1, 3)
        
        # 随机粒子颜色
        if random.random() < 0.3:  # 30%的粒子使用突出颜色
            r = random.randint(0, 50)
            g = random.randint(50, 120)
            b = random.randint(100, 180)
        else:
            r = random.randint(20, 40)
            g = random.randint(25, 45)
            b = random.randint(40, 60)
        
        draw.rectangle([(x, y), (x + size, y + size)], fill=(r, g, b))
    
    return image

def create_dark_tech_background(width=1920, height=1080, output_path=None):
    """创建完整的深色技术背景"""
    if output_path is None:
        output_path = "/Users/mahuakeji/Desktop/AI陪聊网页版/ai_chat_app/images/dark_tech_bg.jpg"
    
    # 确保输出目录存在
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # 创建基础背景
    bg = create_dark_background(width, height)
    
    # 添加网格线
    bg = add_grid_lines(bg)
    
    # 添加数字粒子
    bg = add_digital_particles(bg)
    
    # 保存图像
    bg.save(output_path, quality=95)
    print(f"深色技术背景已生成并保存到: {output_path}")
    return output_path

if __name__ == "__main__":
    # 生成背景并保存到images目录
    create_dark_tech_background() 