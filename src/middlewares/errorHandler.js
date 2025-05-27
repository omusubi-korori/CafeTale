/**
 * 共通のエラーハンドリング・ミドルウェア
 */
module.exports = (err, req, res, next) => {
  // エラーオブジェクトに statusCode が指定されていればそれを使い、
  // なければ 500（Internal Server Error）をデフォルトとする
  const status = err.statusCode || 500;

  // クライアントに返すエラーレスポンスを JSON 形式で送信
  res.status(status).json({
    // エラー名があればそれを使い、なければ 'InternalServerError'
    error: err.name || 'InternalServerError',
    // エラーメッセージがあればそれを使い、なければ汎用的なメッセージ
    message: err.message || 'Something went wrong'
  });
};