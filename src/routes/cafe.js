// routes/cafe.js
const express = require('express');
const router = express.Router();
const { getCafeInfoList } = require('../services/cafeServices');

// ** 1. カフェ検索 **********************************
router.post('/search', async (req, res) => {
  const { name } = req.body;

  try {
    const data = await getCafeInfoList(name);
    res.json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// ** 2. 近くの駅検索 **********************************
router.post('/station-search', async (req, res) => {
  const { name } = req.body;

  try {
    const data = await getNearestStations(name);
    res.json(data);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
