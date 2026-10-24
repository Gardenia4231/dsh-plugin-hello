# dsh-plugin-hello

一个**最小可用的 DSH 组合包（bundle）**，同时也是给 DSH「自定义插件市场」用的示例索引仓库。

安装后，DSH 的输入框里会多出一个斜杠命令：

```text
/hello             → Hello, world! ...
/hello 小明        → Hello, 小明! ...
```

## 仓库里有什么

| 文件 | 作用 |
|---|---|
| `package.json` | 插件包声明；`dsh.bundle.patch` 指向 `cordis.patch.yml`，这一项让 DSH 把它识别为**组合包**而不是普通依赖 |
| `cordis.patch.yml` | 组合包被选中时要插入的插件行（这里插入它自己） |
| `lib/index.js` | Cordis 插件本体：`inject: ['commands']`，注册 `/hello` 命令 |
| `index.json` | 插件市场索引（format 1）：一份**聚合目录**，列出这一版 DSH 自带的 12 个实验性组合包 + 本仓库的示例插件，可搜索、按分类/标签筛选 |

## 直接安装（不经市场）

在 DSH 侧边栏「插件」页选择安装，填入：

```text
git+https://github.com/Gardenia4231/dsh-plugin-hello.git#f96d0c506ea46bd315ef52a0ed4be01b528c544c
```

或让 Creator 模式的 agent 调用 `plugin_manager` 的 `install_bundle`。

## 通过市场安装

1. 在 DSH 里启用实验性组合包 `自定义插件市场`（本仓库的 README 不负责这一步）；
2. 打开「插件 → 发现 → 添加索引源」，填入本仓库 `index.json` 的 raw 链接：

```text
https://raw.githubusercontent.com/Gardenia4231/dsh-plugin-hello/main/index.json
```

3. 列表里会出现 **Hello Command**（另外还有 12 个 DSH 自带的实验性组合包），点安装即可。

## 这份索引里有什么

`index.json` 是聚合目录，共 13 条：

- **官方内置（12 条）**：语音输入、持久终端、Git 工作树、会话搜索、随对话更新的标题、智能体团队、Ralph 循环、自动授权审查、思考过程机器翻译、开发者工具、自定义插件市场、DSH 徽章技能。它们本来就是随 DSH 安装提供的，所以在市场里显示「随 DSH 提供」，主要价值是**能按名字/关键词搜到、能看到说明**；
- **示例（1 条）**：本仓库的 Hello Command，走 git 源，可真正安装。

分类：`official` / `community` / `examples`；标签：`experimental` / `ui` / `tool` / `workflow` / `local` / `starter`。
加新插件时，往 `plugins[]` 里追加一条并更新 `versions[0].source` 的版本或 commit 即可。

## 索引格式要点（format 1）

- 顶层 `format: 1`，`title` 必填，`title`/`description` 既可以是字符串，也可以是 `{ "en": "...", "zh": "..." }`（必须含 `en`）；
- 每个 `versions[]` 必须有 `version`（精确 SemVer）、`publishTimestamp`（Unix 秒）和 `source`；
- `source.type: "git"` 时必须给出规范化 `url`（`https://github.com/user/repo`，不能带 `.git`、查询串或片段）与 40 位小写 commit SHA；包在子目录时加 `path`；
- `metadata.categories` / `labels` / `sortKeys` 里出现的 id 必须在索引的 `metadata` 中先声明，否则校验失败；
- 校验器是 `@deepseek-ai/dsh-plugin-market-index` 的 `parseMarketIndex`。

## 卸载

「插件」页找到本组合包 → 删除。`/hello` 立即消失（有 HMR 时）或重启后消失。
