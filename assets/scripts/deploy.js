// node

var fs = require('fs');
var objMed = JSON.parse(fs.readFileSync('contracts/MED.json', 'utf8'));
fs.writeFileSync('geth/med.abi.js', "var medAbi = " + JSON.stringify(objMed.abi));
fs.writeFileSync('geth/med.bytecode.js', "var medByt = " + JSON.stringify(objMed.bytecode));

var objKyc = JSON.parse(fs.readFileSync('contracts/KYC.json', 'utf8'));
fs.writeFileSync('geth/kyc.abi.js', "var kycAbi = " + JSON.stringify(objKyc.abi));
fs.writeFileSync('geth/kyc.bytecode.js', "var kycByt = " + JSON.stringify(objKyc.bytecode));

var objMaster = JSON.parse(fs.readFileSync('contracts/MasterOrg.json', 'utf8'));
fs.writeFileSync('geth/master.abi.js', "var masterAbi = " + JSON.stringify(objMaster.abi));
fs.writeFileSync('geth/master.bytecode.js', "var masterByt = " + JSON.stringify(objMaster.bytecode));

var objFP = JSON.parse(fs.readFileSync('contracts/FP.json', 'utf8'));
fs.writeFileSync('geth/fp.abi.js', "var fpAbi = " + JSON.stringify(objFP.abi));
fs.writeFileSync('geth/fp.bytecode.js', "var fpByt = " + JSON.stringify(objFP.bytecode));

var objMarketplace = JSON.parse(fs.readFileSync('contracts/Marketplace.json', 'utf8'));
fs.writeFileSync('geth/marketplace.abi.js', "var marketplaceAbi = " + JSON.stringify(objMarketplace.abi));
fs.writeFileSync('geth/marketplace.bytecode.js', "var marketplaceByt = " + JSON.stringify(objMarketplace.bytecode));

// Products

var objDat = JSON.parse(fs.readFileSync('contracts/DAT.json', 'utf8'));
fs.writeFileSync('geth/dat.abi.js', "var datAbi = " + JSON.stringify(objDat.abi));
fs.writeFileSync('geth/dat.bytecode.js', "var datByt = " + JSON.stringify(objDat.bytecode));

var objMud = JSON.parse(fs.readFileSync('contracts/Mudaraba.json', 'utf8'));
fs.writeFileSync('geth/mudaraba.abi.js', "var mudAbi = " + JSON.stringify(objMud.abi));
fs.writeFileSync('geth/mudaraba.bytecode.js', "var mudByt = " + JSON.stringify(objMud.bytecode));

var objFactoring = JSON.parse(fs.readFileSync('contracts/Factoring.json', 'utf8'));
fs.writeFileSync('geth/factoring.abi.js', "var facAbi = " + JSON.stringify(objFactoring.abi));
fs.writeFileSync('geth/factoring.bytecode.js', "var facByt = " + JSON.stringify(objFactoring.bytecode));
