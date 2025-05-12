const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/posts', (req, res) => {
  res.json([
    { id: 1, content: 'カフェAの感想です', user: 'ユーザー1' },
    { id: 2, content: 'カフェBも良かった', user: 'ユーザー2' },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});