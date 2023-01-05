var express = require('express');
var app = express();
var address = "http://127.0.0.1:8545";
const routes = require('./routes')

const uploadUser = require('./middlewares/uploadFiles');
const crypto = require('crypto');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

var Web3 = require('web3');

require("dotenv").config();

const CONTACT_ABI = require('./config');
const CONTACT_ADDRESS = require('./config');

const { application } = require('express');
const fs = require('fs');

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

app.use(routes)

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
