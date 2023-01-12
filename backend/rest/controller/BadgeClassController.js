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
        let entityId = String(req.params.entityId);
        var web3 = new Web3(address);
        var badge_identificado = [];

        var contratoInteligente = new web3.eth.Contract(CONTACT_ABI.CONTACT_ABI, CONTACT_ADDRESS.CONTACT_ADDRESS);

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

            if (badge['0'] !== "0") {
                if (String(entityId) === String(badge['1'])){
                    badge_identificado.push({
                        type: "BadgeClass",
                        id: badge['0'],
                        entityId: badge['1'],
                        createdAt: badge['2'],
                        createdBy: badge['3'],
                        name: badge['5'],
                        image: badge['6'],
                        description: badge['7'],
                        criteriaUrl: badge['8'],
                        criteriaNarrative: badge['9'],
                        alignmentsTargetName: badge['10'],
                        alignmentsTargetUrl: badge['11'],
                        alignmentsTargetDescription: badge['12'],
                        alignmentsTargetFramework: badge['13'],
                        alignmentsTargetCode: badge['14'],
                        tags: badge['15'],
                        issuerId: badge['4'],
                        expiresAmount: badge['16'],
                        expiresDuration: badge['17'],
                        extensions: ""
                    });
                }
            }
        }

        res.status(200).send(badge_identificado);
    },
    async list(req, res) {
        var web3 = new Web3(address);
        var badge_identificado = [];

        var contratoInteligente = new web3.eth.Contract(CONTACT_ABI.CONTACT_ABI, CONTACT_ADDRESS.CONTACT_ADDRESS);

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

            if (badge['0'] !== "0") {
                badge_identificado.push({
                    type: "BadgeClass",
                    id: badge['0'],
                    entityId: badge['1'],
                    createdAt: badge['2'],
                    createdBy: badge['3'],
                    name: badge['5'],
                    image: badge['6'],
                    description: badge['7'],
                    criteriaUrl: badge['8'],
                    criteriaNarrative: badge['9'],
                    alignmentsTargetName: badge['10'],
                    alignmentsTargetUrl: badge['11'],
                    alignmentsTargetDescription: badge['12'],
                    alignmentsTargetFramework: badge['13'],
                    alignmentsTargetCode: badge['14'],
                    tags: badge['15'],
                    issuerId: badge['4'],
                    expiresAmount: badge['16'],
                    expiresDuration: badge['17'],
                    extensions: ""
                });
            }
        }

        res.status(200).send(badge_identificado);

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

        const tx = contratoInteligente.methods.deleteBadgeClass(
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
        res.status(200).send(`BadgeClass excluído com sucesso`);
    },
    async update(req, res) {
        let id = String(req.body.id);
        let name = String(req.body.name);
        let description = String(req.body.description);
        let criteriaUrl = String(req.body.criteriaUrl);
        let criteriaNarrative = String(req.body.criteriaNarrative);
        let alignmentsTargetName = String(req.body.alignmentsTargetName);
        let alignmentsTargetUrl = String(req.body.alignmentsTargetUrl);
        let alignmentsTargetDescription = String(req.body.alignmentsTargetDescription);
        let alignmentsTargetFramework = String(req.body.alignmentsTargetFramework);
        let alignmentsTargetCode = String(req.body.alignmentsTargetCode);
        let tags = String(req.body.tags);
        let expiresAmount = String(req.body.expiresAmount);
        let expiresDuration = String(req.body.expiresDuration);

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

        const tx = contratoInteligente.methods.updateBadgeClass(
            id,
            name,
            description,
            criteriaUrl,
            criteriaNarrative,
            alignmentsTargetName,
            alignmentsTargetUrl,
            alignmentsTargetDescription,
            alignmentsTargetFramework,
            alignmentsTargetCode,
            tags,
            expiresAmount,
            expiresDuration
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

    async insert(req, res) {

        let now = Date.now();
//      let entityId = String(crypto.randomUUID());
        let entityId = String(short.generate());
        let createdAt = String(now);
        let createdBy = String(req.body.createdBy);
        let name = String(req.body.name);
        let issuerId = String(req.body.issuerId);
        let image = String(req.body.image);
        let description = String(req.body.description);
        let criteriaUrl = String(req.body.criteriaUrl);
        let criteriaNarrative = String(req.body.criteriaNarrative);
        let alignmentsTargetName = String(req.body.alignmentsTargetName);
        let alignmentsTargetUrl = String(req.body.alignmentsTargetUrl);
        let alignmentsTargetDescription = String(req.body.alignmentsTargetDescription);
        let alignmentsTargetFramework = String(req.body.alignmentsTargetFramework);
        let alignmentsTargetCode = String(req.body.alignmentsTargetCode);
        let tags = String(req.body.tags);
        let expiresAmount = String(req.body.expiresAmount);
        let expiresDuration = String(req.body.expiresDuration);

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

        const tx = contratoInteligente.methods.setBadgeClass(
            entityId,
            createdAt,
            createdBy,
            issuerId,
            name,
            image,
            description,
            criteriaUrl,
            criteriaNarrative,
            alignmentsTargetName,
            alignmentsTargetUrl,
            alignmentsTargetDescription,
            alignmentsTargetFramework,
            alignmentsTargetCode,
            tags,
            expiresAmount,
            expiresDuration
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
    }
}