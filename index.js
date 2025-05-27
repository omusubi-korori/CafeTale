const express = require('express');
const app = express();

const cafeRouter = require('./src/routes/cafe');  // ルーター読み込み
const errorHandler = require('./src/middlewares/errorHandler'); // エラーハンドラー読み込み

app.use(express.json()); // JSONパース用ミドルウェア（必要に応じて）

// ルーター登録（ここでパスのベースを指定）
app.use('/api/cafe', cafeRouter);

// 共通エラーハンドラー（すべてのルーティングの後に登録）
app.use(errorHandler);

// サーバ起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
