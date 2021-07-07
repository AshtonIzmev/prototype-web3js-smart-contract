
const gasGlobal = 4054108;
const gasPriceGlobal = '2000000000';
const isLocalhost = location.hostname === "localhost";
const WEB3ID = isLocalhost ? "1338" : "985459";
const blockchainProvider = isLocalhost ? 'http://localhost:8545/' : 'https://curieux.ma/blockchain/';

// Localhost const
var masterAdd = "0x9FA6e716e9e2fD98C607daB8c4c76565D77447d3"
var kycAdd = "0xeca5826E2Ec427ECB7591D65dB15312bd0fAE229"
var medAdd = "0xF25d550Bb98e85BbB8E7f4Da415B3e64ce886B5b"
var fpAdd = "0xdB80DE214EF0E5DDe4cBc8c67E6DAA41900E3BeF"
var marketplaceAdd = "0xA494EA0C917588BceD1C253F58fFB089cF061587"
var datAdd = "0xBe8265DEe08D8A6640D42701f47aB0AC0C2c80F8"
var factoringAdd = "0x19180a999A6142fd79241f8739Ef6e0189174bFe"
var mudarabaAdd = "0x9F132168A0DA87c75ef03991784d111B5ad4d899"

// Geth const
let masterGAdd = "0x1147d78192b6a6c6bcbeaf32e29cd1a82072537d" // deployed
let kycGAdd = "0x4b29b2d3ebc574984360a114990b4c6edaeb6bf7" // deployed
let medGAdd = "0xdd3828bd7d36555f96c1aaae7668a1e253dde7dd" // deployed
let fpGAdd = "0x76a0b26c5e08282bcb421e66ecc78cb59f1e834c" // deployed
let marketplaceGAdd = "0xbb1bdd553f21bd0aee5a0e783d19246ceebba571" // deployed
let datGAdd = "0x60d2729a948cd5cec18943bb2d69a8a58e51fd14" // deployed
let factoringGAdd = "0x36a43738884bb1b1af247d3428dde7f6c952b239" // deployed
let mudarabaGAdd = "0xfca80a163fa4462dfb91226c8e8058e82788f4d2" // deployed
let mudarabaGAdd2 = "0x8e8a4b517135bc71e8e68a547265752e99a4f06f" // deployed
let mudarabaGAdd3 = "0x69fc10dad001677402d6fb6f3832aa4bf16d12c4" // deployed

const masterCtrAdd = isLocalhost ? masterAdd : masterGAdd;
const kycCtrAdd = isLocalhost ? kycAdd : kycGAdd;
const medCtrAdd = isLocalhost ? medAdd : medGAdd;
const fpCtrAdd = isLocalhost ? fpAdd : fpGAdd;
const marketplaceCtrAdd = isLocalhost ? marketplaceAdd : marketplaceGAdd;
const datCtrAdd = isLocalhost ? datAdd : datGAdd;
const factoringCtrAdd = isLocalhost ? factoringAdd : factoringGAdd;
const mudarabaCtrAdd = isLocalhost ? mudarabaAdd : mudarabaGAdd;
const mudarabaCtrAdd2 = isLocalhost ? mudarabaAdd : mudarabaGAdd2;
const mudarabaCtrAdd3 = isLocalhost ? mudarabaAdd : mudarabaGAdd3;

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

const sellFees = 2500;
const withdrawFees = 500;

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
let instanceMudaraba = await Mudaraba.deployed();
let instanceFactoring = await Factoring.deployed();

let instanceKYC = await KYC.deployed();

let instanceMarketplace = await Marketplace.deployed();

instanceFP.setApprovalForAll(instanceDAT.address, true, {from: accounts[0]});
instanceFP.setApprovalForAll(instanceMudaraba.address, true, {from: accounts[0]});
instanceFP.setApprovalForAll(instanceFactoring.address, true, {from: accounts[0]});

instanceDAT.setProduct(180, 2, {from: accounts[0]});
instanceDAT.setProduct(360, 5, {from: accounts[0]});

instanceKYC.submitKYC("Produit DAT by BlockBank", "123", instanceDAT.address, {from: accounts[0]});
instanceKYC.submitKYC("Produit Mudaraba by BlockBank", "123", instanceMudaraba.address, {from: accounts[0]});
instanceKYC.submitKYC("Produit Factoring by BlockBank", "123", instanceFactoring.address, {from: accounts[0]});
instanceKYC.submitKYC("Marketplace by BlockBank", "123", instanceMarketplace.address, {from: accounts[0]});


*/