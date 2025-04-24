require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000;
const dbStore = require('./configure/store.js');
const route = require('./router/router.js');

app.use(cors()); 
app.use(express.json()); 

dbStore();

app.use('/', route);

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server running at http://0.0.0.0:${port}`);
});
