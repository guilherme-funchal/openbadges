var Web3 = require('web3');
var address = "http://127.0.0.1:8545";
const short = require('short-uuid');
require("dotenv").config();
const axios = require('axios');
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
    baseURL: process.env.REST_HOST_DB + '/'
    // baseURL: "http://localhost:3020" + '/'
})

const getUserData = async (recipientId, token) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        var response = await api.get('users/' + recipientId, config);
        return response;

    } catch (e) {
        console.error(e)
    }
}

module.exports = {
    async searchIssuerId(req, res) {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            let issuerId = String(req.params.issuerId);

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


                    if (issuer['1'] === issuerId) {
                        issuer_identificado.push({
                            id: issuer['1'],
                            parentId: "",
                            name: issuer['2'],
                            positionName: "",
                            team: "",
                            type: "issuer",
                            date: issuer['4'],
                            description: issuer['3'],
                            imageUrl: process.env.REST_HOST_DB + "/files/" + issuer['6']
                        });

                        let badges = await contratoInteligente.methods.getItemsBadgeClass().call(function (err, res) {
                            if (err) {
                                console.log("Ocorreu um erro", err)
                                return
                            }
                        });

                        const quantidade_badges = badges.length + 1;

                        for (var j = 1; j < quantidade_badges; j++) {

                            let badgeClass = await contratoInteligente.methods.getBadgeClassByID(j).call(function (err, res) {
                                if (err) {
                                    console.log("Ocorreu um erro", err)
                                    return
                                }

                            });

                            if (issuer['1'] === badgeClass['4']) {
                                issuer_identificado.push({
                                    id: badgeClass['1'],
                                    parentId: issuer['1'],
                                    name: badgeClass['5'],
                                    positionName: "",
                                    team: "",
                                    type: "class",
                                    date: badgeClass['2'],
                                    description: badgeClass['7'],
                                    imageUrl: process.env.REST_HOST_DB + "/files/" + badgeClass['6']
                                });

                                let assertions = await contratoInteligente.methods.getItemsAssertion().call(function (err, res) {
                                    if (err) {
                                        console.log("Ocorreu um erro", err)
                                        return
                                    }

                                });


                                const quantidade_assertions = assertions.length + 1;

                                for (var k = 1; k < quantidade_assertions; k++) {

                                    let assertion_items = await contratoInteligente.methods.getAssertionByID(k).call(function (err, res) {
                                        if (err) {
                                            console.log("Ocorreu um erro", err)
                                            return
                                        }
                                    });

                                    if (badgeClass['1'] === assertion_items['5']) {
                                        var user = await getUserData(String(assertion_items['6']), token);
                                        issuer_identificado.push({
                                            id: assertion_items['1'],
                                            parentId: assertion_items['5'],
                                            name: user.data.usuario.username,
                                            positionName: "",
                                            team: "",
                                            type: "badge",
                                            date: assertion_items['7'],
                                            description: badgeClass['5'],
                                            imageUrl: process.env.REST_HOST_DB + "/files/" + user.data.usuario.image
                                        });

                                    }

                                }

                            }

                        }
                    }
                }

            }
            res.status(200).send(issuer_identificado);
        } catch (e) {
            console.error(e)
        }
    },


    async searchClassId(req, res) {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            let classId = String(req.params.classId);

            var web3 = new Web3(address);
            var issuer_identificado = [];

            var contratoInteligente = new web3.eth.Contract(CONTACT_ABI.CONTACT_ABI, CONTACT_ADDRESS.CONTACT_ADDRESS);

            let classes = await contratoInteligente.methods.getItemsBadgeClass().call(function (err, res) {
                if (err) {
                    console.log("Ocorreu um erro", err)
                    return
                }
            });

            const quantidade_badges = classes.length + 1;

            for (var j = 1; j < quantidade_badges; j++) {

                let badgeClass = await contratoInteligente.methods.getBadgeClassByID(j).call(function (err, res) {
                    if (err) {
                        console.log("Ocorreu um erro", err)
                        return
                    }

                });

                if (badgeClass['1'] === classId) {
                    issuer_identificado.push({
                        id: badgeClass['1'],
                        parentId: "",
                        name: badgeClass['5'],
                        positionName: "",
                        team: "",
                        type: "class",
                        date: badgeClass['2'],
                        description: badgeClass['7'],
                        imageUrl: process.env.REST_HOST_DB + "/files/" + badgeClass['6']
                    });

                    let assertions = await contratoInteligente.methods.getItemsAssertion().call(function (err, res) {
                        if (err) {
                            console.log("Ocorreu um erro", err)
                            return
                        }

                    });


                    const quantidade_assertions = assertions.length + 1;

                    for (var k = 1; k < quantidade_assertions; k++) {

                        let assertion_items = await contratoInteligente.methods.getAssertionByID(k).call(function (err, res) {
                            if (err) {
                                console.log("Ocorreu um erro", err)
                                return
                            }
                        });

                        if (badgeClass['1'] === assertion_items['5']) {
                            var user = await getUserData(String(assertion_items['6']), token);

                            issuer_identificado.push({
                                id: assertion_items['1'],
                                parentId: assertion_items['5'],
                                name: user.data.usuario.username,
                                positionName: "",
                                team: "",
                                type: "badge",
                                date: assertion_items['7'],
                                description: badgeClass['5'],
                                imageUrl: process.env.REST_HOST_DB + "/files/" + user.data.usuario.image
                            });

                        }

                    }




                }
            }
            res.status(200).send(issuer_identificado);
        } catch (e) {
            console.error(e)
        }
    },

    async searchUserId(req, res) {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            let entityId = String(req.params.entityId);
            let domain = String(req.params.Domain);
            var web3 = new Web3(address);
            var issuer_identificado = [];

            var contratoInteligente = new web3.eth.Contract(CONTACT_ABI.CONTACT_ABI, CONTACT_ADDRESS.CONTACT_ADDRESS);

            let assertions = await contratoInteligente.methods.getItemsAssertion().call(function (err, res) {
                if (err) {
                    console.log("Ocorreu um erro", err)
                    return
                }
            });

            let issuers = await contratoInteligente.methods.getItemsIssuer().call(function (err, res) {
                if (err) {
                    console.log("Ocorreu um erro", err)
                    return
                }
            });

            let badges = await contratoInteligente.methods.getItemsBadgeClass().call(function (err, res) {
                if (err) {
                    console.log("Ocorreu um erro", err)
                    return
                }
            });

            const quantidade_assertions = assertions.length + 1;

            for (var k = 1; k < quantidade_assertions; k++) {

                let assertion_items = await contratoInteligente.methods.getAssertionByID(k).call(function (err, res) {
                    if (err) {
                        console.log("Ocorreu um erro", err)
                        return
                    }
                });

                if (entityId === assertion_items['6']) {
                    var user = await getUserData(String(assertion_items['6']), token);

                    issuer_identificado.push({
                        id: assertion_items['1'],
                        parentId: assertion_items['5'],
                        name: "Badge recebido",
                        positionName: "",
                        team: "",
                        type: "badge",
                        date: assertion_items['7'],
                        description: "Badge recebido",
                        imageUrl: process.env.REST_HOST_DB + "/files/" + "openbadges.png"
                    });

                    const quantidade_badges = badges.length + 1;

                    for (var j = 1; j < quantidade_badges; j++) {

                        let badgeClass = await contratoInteligente.methods.getBadgeClassByID(j).call(function (err, res) {
                            if (err) {
                                console.log("Ocorreu um erro", err)
                                return
                            }

                        });

                        if (assertion_items['5'] === badgeClass['1']) {
                            issuer_identificado.push({
                                id: badgeClass['1'],
                                parentId: badgeClass['4'],
                                name: badgeClass['5'],
                                positionName: "",
                                team: "",
                                type: "class",
                                date: badgeClass['2'],
                                description: badgeClass['7'],
                                imageUrl: process.env.REST_HOST_DB + "/files/" + badgeClass['6']
                            });

                            const quantidade = issuers.length + 1;

                            for (var i = 1; i < quantidade; i++) {
                                let issuer = await contratoInteligente.methods.getIssuerByID(i).call(function (err, res) {
                                    if (err) {
                                        return
                                    }
                                });

                                if (issuer['1'] === badgeClass['4']) {
                                    issuer_identificado.push({
                                        id: issuer['1'],
                                        parentId: "0",
                                        name: issuer['2'],
                                        positionName: "",
                                        team: "",
                                        type: "issuer",
                                        date: issuer['4'],
                                        description: issuer['3'],
                                        imageUrl: process.env.REST_HOST_DB + "/files/" + issuer['6']
                                    });
                                }
                            }
                        }
                    }
                }
            }

            issuer_identificado.push({
                id: 0,
                parentId: "",
                name: user.data.usuario.domain,
                positionName: "",
                team: "",
                type: "domain",
                date: "",
                description: "Dominio",
                imageUrl: process.env.REST_HOST_DB + "/files/" + "domain.png"
            });


            res.status(200).send(issuer_identificado);
        } catch (e) {
            console.error(e)
        }
    },

    async searchDomain(req, res) {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];

            let domain = String(req.params.Domain);
            var web3 = new Web3(address);
            var issuer_identificado = [];

            var contratoInteligente = new web3.eth.Contract(CONTACT_ABI.CONTACT_ABI, CONTACT_ADDRESS.CONTACT_ADDRESS);

            issuer_identificado.push({
                id: 0,
                parentId: "",
                name: domain,
                positionName: "",
                team: "",
                type: "domain",
                date: "",
                description: "Dominio",
                imageUrl: process.env.REST_HOST_DB + "/files/" + "domain.png"
            });

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
                    if (domain === issuer['10']) {

                        issuer_identificado.push({
                            id: issuer['1'],
                            parentId: "0",
                            name: issuer['2'],
                            positionName: "",
                            team: "",
                            type: "issuer",
                            date: issuer['4'],
                            description: issuer['3'],
                            imageUrl: process.env.REST_HOST_DB + "/files/" + issuer['6']
                        });

                        let badges = await contratoInteligente.methods.getItemsBadgeClass().call(function (err, res) {
                            if (err) {
                                console.log("Ocorreu um erro", err)
                                return
                            }
                        });

                        const quantidade_badges = badges.length + 1;

                        for (var j = 1; j < quantidade_badges; j++) {

                            let badgeClass = await contratoInteligente.methods.getBadgeClassByID(j).call(function (err, res) {
                                if (err) {
                                    console.log("Ocorreu um erro", err)
                                    return
                                }

                            });

                            if (issuer['1'] === badgeClass['4']) {
                                issuer_identificado.push({
                                    id: badgeClass['1'],
                                    parentId: issuer['1'],
                                    name: badgeClass['5'],
                                    positionName: "",
                                    team: "",
                                    type: "class",
                                    date: badgeClass['2'],
                                    description: badgeClass['7'],
                                    imageUrl: process.env.REST_HOST_DB + "/files/" + badgeClass['6']
                                });

                                let assertions = await contratoInteligente.methods.getItemsAssertion().call(function (err, res) {
                                    if (err) {
                                        console.log("Ocorreu um erro", err)
                                        return
                                    }

                                });


                                const quantidade_assertions = assertions.length + 1;

                                for (var k = 1; k < quantidade_assertions; k++) {

                                    let assertion_items = await contratoInteligente.methods.getAssertionByID(k).call(function (err, res) {
                                        if (err) {
                                            console.log("Ocorreu um erro", err)
                                            return
                                        }
                                    });

                                    if (badgeClass['1'] === assertion_items['5']) {
                                        var user = await getUserData(String(assertion_items['6']), token);

                                        issuer_identificado.push({
                                            id: assertion_items['1'],
                                            parentId: assertion_items['5'],
                                            name: user.data.usuario.username,
                                            positionName: "",
                                            team: "",
                                            type: "badge",
                                            date: assertion_items['7'],
                                            description: badgeClass['5'],
                                            imageUrl: process.env.REST_HOST_DB + "/files/" + user.data.usuario.image
                                        });

                                    }

                                }

                            }

                        }
                    }
                }
            }
            res.status(200).send(issuer_identificado);
        } catch (e) {
            console.error(e)
        }
    },

}