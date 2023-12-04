const express = require('express');
const knexFile = require('./knexfile');
const knex = require('knex')(knexFile.development);
const app = express();
const port = 8081;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});