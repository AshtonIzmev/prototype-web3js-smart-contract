
const gasGlobal = 4054108;
const gasPriceGlobal = '2000000000';
const isLocalhost = location.hostname === "localhost";
const WEB3ID = isLocalhost ? "1338" : "985459";
const blockchainProvider = isLocalhost ? 'http://localhost:8545/' : 'https://curieux.ma/blockchain/';

// Localhost const
var kycAdd = "0xE7af561121578B12eC46Cc77CF15585EB4F442Ac"
var medAdd = "0x84A71869614bda1c157eE03577B82Fc405b8Ca7b"
var fpAdd = "0xF34F5bABE3d1Fae9F8C299b95e4CD1EeAb75B9Ee"
var marketplaceAdd = "0x7477711B5cd6AD7b8c4d76810e2a26fD4ccCf877"
var datAdd = "0xC906f9fbF11e080ab7de294bFE9c89b36FC28C38"
var factoringAdd = "0xAfEF6F405854Ba433a4C150a88d7844D63CE8F05"
var mudarabaAdd = "0xdc262E022C699A33fD97C041bb613c62e9435802"

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

const medTransfertStorageKey = "transfert";
const medbeneficiaireStorageKey = "beneficiaire"

/*

// Truffle code

// Add ether
web3.eth.sendTransaction({from:accounts[0], to:"0x99e5A82c5000f18F3CB0027382F9310110bD0376", value:web3.utils.toWei("5", "ether")});
web3.eth.sendTransaction({from:accounts[0], to:"0x485d493EB472E10469F14bADa83c33941c018A76", value:web3.utils.toWei("5", "ether")});


// add day and month
let instance = await MED.deployed();

instance.incrementDay({from: accounts[0]});

instance.incrementDay({from: accounts[0]});

instance.incrementMonth({from: accounts[0]});


*/