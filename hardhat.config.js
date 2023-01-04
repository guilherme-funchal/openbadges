require("@nomicfoundation/hardhat-toolbox");

module.exports = 
	{ 
	networks: {
   		hardhat: {
      			allowUnlimitedContractSize: true
   		 }
  	},
	solidity: 
		{ version: "0.8,17", settings: 
			{ optimizer: 
				{ enabled: true, runs: 200 }
			},

		}
	};	
