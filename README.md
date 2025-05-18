# Nap Timer

社内での仮眠をサポートする、エヴァンゲリオン風のカウントダウンタイマーです。

## セットアップ

1. [Node.js](https://nodejs.org/) (バージョン18以降) をインストールします。
2. リポジトリをクローンしたら依存関係をインストールします。

```bash
npm install
```

## 開発用サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` (Viteのデフォルトポート) を開くと動作を確認できます。

## ビルド方法

```bash
npm run build
```

`dist/` ディレクトリに静的ファイルが出力されます。GitHub Pages などの静的ホスティングにそのまま配置できます。

## デプロイ

このリポジトリには GitHub Actions のワークフローが含まれており、`main` ブランチに変更が push されるたびにビルドを行い、`dist/` の内容を GitHub Pages に自動で公開します。
