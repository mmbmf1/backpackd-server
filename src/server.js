const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/api/*", (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = { app };

// const app = require("./app");
// const { PORT } = require("./config");

// app.listen(PORT, () => {
//   console.log(`Server is listening at http://localhost:${PORT}`);
// });
