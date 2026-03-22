# 浙江大学陆俊课题组官网

## 本地预览

```bash
hugo server -D
```

浏览器访问：http://localhost:1313

## 内容更新

### 更新成员信息
编辑 `data/people.yaml`，按格式添加成员：

```yaml
- name: "张三"
  group: "博士生"     # 可选：导师 / 博士后 / 博士生 / 硕士生 / 本科生 / 校友
  grade: "2023级博士生"
  photo: "/images/people/zhangsan.jpg"   # 照片放在 static/images/people/
  research: "高镍三元正极材料"
```

### 更新论文列表
编辑 `data/publications.yaml`：

```yaml
- title: "论文标题"
  authors: "作者1, 作者2, 陆俊*"
  venue: "期刊名称"
  volume: "卷号"
  pages: "页码"
  year: 2024
  type: "journal"    # journal / review
  impact_factor: "15.0"
  doi: "10.xxxx/xxxxx"
```

### 上传图片
- 成员照片：放入 `static/images/people/`
- PI 照片：放入 `static/images/pi-photo.jpg`
- 仪器图片：放入 `static/images/equipment/`
- 科研配图：放入 `static/images/research/`

## 部署到 GitHub Pages

1. 创建 GitHub 仓库（例如 `lujun-lab.github.io`）
2. 修改 `hugo.toml` 中的 `baseURL`
3. 推送代码，GitHub Actions 自动部署

```bash
git add .
git commit -m "初始化课题组网站"
git remote add origin https://github.com/用户名/仓库名.git
git push -u origin main
```

## 网站结构

| 页面 | 路径 | 内容文件 |
|------|------|----------|
| 首页 | `/` | `content/_index.md` |
| 课题组简介 | `/about/` | `content/about/_index.md` |
| 课题组成员 | `/people/` | `data/people.yaml` |
| 科研内容 | `/research/` | `content/research/_index.md` |
| 发表文章 | `/publications/` | `data/publications.yaml` |
| 高端仪器 | `/equipment/` | `content/equipment/_index.md` |
| 产业化进展 | `/industry/` | `content/industry/_index.md` |
| 衢州研究院 | `/qz-institute/` | `content/qz-institute/_index.md` |
