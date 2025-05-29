/**
 * 共通ロガー設定ファイル
 *
 * Winston を使用してログをファイル・コンソールに出力する設定を行う。
 * - エラーログは logs/error.log に出力
 * - すべてのログは logs/combined.log に出力
 * - 開発環境ではコンソールにも出力
 *
 * 他のモジュールから `logger.info(...)` のように利用可能。
 */
// winston モジュールから必要なコンポーネントをインポート
const { createLogger, format, transports } = require('winston');

// ロガーの設定を作成
const logger = createLogger({
  // ログの最低レベルを指定（これ以下の重要度は記録されない）
  level: 'info', // 'error', 'warn', 'info', 'verbose', 'debug', 'silly'

  // ログ出力のフォーマットを設定
  format: format.combine(
    // タイムスタンプを付与（指定フォーマット）
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),

    // ログの出力フォーマット（カスタム定義）
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),

  // 出力先の設定（トランスポート）
  transports: [
    // エラーレベルのログは error.log に出力
    new transports.File({ filename: 'logs/error.log', level: 'error' }),

    // 全レベルのログは combined.log に出力
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

// 開発環境（本番以外）の場合はコンソール出力も追加
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple(), // 簡易フォーマットで出力
    })
  );
}

// 他のモジュールから使えるようにエクスポート
module.exports = logger;