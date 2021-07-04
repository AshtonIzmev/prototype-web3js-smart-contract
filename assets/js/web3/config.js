
const gasGlobal = 4054108;
const gasPriceGlobal = '2000000000';
const isLocalhost = location.hostname === "localhost";
const WEB3ID = isLocalhost ? "1338" : "985459";
const blockchainProvider = isLocalhost ? 'http://localhost:8545/' : 'https://curieux.ma/blockchain/';

// Localhost const
var masterAdd = "0x122edD67acA10b682Fac3e8dD0664EF145778de0"
var kycAdd = "0xF2C72F5F986c588918Ba62FBa0e1cb58F69410BF"
var medAdd = "0x664BfEfba8f22C11e6C72B1fC6Aa7b026b121112"
var fpAdd = "0x3775733aa1D91b9bB68Cf11b49A3538612Db4A47"
var marketplaceAdd = "0x8C5F2306E025f40B4f6077113f10EEE1472032Fe"
var datAdd = "0xDbD3dfE7eB26DBDC40AD8d1F8435633908a955B9"
var factoringAdd = "0x0ddE0Dd1B63E87dd7dB3a0559Cc9Aa83fcf60ce2"
var mudarabaAdd = "0x5944ec66F5C62c2F9dd30F1C81F7384884E9189E"

// Geth const
let masterGAdd = "0x92f1Dd59b999d4E1DE9Ce3365C03625495d643d5"
let kycGAdd = "0x92f1Dd59b999d4E1DE9Ce3365C03625495d643d5"
let medGAdd = "0x13198770500C8d735b2838bf6E57876e2446abeB"
let fpGAdd = "0x5CcE4DD66b9FF18F00ec7B131C176879A7911D5B"
let marketplaceGAdd = "0xd1e7347519b9D99B617558293D1dE6401205751C"
let datGAdd = "0x0105f484130586b6146dF1480F6f31F2Ec10f206"
let factoringGAdd = "0x2EEbD011413247F2079DCEa89aac72D77fEb5ABa"
let mudarabaGAdd = "0xC62cd7c6AcAf9002D5A065732D36f584dE94d4E7"

const masterCtrAdd = isLocalhost ? masterAdd : masterGAdd;
const kycCtrAdd = isLocalhost ? kycAdd : kycGAdd;
const medCtrAdd = isLocalhost ? medAdd : medGAdd;
const fpCtrAdd = isLocalhost ? fpAdd : fpGAdd;
const marketplaceCtrAdd = isLocalhost ? marketplaceAdd : marketplaceGAdd;
const datCtrAdd = isLocalhost ? datAdd : datGAdd;
const factoringCtrAdd = isLocalhost ? factoringAdd : factoringGAdd;
const mudarabaCtrAdd = isLocalhost ? mudarabaAdd : mudarabaGAdd;

// ! Modifier le token contract address également dans med.day et med.month !
const rootContractJson = '/assets/contracts/';
const kycJsonPath = '/assets/contracts/KYC.json';
const medJsonPath = '/assets/contracts/MED.json';
const masterJsonPath = '/assets/contracts/MasterOrg.json';
const assoJson = '/assets/contracts/AssociationOrg.json';

const datJson = '/assets/contracts/DAT.json';
const factoringJson = '/assets/contracts/Factoring.json';
const mudarabaJson = '/assets/contracts/Mudaraba.json';
const fpJson = '/assets/contracts/FP.json';
const marketplaceJson = '/assets/contracts/Marketplace.json';

const medTransfertStorageKey = "transfert";
const medbeneficiaireStorageKey = "beneficiaire"

const sellFees = 1;
const withdrawFees = 2;

/*

//// Truffle code

// Add ether
web3.eth.sendTransaction({from:accounts[0], to:"0x99e5A82c5000f18F3CB0027382F9310110bD0376", value:web3.utils.toWei("5", "ether")});
web3.eth.sendTransaction({from:accounts[0], to:"0x485d493EB472E10469F14bADa83c33941c018A76", value:web3.utils.toWei("5", "ether")});

// MED supply
let instanceMED = await MED.deployed();

instanceMED.incrementDay({from: accounts[0]});
instanceMED.incrementDay({from: accounts[0]});
instanceMED.incrementMonth({from: accounts[0]});

// NFT approvals
let instanceFP = await FP.deployed();
let instanceDAT = await DAT.deployed();
let instanceKYC = await KYC.deployed();
let instanceMarketplace = await Marketplace.deployed();

instanceFP.setApprovalForAll(instanceDAT.address, true, {from: accounts[0]});

instanceDAT.setProduct(180, 2, {from: accounts[0]});
instanceDAT.setProduct(360, 5, {from: accounts[0]});

instanceKYC.submitKYC("Produit DAT by BlockBank", "123", instanceDAT.address, {from: accounts[0]});
instanceKYC.submitKYC("Marketplace by BlockBank", "123", instanceMarketplace.address, {from: accounts[0]});


*/