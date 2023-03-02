const cors = require('cors');
const express = require("express");

const PORT = 3001;
const HOST = '0.0.0.0';

const app = express();

app.use(cors());

app.options('*', cors());

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});