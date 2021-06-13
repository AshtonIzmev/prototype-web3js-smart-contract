
const gasGlobal = 4054108;
const gasPriceGlobal = '2000000000';
const isLocalhost = location.hostname === "localhost";
const WEB3ID = isLocalhost ? "1338" : "985459";
const blockchainProvider = isLocalhost ? 'http://localhost:8545/' : 'https://curieux.ma/blockchain/';

// Localhost const
var kycAdd = "0x1250DB380345680732Cb6Ad15A5aD8EA9faC95b6"
var medAdd = "0x71444DC754aF1DB77c12d8Aafd28c1577a0ad823"
var fpAdd = "0x3B78E615B8DB518335CB4AE7F21c331741d23705"
var marketplaceAdd = "0x1520CeF5D46DFF8201Ea361C4a01033CD6B79322"
var datAdd = "0xfAFE338d4d7Ba48A5eA90AeB6B057589f2C07bda"
var factoringAdd = "0x25512E2374289648bba23873efc3f2B4Dfe6649E"
var mudarabaAdd = "0x506049e2e921Bb32D230C4567B06A09B844890e7"

// Geth const
const kycGAdd = "0x92f1Dd59b999d4E1DE9Ce3365C03625495d643d5"
const medGAdd = "0x13198770500C8d735b2838bf6E57876e2446abeB"
const fpGAdd = "0x5CcE4DD66b9FF18F00ec7B131C176879A7911D5B"
const marketplaceGAdd = "0xd1e7347519b9D99B617558293D1dE6401205751C"
const datGAdd = "0x0105f484130586b6146dF1480F6f31F2Ec10f206"
const factoringGAdd = "0x2EEbD011413247F2079DCEa89aac72D77fEb5ABa"
const mudarabaGAdd = "0xC62cd7c6AcAf9002D5A065732D36f584dE94d4E7"

const kycCtrAdd = isLocalhost ? kycAdd : kycGAdd;
const medCtrAdd = isLocalhost ? medAdd : medGAdd;
const fpCtrAdd = isLocalhost ? fpAdd : fpGAdd;
const marketplaceCtrAdd = isLocalhost ? marketplaceAdd : marketplaceGAdd;
const datCtrAdd = isLocalhost ? datAdd : datGAdd;
const facroringCtrAdd = isLocalhost ? factoringAdd : factoringGAdd;
const mudarabaCtrAdd = isLocalhost ? mudarabaAdd : mudarabaGAdd;


// ! Modifier le token contract address également dans med.day et med.month !

const rootContractJson = '/assets/contracts/';
const kycJsonPath = '/assets/contracts/KYC.json';
const medJsonPath = '/assets/contracts/MED.json';
const assoJson = '/assets/contracts/AssociationOrg.json';

const medTransfertStorageKey = "transfert_20210525";
const medbeneficiaireStorageKey = "beneficiaire"

/*

// Truffle code

// Add ether
web3.eth.sendTransaction({from:accounts[0], to:"0x99e5A82c5000f18F3CB0027382F9310110bD0376", value:web3.utils.toWei("5", "ether")});

// add day and month
let instance = await MED.deployed();
instance.incrementDay({from: accounts[0]});
instance.incrementDay({from: accounts[0]});
instance.incrementMonth({from: accounts[0]});


*/