/**
 * @file Google Places API に関する設定ファイル
 * 
 * このモジュールは、Google Places API を使用するための基本URLや
 * 環境変数から読み込まれる API キー、取得件数の制限などを定義しています。
 * 
 * - `GOOGLE_PLACES_BASE_URL`: Google Places API のベースURL
 * - `GOOGLE_APP_API_KEY`: 環境変数から読み込まれる Google API キー
 * - `GOOGLE_PLACES_GET_LIMIT`: Text Search 結果の最大取得数（デフォルトは 5 件）
 * 
 * 他のサービス層やコントローラー層からインポートして使用されます。
 */
require('dotenv').config();

module.exports = {
  GOOGLE_PLACES_BASE_URL: 'https://maps.googleapis.com/maps/api/place',
  GOOGLE_APP_API_KEY: process.env.GOOGLE_API_KEY,
  GOOGLE_PLACES_GET_LIMIT: 5,
  GOOGLE_STATIONS_GET_LIMIT: 5,
  GOOGLE_STATIONS_REDIUS: 1000,
};
