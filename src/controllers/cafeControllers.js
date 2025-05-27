const cafeService = require('../services/CafeService');

exports.getCafeInfoList = (req, res) => {
  try {
    const users = cafeService.getCafeInfoList();
    res.status(200).json({ status: 'success', data: users });
  } catch (error) {
    console.error('❌ カフェ候補情報の取得に失敗:', error.message);
    next(error);
  }
};

exports.getNearestStations = (req, res) => {
  const users = cafeService.getNearestStations();
  res.status(200).json({ status: 'success', data: users });
};
