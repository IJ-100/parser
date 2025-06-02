// server.js (루트에 생성)
const express = require('express');
const Mercury = require('@postlight/mercury-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/parser', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  try {
    const result = await Mercury.parse(url);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Mercury Parser running on port ${PORT}`);
});
