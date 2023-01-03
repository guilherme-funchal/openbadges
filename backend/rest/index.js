var express = require('express');
var app = express();
var address = "http://127.0.0.1:8545"

const uploadUser = require('./middlewares/uploadFiles');
const crypto = require('crypto');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

var Web3 = require('web3')

require("dotenv").config();

const CONTACT_ABI = require('./ado');
const CONTACT_ADDRESS = require('./contract');
const { application } = require('express');
const fs = require('fs');

