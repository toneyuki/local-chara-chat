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