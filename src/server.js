const express = require("express");
const Mercury = require("@postlight/mercury-parser");
const app = express();

app.get("/parser", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "No URL provided" });

  try {
    const result = await Mercury.parse(url);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mercury Parser server running on port ${PORT}`);
});
