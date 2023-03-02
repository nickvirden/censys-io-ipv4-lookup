const cors = require('cors');
const express = require('express');
const { WebServiceClient } = require('@maxmind/geoip2-node');

const PORT = 3001;
const HOST = '0.0.0.0';

const app = express();

app.use(cors());

app.options('*', cors());

const client = new WebServiceClient('831191', 'DCuaaUACH19M2Wds', { host: 'geolite.info' });

app.get('/api', (req, res) => {
  client.country('142.1.1.1').then(response => {
    console.log(response);
  });

  res.json({ message: 'Hello from server!' });
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});