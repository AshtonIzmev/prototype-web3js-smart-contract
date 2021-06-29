
const gasGlobal = 4054108;
const gasPriceGlobal = '2000000000';
const isLocalhost = location.hostname === "localhost";
const WEB3ID = isLocalhost ? "1338" : "985459";
const blockchainProvider = isLocalhost ? 'http://localhost:8545/' : 'https://curieux.ma/blockchain/';

// Localhost const
var masterAdd = "0x3ac77bE9fcb25457FB27E69Cc80ED3100044DF16"
var kycAdd = "0x231c65F021ae5b2aFeCEa83A99970aa1A7DA0308"
var medAdd = "0xc904180c3640597aBa62892e109281839f3f7B4a"
var fpAdd = "0xa1b75e745c0A14ebAd7fC465839DDc5D69F169c2"
var marketplaceAdd = "0xe8e3264e8255ecef4d107f4807249a34AdCa088a"
var datAdd = "0xd2FE2A09bB7F1686CEaC0cfD6786fe75425E62E5"
var factoringAdd = "0x22a3e21474fC60A9a02f9d88D9646eFf8fa717Cf"
var mudarabaAdd = "0x28761E00d8F2EEF0c67009f33bf3D69ce6b2982C"

// Geth const
const masterGAdd = "0x92f1Dd59b999d4E1DE9Ce3365C03625495d643d5"
const kycGAdd = "0x92f1Dd59b999d4E1DE9Ce3365C03625495d643d5"
const medGAdd = "0x13198770500C8d735b2838bf6E57876e2446abeB"
const fpGAdd = "0x5CcE4DD66b9FF18F00ec7B131C176879A7911D5B"
const marketplaceGAdd = "0xd1e7347519b9D99B617558293D1dE6401205751C"
const datGAdd = "0x0105f484130586b6146dF1480F6f31F2Ec10f206"
const factoringGAdd = "0x2EEbD011413247F2079DCEa89aac72D77fEb5ABa"
const mudarabaGAdd = "0xC62cd7c6AcAf9002D5A065732D36f584dE94d4E7"

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

instanceFP.setApprovalForAll(instanceDAT.address, true, {from: accounts[0]});

instanceDAT.setProduct(180, 2, {from: accounts[0]});
instanceDAT.setProduct(360, 5, {from: accounts[0]});

instanceKYC.submitKYC("Produit DAT by BlockBank", "123", instanceDAT.address, {from: accounts[0]});


*/