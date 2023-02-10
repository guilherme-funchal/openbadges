var Web3 = require('web3');
var address = "http://127.0.0.1:8545";
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
    async search(req, res) {
        try {
            let id = String(req.params.id);
            var web3 = new Web3(address);

            var issuer_identificado = [];

            var contratoInteligente = new web3.eth.Contract(CONTACT_ABI.CONTACT_ABI, CONTACT_ADDRESS.CONTACT_ADDRESS);

            let issuer = await contratoInteligente.methods.getIssuerByID(id).call(function (err, res) {
                if (err) {
                    console.log("Ocorreu um erro", err)
                    return
                }
            });

            console.log(issuer);

            if (issuer['0'] !== '0') {
                issuer_identificado.push({
                    entityType: "Issuer",
                    id: issuer['0'],
                    entityId: issuer['1'],
                    openBadgeId: "http://api.serpro.gov.br/public/issuers/" + issuer['1'],
                    createAt: issuer['4'],
                    createBy: issuer['5'],
                    name: issuer['2'],
                    image: issuer['6'],
                    email: issuer['8'],
                    description: issuer['3'],
                    url: issuer['9'],
                    staffId: issuer['7'],
                    badgrDomain: issuer['10'],
                    extensions: ""
                });
            }

        res.status(200).send(issuer_identificado);

        } catch (e) {
            console.error(e)
        }    
    },
    async list(req, res) {
        try {
            var web3 = new Web3(address);
            var issuer_identificado = [];

            var contratoInteligente = new web3.eth.Contract(CONTACT_ABI.CONTACT_ABI, CONTACT_ADDRESS.CONTACT_ADDRESS);

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
                        return
                    }

                });


                if (issuer['0'] !== '0') {
                    issuer_identificado.push({
                        entityType: "Issuer",
                        id: issuer['0'],
                        entityId: issuer['1'],
                        openBadgeId: "http://api.serpro.gov.br/public/issuers/" + issuer['1'],
                        createAt: issuer['4'],
                        createBy: issuer['5'],
                        name: issuer['2'],
                        image: issuer['6'],
                        email: issuer['8'],
                        description: issuer['3'],
                        url: issuer['9'],
                        staffId: issuer['7'],
                        badgrDomain: issuer['10'],
                        extensions: ""
                    });
                }
            }
            res.status(200).send(issuer_identificado);
        } catch (e) {
            console.error(e)
        }
    },

    async insert(req, res) {
        try {
            let now = Date.now();
            let entityId = String(short.generate());
            let name = String(req.body.name);
            let description = String(req.body.description);
            let createdAt = String(now);
            let createdBy = String(req.body.createdBy);
            let image = String(req.body.image);
            let staffId = entityId;
            let email = String(req.body.email);
            let url = String(req.body.url);
            let domain = String(req.body.domain);

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

            const tx = contratoInteligente.methods.setIssuer(
                entityId,
                name,
                description,
                createdAt,
                createdBy,
                image,
                staffId,
                email,
                url,
                domain
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
        } catch (e) {
            console.error(e)
        }
    },

    async update(req, res) {
        try {
            let now = Date.now();
            let id = String(req.body.id);
            let name = String(req.body.name);
            let description = String(req.body.description);
            let image = String(req.body.image);
            let staffId = String(req.body.staffId);
            let email = String(req.body.email);
            let url = String(req.body.url);
            let domain = String(req.body.domain);

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

            const tx = contratoInteligente.methods.updateIssuer(
                id,
                name,
                description,
                image,
                staffId,
                email,
                url,
                domain
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
        } catch (e) {
            console.error(e)
        }
    },

    async delete(req, res) {
        try {
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

            const tx = contratoInteligente.methods.deleteIssuer(
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
        } catch (e) {
            console.error(e)
        }
    }
}