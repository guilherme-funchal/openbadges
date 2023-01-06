var Web3 = require('web3');
var address = "http://127.0.0.1:8545";
var moment = require('moment');
const short = require('short-uuid');
require("dotenv").config();

const CONTACT_ABI = require('./../config');
const CONTACT_ADDRESS = require('./../config');
const { application } = require('express');
const fs = require('fs');
const http = require('http');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
var Web3 = require('web3');
require("dotenv").config();


module.exports = {
  async list(req, res) {
    var web3 = new Web3(address);
    var assertions_identificado = [];
  
    var contratoInteligente = new web3.eth.Contract(CONTACT_ABI.CONTACT_ABI, CONTACT_ADDRESS.CONTACT_ADDRESS);
  
    let assertions = await contratoInteligente.methods.getItemsAssertion().call(function (err, res) {
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
  
    //   if (assertion['0'] !== "0") {

        console.log(assertion['7']); 
        assertions_identificado.push({
          type: "Assertion",  
          id: "https://openbadges.serpro.gov.br/public/assertions/" + assertion['1'],
          "@context": "https://w3id.org/openbadges/v2",
          recipient: assertion['6'],
          issueOn: assertion['7'],  
          image: assertion['3'],
        //   isssuerId: assertion['4'],
        //   badgeclassId: assertion['5'],
        //   recipienteId: assertion['6'],
          revoked: assertion['8'],
          verification: {
            type: "HostedBadge"
          },
        //   revocationReason: assertion['9'],
          "extensions:recipientProfile":{"name": "email@mail.com",
          "@context": "https://openbadgespec.org/extensions/recipientProfile/context.json",
          "type": [
            "Extension",
            "extensions:RecipientProfile"
          ]}
        });
      }   
    // }
    
      res.status(200).send(assertions_identificado);  
  },

  async insert(req, res) {
      var time = new Date().getTime();
      file = "burning.png"
      var now = moment()
      .utcOffset('-03:00')
      .format('DD/MM/YYYY hh:mm:ss a');
    //   let entityId = String(crypto.randomUUID());
      let entityId = String(short.generate());
      let createdAt = String(now);
      let image = "https://openbadges.serpro.gov.br/public/assertions/" + file + "/image"
      let issuerId = String(req.body.issuerId);
      let badgeclassId = String(req.body.badgeclassId);
      let recipientId = String(req.body.recipientId);
      let issuedOn = String(now);
      let revoked = false;
      let revocationReason = false;
      let expires = String(req.body.expires);

      const network = process.env.ETHEREUM_NETWORK;

      const web3 = new Web3(
          new Web3.providers.HttpProvider(
              `${address}`
          )
      );


      const signer = web3.eth.accounts.privateKeyToAccount(
          process.env.SIGNER_PRIVATE_KEY
      );

      web3.eth.accounts.wallet.add(signer);

      var contratoInteligente = new web3.eth.Contract(CONTACT_ABI.CONTACT_ABI, CONTACT_ADDRESS.CONTACT_ADDRESS);

      const tx = contratoInteligente.methods.setAssertion(
          entityId,
          createdAt,
          image,
          issuerId,
          badgeclassId,
          recipientId,
          issuedOn,
          revoked,
          revocationReason,
          expires
      )

      const receipt = await tx
          .send({
              from: signer.address,
              gas: await tx.estimateGas(),
          })
          .once("transactionHash", (txhash) => {
              console.log(`Dados enviados com sucesso ...`);
          });
      console.log(`Dados inseridos -> ${receipt.blockNumber}`);
      res.status(200).send(`Dados inseridos no bloco ${receipt.blockNumber}`);
  },

  async revoke(req, res) {
    let id = String(req.body.id);
    let revoked = String(req.body.revoked);
    let revocationReason = String(req.body.revocationReason);

    const network = process.env.ETHEREUM_NETWORK;

    const web3 = new Web3(
        new Web3.providers.HttpProvider(
            `${address}`
        )
    );


    const signer = web3.eth.accounts.privateKeyToAccount(
        process.env.SIGNER_PRIVATE_KEY
    );

    web3.eth.accounts.wallet.add(signer);

    var contratoInteligente = new web3.eth.Contract(CONTACT_ABI.CONTACT_ABI, CONTACT_ADDRESS.CONTACT_ADDRESS);

    const tx = contratoInteligente.methods.revokeAssertion(
        id,
        revoked,
        revocationReason
    )

    const receipt = await tx
        .send({
            from: signer.address,
            gas: await tx.estimateGas(),
        })
        .once("transactionHash", (txhash) => {
            console.log(`Dados enviados com sucesso ...`);
        });
    console.log(`Dados inseridos -> ${receipt.blockNumber}`);
    res.status(200).send(`Dados inseridos no bloco ${receipt.blockNumber}`);
  },

  async delete(req, res) {

      let id = req.params.id

      const network = process.env.ETHEREUM_NETWORK;

      const web3 = new Web3(
          new Web3.providers.HttpProvider(
              `${address}`
          )
      );
      const signer = web3.eth.accounts.privateKeyToAccount(
          process.env.SIGNER_PRIVATE_KEY
      );
      web3.eth.accounts.wallet.add(signer);
      var contratoInteligente = new web3.eth.Contract(CONTACT_ABI.CONTACT_ABI, CONTACT_ADDRESS.CONTACT_ADDRESS);

      const tx = contratoInteligente.methods.deleteAssertions(
          id
      );

      const receipt = await tx
          .send({
              from: signer.address,
              gas: await tx.estimateGas(),
          })
          .once("transactionHash", (txhash) => {
              console.log(`Dados enviados com sucesso ...`);
          });
      console.log(`Dados inseridos -> ${receipt.blockNumber}`);
      res.status(200).send(`Issuer excluído com sucesso`);
  }
}