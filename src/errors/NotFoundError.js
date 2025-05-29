/**
 * @file カスタムエラークラス：NotFoundError
 *
 * このクラスは、リソースが見つからなかった場合に使用する HTTP 404 用のエラークラスです。
 * 標準の Error クラスを拡張し、エラーハンドリング時に一貫した形式で利用されます。
 *
 * 使用例：
 *   throw new NotFoundError('指定されたカフェが見つかりませんでした');
 *
 * プロパティ：
 *   - name: エラー名（'NotFoundError'）
 *   - statusCode: HTTP ステータスコード（404）
 */
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}
module.exports = NotFoundError;