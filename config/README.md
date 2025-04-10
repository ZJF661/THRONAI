# 角色配置说明

此目录包含AI聊天应用的配置文件。

## 主要配置文件

- `characters.json` - 包含所有角色的配置信息

## 角色配置格式

每个角色需要包含以下字段：

```json
{
  "id": "角色ID（如：1、2、3等）",
  "name": "角色名称",
  "avatar": "头像文件名（如：avatar-1.jpg）",
  "description": "角色简短描述",
  "tags": ["标签1", "标签2"],
  "category": "类别（sadism或masochism）",
  "prompt": "角色提示词（用于指导AI如何扮演该角色）"
}
```

## 添加新角色步骤

1. 将角色头像放在 `uploads/avatars/` 目录下
2. 在 `characters.json` 文件中添加新角色的配置
3. 刷新浏览器查看效果

## 角色类别说明

目前支持两种角色类别：

- `sadism` - S类角色，在首页上方"sadism"分类下显示
- `masochism` - M类角色，在首页上方"masochism"分类下显示

## 注意事项

- 确保JSON格式正确，特别是引号、逗号等
- 角色ID必须唯一
- 提示词越详细，AI扮演角色的效果越好 