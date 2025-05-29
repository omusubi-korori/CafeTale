/**
 * @file Cafe関連のルーティング定義
 * 
 * このモジュールは、カフェ情報検索および近隣駅情報の取得に関する
 * エンドポイントを提供します。
 * 
 * エンドポイント一覧:
 *  - POST /cafe           : カフェ名から候補情報を取得（Google Places API経由）
 *  - POST /cafe/stations  : 緯度・経度から近隣の駅情報を取得
 * 
 * 各ルートは `controllers/cafeControllers.js` 内のコントローラ関数にルーティングされています。
 */
require('dotenv').config();

// routes/cafe.js
const express = require('express');
const router = express.Router();

// ディレクトリ定義
const path = require('path');
const CAFETALE_CONTROLLER_DIR = path.join(path.resolve(process.env.CAFETALE_SRC_DIR), process.env.CAFETALE_CONTROLLER_DIR);

// サービス定義
const cafeController = require(`${CAFETALE_CONTROLLER_DIR}cafeControllers`);

// ** 1. カフェ検索
router.post('', cafeController.getCafeInfoList);
// ** 2. 近くの駅検索
router.post('/stations', cafeController.getNearestStations);

module.exports = router;
