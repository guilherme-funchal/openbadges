
const CONTACT_ADDRESS = '0xf5059a5D33d5853360D16C683c16e67980206f36';

const CONTACT_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "deleteAssertions",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "deleteBadgeClass",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "deleteIssuer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getAssertionByID",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getBadgeClassByID",
		"outputs": [
			{
				"internalType": "string",
				"name": "_entityId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_createdAt",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_createdBy",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_issuerId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_image",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_criteriaUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_criteriaNarrative",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_alignmentsTargetName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_alignmentsTargetUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_alignmentsTargetDescription",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_alignmentsTargetFramework",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_alignmentsTargetCode",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_tags",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_expiresAmount",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_expiresDuration",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "getIssuerByID",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getItemsAssertion",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "entityId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "createdAt",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "image",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "issuerId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "badgeclassId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "recipientId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "issuedOn",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "revoked",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "revocationReason",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "expires",
						"type": "string"
					}
				],
				"internalType": "struct Badges.Assertion[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getItemsBadgeClass",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "entityId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "createdAt",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "createdBy",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "issuerId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "image",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "criteriaUrl",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "criteriaNarrative",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "alignmentsTargetName",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "alignmentsTargetUrl",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "alignmentsTargetDescription",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "alignmentsTargetFramework",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "alignmentsTargetCode",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "tags",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "expiresAmount",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "expiresDuration",
						"type": "string"
					}
				],
				"internalType": "struct Badges.BadgeClass[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getItemsIssuer",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "entityId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "createdAt",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "createdBy",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "image",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "staffId",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "url",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "domain",
						"type": "string"
					}
				],
				"internalType": "struct Badges.Issuer[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_entityId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_createdAt",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_image",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_issuerId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_badgeclassId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_recipientId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_issuedOn",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_revoked",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "_revocationReason",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_expires",
				"type": "string"
			}
		],
		"name": "setAssertion",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_entityId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_createdAt",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_createdBy",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_issuerId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_image",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_criteriaUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_criteriaNarrative",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_alignmentsTargetName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_alignmentsTargetUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_alignmentsTargetDescription",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_alignmentsTargetFramework",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_alignmentsTargetCode",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_tags",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_expiresAmount",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_expiresDuration",
				"type": "string"
			}
		],
		"name": "setBadgeClass",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_entityId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_createdAt",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_createdBy",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_image",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_staffId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_url",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_domain",
				"type": "string"
			}
		],
		"name": "setIssuer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_entityId",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_revoked",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "_revocationReason",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_expires",
				"type": "string"
			}
		],
		"name": "updateAssertion",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_entityId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_image",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_criteriaUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_criteriaNarrative",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_alignmentsTargetName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_alignmentsTargetUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_alignmentsTargetDescription",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_alignmentsTargetFramework",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_alignmentsTargetCode",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_tags",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_expiresAmount",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_expiresDuration",
				"type": "string"
			}
		],
		"name": "updateBadgeClass",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_image",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_staffId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_url",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_domain",
				"type": "string"
			}
		],
		"name": "updateIssuer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

module.exports = {
        CONTACT_ABI,
        CONTACT_ADDRESS,
};
