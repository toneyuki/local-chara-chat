[Home](../README.md) > 開発中メモ

---

# 開発メモ
## 概要
開発中のメモ

---

electronはローカルで動作する前提。GoogleFontsは開発中は取りに行ってもいいが、<br>
完成前にローカルに同梱する必要あり

---

## 発生したこと
### Electron環境で、railsと同様のフォント設定で日本語が文字化けする
```css
// フォント
$font-family-title: "Fredoka", "DM Sans", sans-serif;
$font-family-main: "DM Sans", sans-serif;
```
- OSにフォントが入っていない
  - wsl（Ubuntu）側に日本語フォントがインストールされておらず、sans-serifで参照する日本語フォントが無い
  - （sudo apt-get installでフォントを入れれば解決するが、環境依存になる）
- Google Fonts からWebフォントを読み込む
  - この際、Content-Security-Policy（CSP）をGoogle Fontsから読み込みを許可するように変える必要がある

--- 

## ファイル構成
electron・React構成に従う

### Renderer
```text
src/renderer/src/
├─ components/
├─ assets/
└─ App.tsx
```

### Styles
```text
assets/styles/
├─ main.scss
├─ base/
├─ layout/
└─ components/
```

### Style Rules
- base: 全体共通
- layout: 画面構造
- components: UI部品

### ファイル例
assets/styles/下

| ファイル | 役割 |
|---|---|
| `main.scss` | `@use` の一覧 |
| `base/_reset.scss` | `margin: 0;` など初期化 |
| `base/_variables.scss` | CSS変数定義 |
| `base/_global.scss` | `body` `button` `input` など |
| `layout/_app.scss` | 2カラム構成、画面サイズ |
| `layout/_sidebar.scss` | 左サイドバー |
| `layout/_main.scss` | 右メイン領域 |
| `components/_tabs.scss` | タブUI |
| `components/_chat-view.scss` | チャットタブのベース |
| `components/_chat-message.scss` | チャットの吹き出し |
| `components/_chat-input.scss` | チャットの入力欄 |
| `components/_model-view.scss` | モデルタブのベース |

## 開発の工夫
### GitHub Issueの利用
#### タグの追加
| Name | Description | Color例 |
|---|---|---|
| `ui` | 画面UI・デザイン関連 | `#3b82f6` |
| `electron` | Electron関連実装 | `#47848f` |
| `llm` | llama.cpp・GGUF・AI関連 | `#8b5cf6` |
| `feature` | 新機能追加 | `#22c55e` |
| `investigation` | 技術調査・検証 | `#f59e0b` |
| `design` | 設計・仕様整理 | `#ec4899` |
| `refactor` | コード整理・改善 | `#64748b` |
| `wip` | 作業中 | `#ef4444` |
元からある以下も利用する
| `documentation` | README・メモ・設計書 | `#0ea5e9` |
| `bug` | 不具合修正 | `#dc2626` |


<details>
<summary>ghコマンドによるタグの追加</summary>

```sh
#!/bin/sh
gh label create ui --description "画面UI・デザイン関連" --color 3b82f6
gh label create electron --description "Electron関連実装" --color 47848f
gh label create llm --description "llama.cpp・GGUF・AI関連" --color 8b5cf6
gh label create feature --description "新機能追加" --color 22c55e
gh label create investigation --description "技術調査・検証" --color f59e0b
gh label create design --description "設計・仕様整理" --color ec4899
gh label create refactor --description "コード整理・改善" --color 64748b
gh label create wip --description "作業中" --color ef4444
```
- 参考
  - https://cli.github.com/manual/gh_label_create
</details>


