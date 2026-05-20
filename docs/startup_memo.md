[Home](../README.md) > 開発環境構築メモ

---

#  開発環境構築メモ
## 概要
環境構築を以下で行う際のメモ
- Windows11
  - WSL(Ubuntu)
    - Node.js
    - Electron
    - React（TypeScript）
    - Sass
    - SQLite3（better-sqlite3）
    - Linux GUI 依存ライブラリ
    - Git（Hub）
    

## WSL 起動
```powershell
wsl
```

## パス
```bash
read -p "project name? " APP_NAME
PROJECT_ROOT="$HOME/projects"
PROJECT_PATH="$PROJECT_ROOT/$APP_NAME"
```

## インストール
### 1. curl
```bash
command -v curl >/dev/null 2>&1 || (sudo apt-get update && sudo apt-get install -y curl)
```

### 2. git
```bash
command -v git >/dev/null 2>&1 || (sudo apt-get update && sudo apt-get install -y git)
```

### 3. nvm
```bash
command -v nvm >/dev/null 2>&1 || curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
source ~/.bashrc
```

### 4. Node.js
Node.jsはLTS版を使用する。

```bash
nvm ls | grep -E 'node.+N/A' && nvm install --lts
```

### 5. pnpm / corepack
```bash
npm install --global corepack@latest
corepack enable pnpm
```

### 6. Electron + React + TypeScript プロジェクト作成
```bash
mkdir -p "$PROJECT_ROOT"
cd "$PROJECT_ROOT"
pnpm create @quick-start/electron "$APP_NAME" --template react-ts
cd "$PROJECT_PATH"
```

### 7. Electron GUI依存ライブラリ
（WSL上のLinuxで動作させるにはLinux環境でGUIアプリケーションを動作させる依存パッケージが必要）
```bash
sudo apt-get update
sudo apt-get install -y \
  libnspr4 \
  libnss3 \
  libatk-bridge2.0-0 \
  libgtk-3-0 \
  libxss1 \
  libasound2t64
```

### 8. 追加パッケージ・Electronバージョン固定
```bash
# Electronのバージョンを固定したい場合
pnpm add -D electron@39.8.10

# SCSSを使う場合
pnpm add -D sass-embedded
```

### 9. install
```bash
# 依存パッケージをインストール
pnpm install --ignore-scripts=false
# pnpmでbuild scriptの承認が必要な場合に実行
pnpm approve-builds
# Electron本体が入っているか確認
pnpm exec electron --version
# ↑で Electron failed to install correctly が出る場合
node node_modules/.pnpm/electron@39.8.10/node_modules/electron/install.js
# 再確認
pnpm exec electron --version 
```

#### インストールやり直すとき
```bash
# node_modulesを削除して入れ直す
rm -rf node_modules

# install scriptを有効にして再インストール
pnpm install --ignore-scripts=false

# build script承認
pnpm approve-builds

# Electron本体を再配置
node node_modules/.pnpm/electron@39.8.10/node_modules/electron/install.js

# Electron確認
pnpm exec electron --version
```

### 10. DB（better-sqlite3）
```bash
pnpm add better-sqlite3
pnpm add -D @types/better-sqlite3

# ネイティブモジュールをElectron向けに再ビルド
pnpm rebuild better-sqlite3

# エラーとなった場合
sudo apt-get update
sudo apt-get install -y python3 make g++ pkg-config

pnpm rebuild better-sqlite3
```

### 11. 起動確認
```bash
pnpm dev
```

---

## その他
### gitignore
#### 参考
https://www.electronjs.org/ja/docs/latest/tutorial/tutorial-first-app<br>
↓<br>
以下をgitignoreへ<br>
https://github.com/github/gitignore/blob/main/Node.gitignore
```bash
cd "$PROJECT_PATH"
curl -L https://raw.githubusercontent.com/github/gitignore/main/Node.gitignore -o .gitignore
```

node_modules等も外す
```bash
cat <<'EOF' >> .gitignore

# Electron
dist-electron
out/

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Local LLM / model files
models/
*.gguf

# sqlite
*.sqlite
*.db

# temp
tmp/
temp/
EOF
```

| 分類 | 対象 | 理由 |
|---|---|---|
| Electron | `dist-electron` | Electronビルド時の生成ファイル。毎回再生成される |
| Electron | `out/` | ビルド成果物や出力ファイル。ソースコードから再生成できる |
| OS | `.DS_Store` | macOSが自動生成する管理ファイル |
| OS | `Thumbs.db` | Windowsが自動生成するサムネイルキャッシュ |
| IDE | `.vscode/` | エディタ個人設定が含まれる場合がある |
| IDE | `.idea/` | JetBrains系IDEの個人設定が含まれる |
| Local LLM / model files | `models/` | Local LLMモデル配置用。容量が非常に大きくなる |
| Local LLM / model files | `*.gguf` | GGUF形式のLLMモデル本体。数GBになる場合がある |
| sqlite | `*.sqlite` | ローカルDBファイル。環境依存データを含む |
| sqlite | `*.db` | ローカルDBファイル。実行時データが保存される |
| temp | `tmp/` | 一時ファイル保存用。削除しても再生成可能 |
| temp | `temp/` | 一時ファイル保存用。実行中のみ必要な場合が多い |


### Git 初期化
```bash
git init
git add .
git commit -m "Initial commit"
```

### GitHub（プライベートリポジトリ）
```bash
## GitHub CLI インストール（未導入の場合）

# sudo apt-get update
# sudo apt-get install gh

## GitHubログイン
# gh auth login --git-protocol https
## ワンタイムパスワードが表示されたら「https://github.com/login/device」をブラウザで開いて入れる 

## GitHubへpush（private）
# gh repo create "$APP_NAME" \
#   --private \
#   --source=. \
#   --remote=origin \
#   --push

## 既存リポジトリへpushする場合
# git remote add origin git@github.com:USER_NAME/REPOSITORY_NAME.git
# git branch -M main
# git push -u origin main
```

---

## バージョン確認
### curl
```bash
curl --version | head -n 1 | awk '{print $1, $2, $3}'
```

### nvm
```bash
nvm -v | awk '{ print "nvm " $0 }'
```

### Node.js
```bash
node --version | awk '{ print "node " $0 }'
```

### pnpm
```bash
pnpm -v | awk '{ print "pnpm " $0 }'
```

### corepack
```bash
corepack -v | awk '{ print "corepack " $0 }'
```
### electron
```bash
node -p "require('electron/package.json').version" | awk '{ print "electron " $0 }'
```

### vite
```bash
node -p "require('vite/package.json').version" | awk '{ print "vite " $0 }'
```

### react
```bash
node -p "require('react/package.json').version" | awk '{ print "react " $0 }'
```

### typescript
```bash
node -p "require('typescript/package.json').version" | awk '{ print "typescript " $0 }'
```

### better-sqlite3
```bash
node -p "require('better-sqlite3/package.json').version"
```

### バージョン確認（まとめて）
```bash
printf "%-12s %s\n" "tool" "version"
printf "%-12s %s\n" "------------" "------------"
printf "%-12s %s\n" "curl"       "$(curl --version 2>/dev/null | head -n 1 | awk '{print $2}' || echo -)"
printf "%-12s %s\n" "nvm"        "$(nvm -v 2>/dev/null || echo -)"
printf "%-12s %s\n" "node"       "$(node --version 2>/dev/null || echo -)"
printf "%-12s %s\n" "pnpm"       "$(pnpm -v 2>/dev/null || echo -)"
printf "%-12s %s\n" "corepack"   "$(corepack -v 2>/dev/null || echo -)"
printf "%-12s %s\n" "electron"   "$(node -p "require('electron/package.json').version" 2>/dev/null || echo -)"
printf "%-12s %s\n" "vite"       "$(node -p "require('vite/package.json').version" 2>/dev/null || echo -)"
printf "%-12s %s\n" "react"      "$(node -p "require('react/package.json').version" 2>/dev/null || echo -)"
printf "%-12s %s\n" "typescript" "$(node -p "require('typescript/package.json').version" 2>/dev/null || echo -)"
printf "%-12s %s\n" "better-sqlite3" "$(node -p "require('better-sqlite3/package.json').version" 2>/dev/null || echo -)"
```

## 発生したこと
### pnpm devで「Missing X server or $DISPLAY」
VS Codeの設定、モジュールバージョン等はすべて問題なかった
- 結果
  - Windows側「WSL Settings」で、オプション機能 > GUIアプリケーションを有効にする がオフになっていた

```sh
yuuki@TONEWORK:~/projects/local-chara-chat$ pnpm dev
Already up to date
Done in 355ms using pnpm v11.1.1
...
[1043:0520/230403.175419:ERROR:ui/ozone/platform/x11/ozone_platform_x11.cc:249] Missing X server or $DISPLAY
[1043:0520/230403.175571:ERROR:ui/aura/env.cc:257] The platform failed to initialize.  Exiting.
```
### 起動できるがVS Code内で赤波線が出る
- 問題
  - pnpm devで起動は可能
  - VS Code内で赤波線「index.ts モジュール 'electron' またはそれに対応する型宣言が見つかりません。」等が発生
  - `tsconfig.node.json`や`index.ts`
- 原因
  - VS CodeでWSL拡張機能を未インストールしていなかった
  - （左下にWSL: Ubuntuが出ていなかった）
- 解決
  - VS CodeでWSL拡張機能をインストール
  - 再度WSL内で`code .`する

### better-sqlite3のビルドエラー
- Electron 42系では better-sqlite3 のビルドに失敗した
- Electron 39.8.10 に固定したら `better-sqlite3` の rebuild が成功した
- `Electron failed to install correctly` が出た場合は `electron/install.js` を直接実行した