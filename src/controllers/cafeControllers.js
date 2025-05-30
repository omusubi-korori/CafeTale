/**
 * CafeController.js
 * 
 * カフェ関連のAPIエンドポイントを定義するコントローラモジュールです。
 * 
 * 利用サービス:
 * - CafeService: カフェ情報の取得や、最寄駅の取得などのロジックを提供
 * 
 * 提供するエンドポイント:
 * - POST /api/cafes          : カフェ情報一覧の取得（getCafeInfoList）
 * - POST /api/cafes/stations : 最寄駅情報の取得（getNearestStations）
 * 
 * 環境変数:
 * - CAFETALE_SRC_DIR      : ソースディレクトリのルートパス
 * - CAFETALE_SERVICE_DIR  : サービスディレクトリへの相対パス
 * 
 * 注意:
 * - 各メソッドは `cafeService` を通じてビジネスロジックにアクセスします。
 */
// ディレクトリ定義
require('dotenv').config();
const path = require('path');
const CAFETALE_SERVICE_DIR = path.join(path.resolve(process.env.CAFETALE_SRC_DIR), process.env.CAFETALE_SERVICE_DIR);

// サービス定義
const cafeService = require(`${CAFETALE_SERVICE_DIR}cafeServices.js`);


/**
 * カフェ名から候補を取得し、フロントエンドに返却するエンドポイント
 *
 * リクエストクエリ例:
 * - name: 検索するカフェ名
 */
exports.getCafeInfoList = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ status: 'error', message: 'カフェ名 (name) を指定してください。' });
    }

    const cafes = await cafeService.getCafeInfoList(name);
    res.status(200).json({ status: 'success', data: cafes });
  } catch (error) {
    console.error('❌ カフェ候補情報の取得に失敗:', error.message);
    next(error);
  }
};

/**
 * 緯度・経度から近隣の駅情報を取得し、返却するエンドポイント
 *
 * リクエストクエリ例:
 * - lat: 緯度
 * - lng: 経度
 */
exports.getNearestStations = async (req, res, next) => {
  try {
    const { lat, lng } = req.body;
    if (!lat || !lng) {
      return res.status(400).json({ status: 'error', message: '緯度 (lat) および経度 (lng) を指定してください。' });
    }

    const stations = await cafeService.getNearestStations(Number(lat), Number(lng));
    res.status(200).json({ status: 'success', data: stations });
  } catch (error) {
    console.error('❌ カフェ近隣の駅情報の取得に失敗:', error.message);
    next(error);
  }
};
