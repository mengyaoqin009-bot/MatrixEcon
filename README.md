# MatrixEcon

解构经济矩阵，开源实证代码。

MatrixEcon 是面向研究生与青年学者的双语研究知识库，连接顶刊文献、计量方法和可复现实证代码。

## 永久网址

<https://mengyaoqin009-bot.github.io/MatrixEcon/>

每次推送到 GitHub `main` 分支后，GitHub Pages 会自动构建并更新网站。

## 本地运行

```bash
npm install
npm run dev
```

固定使用 `http://127.0.0.1:4173/`：

```bash
npm run start:local
```

Windows 也可以直接双击项目根目录中的 `启动 MatrixEcon.cmd`。启动器会在后台启动本地服务，并自动打开浏览器。

> `127.0.0.1` 是本机临时地址，只有服务进程正在运行时才能访问。若需要关闭电脑后仍可通过固定网址访问，需要将网站部署到公网托管服务并配置域名。

## 内容结构

- `Paper Matrix`：顶刊文献库与论文详情页
- `Estimator Core`：计量与因果推断方法库
- `Vector Space`：Stata、R、Python 代码与复现记录

联系邮箱：qin_mengyao@126.com
