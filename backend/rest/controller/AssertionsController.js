var Web3 = require('web3');
var address = "http://127.0.0.1:8545";
var moment = require('moment');
const short = require('short-uuid');
require("dotenv").config();
const axios = require('axios');
const bakery = require('openbadges-bakery-v2');


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

const api = axios.create({
  baseURL: process.env.REST_HOST + '/'
})

const getUserData = async (recipientId) => {
  var response = await api.get('users/' + recipientId);
  return response;
}

const burnBadge = async (entityId, badgeId) => {
  const path_assertion = "public/assertions/";
  const path_image = "public/badgeClass/";
  var responseIssue = await api.get('assertions/' + entityId);

  var jsonData = responseIssue.data.block;

  var responseBadgeClass = await api.get('badgeclass/' + badgeId);
  var image = responseBadgeClass.data[0].image;

  image = path_image +  image
  
  var img=fs.readFileSync(image)

  var options = {
		image: img,
		assertion: jsonData,
	};

  var final_path = path_assertion + "assertion-" + entityId + ".png";
  bakery.bake(options, function(err, data ){
		var imagePath = final_path;
		fs.writeFile(imagePath, data, function (err) {
		
		});
	})

}

module.exports = {
  // Routes
  /**
   * @swagger
   * /issuers:
   *  get:
   *    description: Get image from Badge
   *    responses:
   *      '200':
   *        description: A successful response
  */

  async get_badge(req, res){
    const id = req.params.id
    console.log("id->", id);

    const targget = "public/assertions/" + id + ".png"
    res.download(targget, function (err) {

      if (err) {
        console.log(err);
        return res.status(400).json({
          erro: true,
          mensagem: "Erro: Arquivo não pode ser encontrado!"
        });
      }
    })
  },
  async check_file(req, res){
    const img = fs.readFileSync(req.file.path);

    bakery.extract(img, function(err, data){
            const json = JSON.parse(data);
            res.status(200).json({json});
    });

  },
  async search(req, res) {
    var web3 = new Web3(address);

    let entityId = String(req.params.entityId);
    console.log("->", String(entityId));

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


      if (assertion['6'] !== "") {
        var user = await getUserData(String(assertion['6']));
        var email_salt = crypto.randomBytes(12).toString('hex');
        var email_hash = crypto.createHash("sha256").update(email_salt, "utf8").digest("hex")
      }
      // var response = await getUserData(assertion['6']);
      // var email = response.usuario.email;

      if (assertion['0'] !== "0") {
        
        if (String(assertion['1']) === String(entityId)) {
          var block = {
            // uid: assertion['0'],
            "@context": "https://w3id.org/openbadges/v2",
            type: "Assertion",
            id: "https://openbadges.serpro.gov.br/public/assertions/" + assertion['1'],
            badge: "https://openbadges.serpro.gov.br/public/badges/" + assertion['5'],
            image: assertion['3'],
            verification: {
              type: "HostedBadge"
            },
            issueOn: assertion['7'],
            "recipient": {
              "hashed": true,
              "type": "email",
              "identity": "sha256$" + email_hash,
              "salt": email_salt
            },
            revoked: assertion['8'],
            revocationReason: assertion['9'],
            "extensions:recipientProfile": {
              "name": user.data.usuario.email,
              "@context": "https://openbadgespec.org/extensions/recipientProfile/context.json",
              "type": [
                "Extension",
                "extensions:RecipientProfile"
              ]
            }
          };
        }
      }
    }
    res.status(200).json({block});
  },
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


      if (assertion['6'] !== "") {
        var user = await getUserData(String(assertion['6']));
        var email_salt = crypto.randomBytes(12).toString('hex');
        var email_hash = crypto.createHash("sha256").update(email_salt, "utf8").digest("hex")
      }
      // var response = await getUserData(assertion['6']);
      // var email = response.usuario.email;

      if (assertion['0'] !== "0") {
        var block = {
          // uid: assertion['0'],
          "@context": "https://w3id.org/openbadges/v2",
          type: "Assertion",
          id: "https://openbadges.serpro.gov.br/public/assertions/" + assertion['1'],
          badge: "https://openbadges.serpro.gov.br/public/badges/" + assertion['5'],
          image: assertion['3'],
          verification: {
            type: "HostedBadge"
          },
          issueOn: assertion['7'],
          "recipient": {
            "hashed": true,
            "type": "email",
            "identity": "sha256$" + email_hash,
            "salt": email_salt
          },      
          //   isssuerId: assertion['4'],
          //   badgeclassId: assertion['5'],
          //   recipienteId: assertion['6'],
          revoked: assertion['8'],
          revocationReason: assertion['9'],
          "extensions:recipientProfile": {
            "name": user.data.usuario.email,
            "@context": "https://openbadgespec.org/extensions/recipientProfile/context.json",
            "type": [
              "Extension",
              "extensions:RecipientProfile"
            ]
          }
        };
      }
    }

    res.status(200).json({block});
  },
  async insert(req, res) {
    // var response = await getUserData(req.body.recipientId);
    // email = response.usuario.email;

    var time = new Date().getTime();
    file = "burning.png"
    var now = moment()
      .utcOffset('-03:00')
      .format('DD/MM/YYYY hh:mm:ss a');
    //   let entityId = String(crypto.randomUUID());
    let entityId = String(short.generate());
    let createdAt = String(now);
    let image = "https://openbadges.serpro.gov.br/public/assertions/" + entityId + "/image"
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
    await burnBadge(entityId, badgeclassId)

    res.status(200).send(`Dados inseridos no bloco ${receipt.blockNumber}`);
  },
  async revoke(req, res) {
    var web3 = new Web3(address);
    let entityId = String(req.body.entityId );
    let revoked = String(req.body.revoked);
    let revocationReason = String(req.body.revocationReason);

    const signer = web3.eth.accounts.privateKeyToAccount(
      process.env.SIGNER_PRIVATE_KEY
    );

    web3.eth.accounts.wallet.add(signer);

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

      if (assertion['0'] !== "0") {
        if (String(assertion['1']) === String(entityId)) {
          var id = assertion['0'];
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
          res.status(200).send(`Assertion revogado com sucesso`);
        }
      }
    }
  },
  
  async delete(req, res) {
    var web3 = new Web3(address);
    let entityId = String(req.params.entityId);

    const signer = web3.eth.accounts.privateKeyToAccount(
      process.env.SIGNER_PRIVATE_KEY
    );

    web3.eth.accounts.wallet.add(signer);

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

      if (assertion['0'] !== "0") {
        if (String(assertion['1']) === String(entityId)) {
          id = assertion['0'];
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
          var filePath = "public/assertions/assertion-" + entityId + ".png" ;
          fs.unlinkSync(filePath)  
          res.status(200).send(`Assertion excluído com sucesso`);
        }
      }
    }
  }
}