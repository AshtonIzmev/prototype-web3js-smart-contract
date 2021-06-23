
const gasGlobal = 4054108;
const gasPriceGlobal = '2000000000';
const isLocalhost = location.hostname === "localhost";
const WEB3ID = isLocalhost ? "1338" : "985459";
const blockchainProvider = isLocalhost ? 'http://localhost:8545/' : 'https://curieux.ma/blockchain/';

// Localhost const
var masterAdd = "0xEfeCa1611B07C5BdB3FF248240cF46eE41857F6f"
var kycAdd = "0x986Aa124fd1970a6D26580131489175eE41680f5"
var medAdd = "0x00064628b4e4c2AB43B54A74375bCd5364326C51"
var fpAdd = "0xCE9C23E1cA5282A0bE60572ad380968d0cbC5801"
var marketplaceAdd = "0x44039B03f2265650a88bDc9E3664F500BD2fa115"
var datAdd = "0xc067C013ddE23762a875eddb2Fc7E2bD686f1547"
var factoringAdd = "0x4a9871e765efCeAA063F5CE8305408D93F32Ea3D"
var mudarabaAdd = "0x65bF897297389f98573ddf651641399ABD7552B6"

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

const medTransfertStorageKey = "transfert";
const medbeneficiaireStorageKey = "beneficiaire"

/*

//// Truffle code

// Add ether
web3.eth.sendTransaction({from:accounts[0], to:"0x99e5A82c5000f18F3CB0027382F9310110bD0376", value:web3.utils.toWei("5", "ether")});
web3.eth.sendTransaction({from:accounts[0], to:"0x485d493EB472E10469F14bADa83c33941c018A76", value:web3.utils.toWei("5", "ether")});


// add day and month
let instance = await MED.deployed();

instance.incrementDay({from: accounts[0]});

instance.incrementDay({from: accounts[0]});

instance.incrementMonth({from: accounts[0]});


*/