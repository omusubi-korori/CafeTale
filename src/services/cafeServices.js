require('dotenv').config();
const NotFoundError = require('../errors/NotFoundError');
const axios = require('axios');
const {
    GOOGLE_PLACES_BASE_URL,
    GOOGLE_APP_API_KEY,
    GOOGLE_PLACES_GET_LIMIT
} = require('../config/api');

/**
 * カフェ名から候補の詳細情報を複数取得
 * @param {string} cafeName - 例: "スターバックス 渋谷"
 * @param {number} maxResults - 取得する最大件数（デフォルト5）
 * @returns {Array} - カフェの詳細情報リスト
 */
async function getCafeInfoList(cafeName, maxResults = `${GOOGLE_PLACES_GET_LIMIT}`) {
  try {
    // Step 1: カフェ候補の検索（Places API: Text Search）
    const searchRes = await axios.get(`${GOOGLE_PLACES_BASE_URL}/textsearch/json`, {
      params: {
        query: cafeName,
        language: 'ja',
        key: GOOGLE_APP_API_KEY,
      },
    });
    // APIエラーを確認
    if (searchRes.data.status !== 'OK') {
      throw new Error(`Google API status: ${searchRes.data.status}`);
    }

    // 全件から指定件数を取得
    const places = searchRes.data.results.slice(0, maxResults);
    if (!places.length) {
      throw new NotFoundError('カフェが見つかりませんでした: ' + cafeName);
    }

    // Step 2: カフェの詳細情報取得
    const detailPromises = places.map(async (place) => {
      const detailsRes = await axios.get(`${GOOGLE_PLACES_BASE_URL}/details/json`, {
        params: {
          place_id: place.place_id,
          language: 'ja',
          key: GOOGLE_APP_API_KEY,
          fields: 'formatted_address,geometry,address_components,name',
        },
      });
      // APIエラーを確認
      if (detailsRes.data.status !== 'OK') {
        throw new Error(`Google API status: ${detailsRes.data.status}`);
      }

      const details = detailsRes.data.result;
      // 取得できない場合
      if (!details) {
        throw new Error(`詳細情報が取得できませんでした（place_id: ${place.place_id}）`);
      }

      // 都道府県・市区町村の抽出
      const getComponent = (type) =>
        details.address_components.find((c) => c.types.includes(type))?.long_name || null;
//console.log(JSON.stringify(details, null, 2));

      const prefecture = getComponent('administrative_area_level_1');
      const city = getComponent('locality') || null;
      const subcity = getComponent('sublocality_level_2') || null; 

      /**
        "placeId": "ChIJR4fczVeLGGARWVp2HGalka0",
        "name": "スターバックス コーヒー 渋谷マークシティ店",
        "fullAddress": "日本、〒150-0043 東京都渋谷区道玄坂１丁目１２−３ 渋谷マークシティ イースト 3F",
        "latitude": 35.65871910000001,
        "longitude": 139.6997413,
        "prefecture": "東京都",
        "city": "渋谷区",
        "subcity": "道玄坂"
      */
      return {
        placeId: place.place_id,
        name: details.name,
        fullAddress: details.formatted_address,
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
        prefecture,
        city,
        subcity
      };
    });

    const detailedResults = await Promise.all(detailPromises);
    return detailedResults;
  } catch (error) {
    console.error('❌ カフェ候補情報の取得に失敗:', error.message);
    throw error;
  }
}

/**
 * 緯度・経度から近くの駅情報を取得
 * @param {number} lat
 * @param {number} lng
 * @param {number} max
 * @returns {Promise<Array<{name: string, address: string, location: object}>>}
 */
async function getNearestStations(lat, lng, max = 5) {
  // API 呼び出し処理...
}


module.exports = { getCafeInfoList, getNearestStations };