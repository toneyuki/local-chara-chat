# Electron + React(TypeScript) 開発環境構築

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
```bash
nvm ls | grep -E 'node.+N/A' && nvm install --lts
```

### 5. pnpm / corepack
```bash
npm install --global corepack@latest
corepack enable pnpm
```

### 6. Electron + React + TypeScript
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

### 8. install
```bash
pnpm install

## エラーとなった場合
# build script を許可（a -> Enter -> y）
pnpm approve-builds

# 許可後に再install
pnpm install

# Electron動作確認
pnpm exec electron --version

# 念のため
pnpm rebuild electron
pnpm rebuild esbuild
```

### 9. dev起動
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

---

## バージョン確認（まとめて）

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
```

| 提供元| カテゴリ | パッケージ名 | 役割 |
| :--- | :--- | :--- | :--- |
| **Mozilla** | **共通基盤** | libnspr4 | OSの基本機能を抽象化 |
| **Mozilla** | **暗号通信** | libnss3 | 通信の暗号化と証明書管理 |
| **GNOME** | **支援技術** | libatk-bridge2.0-0 | 補助技術への情報橋渡し |
| **GNOME** | **画面描画** | libgtk-3-0 | GUI部品の描画と制御 |
| **X.Org** | **画面制御** | libxss1 | 離席検知と画面保護制御 |
| **ALSA** | **音声制御** | libasound2t64 | 音声の入出力制御 |

https://packages.debian.org/ja/sid/libnspr4
https://packages.debian.org/ja/sid/libnss3
https://pkgs.alpinelinux.org/package/v3.22/main/x86/libatk-bridge-2.0


https://firefox-source-docs.mozilla.org/nspr/index.html
https://firefox-source-docs.mozilla.org/security/nss/build.html