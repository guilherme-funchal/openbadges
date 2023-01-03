var express = require('express');
var app = express();
var address = "http://127.0.0.1:8545"

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

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Openbadges API",
      description: "Customer API Information for Openbadges 2.0 By Funchal",
      contact: {
        name: "Openbadges Developer"
      },
      servers: ["http://localhost:3000"]
    }
  },
  // ['.routes/*.js']
  apis: ["app.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Functions for issuers

// Routes
/**
 * @swagger
 * /issuers:
 *  get:
 *    description: Use to request all issuers
 *    responses:
 *      '200':
 *        description: A successful response
 */

app.get('/issuers', async function (req, res) {
  var web3 = new Web3(address);
  var issuer_identificado = [];

  var contratoInteligente = new web3.eth.Contract(CONTACT_ABI.CONTACT_ABI, CONTACT_ADDRESS.CONTACT_ADDRESS);
  console.log(contratoInteligente);

  let issuers = await contratoInteligente.methods.getItemsIssuer().call(function (err, res) {
    if (err) {
      console.log("Ocorreu um erro", err)
      return
    }
  });

  const quantidade = issuers.length + 1;

  for (var i = 1; i < quantidade; i++) {
   
    let issuer = await contratoInteligente.methods.getIssuerByID(i).call(function (err, res) {
      if (err) {
        console.log("Ocorreu um erro", err)
        return
      }

    });

    if (issuer['0'] !== "") {
      issuer_identificado.push({
        entityType: "Issuer",
        entityId: issuer['0'],
        openBadgeId: "http://api.serpro.gov.br/public/issuers/" + issuer['0'],
        createAt: issuer['3'],
        createBy: issuer['4'],
        name: issuer['1'],
        image: issuer['6'],
        email: issuer['8'],
        description: issuer['2'],
        url: issuer['9'],
        staffId: issuer['7'],
        userId: issuer['5'],
        extensions: "",
        badgrDomain: ""       
      });
    }
  }
  
    res.status(200).send(issuer_identificado);

});

// Functions for assertions

// Routes
/**
 * @swagger
 * /assertions:
 *  get:
 *    description: Use to request all assertions
 *    responses:
 *      '200':
 *        description: A successful response
 */

app.get('/assertions', async function (req, res) {
  var web3 = new Web3(address);
  var assertions_identificado = [];

  var contratoInteligente = new web3.eth.Contract(CONTACT_ABI.CONTACT_ABI, CONTACT_ADDRESS.CONTACT_ADDRESS);
  console.log(contratoInteligente);

  let assertions = await contratoInteligente.methods.getItemsIssuer().call(function (err, res) {
    if (err) {
      console.log("Ocorreu um erro", err)
      return
    }
  });

  const quantidade = assertions.length + 1;

  for (var i = 1; i < quantidade; i++) {
   
    let assertion = await contratoInteligente.methods.getAssertionByID(i).call(function (err, res) {
      if (err) {
        console.log("Ocorreu um erro", err)
        return
      }

    });

    if (assertion['0'] !== "") {
      assertions_identificado.push({
        entityId: assertion['0'],
        createdAt: assertion['1'],
        image: assertion['2'],
        isssuerId: assertion['3'],
        badgeclassId: assertion['4'],
        recipienteId: assertion['5'],
        issueOn: assertion['6'],
        revoked: assertion['7'],
        revocationReason: assertion['8'],
        expires: assertion['9']
      });
    }
    
  }
  
    res.status(200).send(assertions_identificado);

});

// Functions to BadgeClass

// Routes
/**
 * @swagger
 * /badgeclass:
 *  get:
 *    description: Use to request all badge class
 *    responses:
 *      '200':
 *        description: A successful response
 */

app.get('/badgeclass', async function (req, res) {
  var web3 = new Web3(address);
  var badge_identificado = [];

  var contratoInteligente = new web3.eth.Contract(CONTACT_ABI.CONTACT_ABI, CONTACT_ADDRESS.CONTACT_ADDRESS);
  console.log(contratoInteligente);

  let badges = await contratoInteligente.methods.getItemsBadgeClass().call(function (err, res) {
    if (err) {
      console.log("Ocorreu um erro", err)
      return
    }
  });

  const quantidade = badges.length + 1;

  for (var i = 1; i < quantidade; i++) {
   
    let badge = await contratoInteligente.methods.getBadgeClassByID(i).call(function (err, res) {
      if (err) {
        console.log("Ocorreu um erro", err)
        return
      }

    });

    if (badge['0'] !== "") {
      badge_identificado.push({
        entityId: badge['0'],
        createdAt: badge['1'],
        createdBy: badge['2'],
        issuerId: badge['3'],
        name: badge['4'],
        image: badge['5'],
        description: badge['6'],
        criteriaUrl: badge['7'],
        alignmentsTargetName: badge['8'],
        alignmentsTargetUrl: badge['9'],
        alignmentsTargetDescription: badge['10'],
        alignmentsTargetFramework: badge['11'],
        alignmentsTargetCode: badge['12'],
        tags: badge['13'],
        expiresAmount: badge['14'],
        expiresDuration: badge['15']
      });
    }
  }
  
    res.status(200).send(badge_identificado);

});


app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});