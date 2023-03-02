const express = require("express");
const path = require("path");

const PORT = 3001;
const HOST = '0.0.0.0';

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/public')));

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});