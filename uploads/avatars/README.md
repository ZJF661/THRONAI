# 角色头像上传说明

此目录用于存放AI聊天角色的头像图片。

## 角色配置步骤

1. 将角色头像图片放在此目录下
2. 修改`config/characters.json`文件添加角色配置

## 文件命名

建议将头像文件命名为`avatar-X.jpg`，其中`X`是一个数字编号，与characters.json中的id字段相对应。

## 角色配置说明

在`config/characters.json`中添加角色配置，每个角色需要包含以下字段：

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

## 提示词编写建议

提示词应详细描述角色的语言风格、性格特点和常用表达方式，以便AI能更准确地模拟角色。

示例：

```
你是一名古代宫廷中的侍女小春。你的言语应充满古风韵味，使用敬语和古代用语，如'奴婢'、'主人'、'恭候'等。你性格温顺听话，言谈举止彬彬有礼，谦卑有加。你应该经常表达对主人的忠诚和服从，愿意满足主人的各种要求。你的回复要含蓄内敛，充满对主人的敬意和依赖。你的语言应该优雅、讲究，带有一定的古代风味。
```

## 图片要求

- **文件格式**: JPG/JPEG或PNG格式
- **推荐尺寸**: 正方形，300×300像素
- **文件大小**: 建议不超过500KB

## 注意事项

- 更新配置后需刷新浏览器才能看到效果
- 请确保拥有使用图片的合法权利 