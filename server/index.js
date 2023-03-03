const cors = require('cors');
const express = require('express');
const { WebServiceClient } = require('@maxmind/geoip2-node');

const PORT = 3001;
const HOST = '0.0.0.0';

const app = express();

app.use(cors());
app.use(express.json());

app.options('*', cors());

const client = new WebServiceClient('831191', 'DCuaaUACH19M2Wds', { host: 'geolite.info' });

app.post('/api', async (req, res) => {
  console.log("body:", req.body);
  const response = await client.city(req.body.ipAddress);
  const { longitude, latitude } = response.location;

  res.json({ longitude, latitude });
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});