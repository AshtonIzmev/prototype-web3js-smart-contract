
var gasGlobal = 4054108;
var gasPriceGlobal = '2000000000';
var isLocalhost = location.hostname === "localhost";
var WEB3ID = isLocalhost ? "1338" : "985459";
var blockchainProvider = isLocalhost ? 'http://localhost:8545/' : 'https://curieux.ma/blockchain/';

var tokenCtrAdd = isLocalhost ? '0x92Ed9a464e2A8a1e79A34056A854A75839176430' : "0x91EA2D6Ed5F19b877abEC6B4597331E5D81F35d3";

// Modifier le token contract address également dans med.day et med.month ! 


var rootContractJson = '/assets/contracts/';
var medJsonPath = '/assets/contracts/MED.json';
var assoJson = '/assets/contracts/AssociationOrg.json';

var medTransfertStorageKey = "transfert_20210525";
var medbeneficiaireStorageKey = "beneficiaire"

/*

web3.eth.sendTransaction({from:"0x1379afaA2316482663ed50178d73984D3C5937f7", to:"0x99e5A82c5000f18F3CB0027382F9310110bD0376", value:web3.utils.toWei("5", "ether")});

*/