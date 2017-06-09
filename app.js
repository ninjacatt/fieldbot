const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment

const app = express();
const ping = require('./controllers/ping');
const newsbot = require('./controllers/news');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

ping.init(app);
newsbot.init(app);

// middleware error handling
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  console.error(err.stack);
  return res.status(500).json({ message: err.message });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
