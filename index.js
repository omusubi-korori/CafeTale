/**
 * @file アプリケーションのエントリーポイント
 * 
 * このファイルは Express アプリケーションの初期化を行い、
 * 各種ルーターやミドルウェア（例: JSONパーサ、エラーハンドラ）を設定し、
 * HTTP サーバを起動します。
 * 
 * 主な構成:
 * - `/api/cafes` パスに対して `cafeRouter` を登録
 * - 共通エラーハンドラー `errorHandler` を使用
 * - 環境変数 `PORT` またはデフォルト 3000 番でサーバ起動
 */
const express = require('express');
const app = express();

const cafeRouter = require('./src/routes/cafe');  // ルーター読み込み
const errorHandler = require('./src/middlewares/errorHandler'); // エラーハンドラー読み込み

app.use(express.json()); // JSONパース用ミドルウェア（必要に応じて）

// ルーター登録（ここでパスのベースを指定）
app.use('/api/cafes', cafeRouter);

// 共通エラーハンドラー（すべてのルーティングの後に登録）
app.use(errorHandler);

// サーバ起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
