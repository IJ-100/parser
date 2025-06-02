const express = require('express');
const Mercury = require('./dist/mercury'); // 상대 경로로 import

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/parser', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL' });
  }

  try {
    const result = await Mercury.parse(url, {
      contentType: 'html',
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to parse article', detail: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Mercury Parser API is running on port ${PORT}`);
});
