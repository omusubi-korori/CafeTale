/**
 * NotFoundError
 * 指定情報が見当たらない場合の業務上のエラー
 */
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}
module.exports = NotFoundError;