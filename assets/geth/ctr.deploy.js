loadScript("/home/ethereum/tmp/kyc.abi.js")
loadScript("/home/ethereum/tmp/kyc.bytecode.js")


var kycCtr = eth.contract(kycAbi);
var kycDeployArg = {from:eth.coinbase, data:kycByt, gas: 4054108, gasPrice: '200000000000'}
var kycInstance = kycCtr.new(kycDeployArg, function(e, contract) {
    if (e) {
        console.log("err creating contract", e);
    } else {
        if (!contract.address) {
            console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
        } else {
            console.log("Contract mined! Address: " + contract.address);
            address = contract.address
            console.log(contract);
        }
    }
   }
);

// Get KYC address and inject it in MED

loadScript("/home/ethereum/tmp/med.abi.js")
loadScript("/home/ethereum/tmp/med.bytecode.js")

var medCtr = eth.contract(medAbi);
var medDeployArg = {from:eth.coinbase, data:medByt, gas: 4054108, gasPrice: '200000000000'};
var medInstance = medCtr.new("0x66A161F8Fbe105817aeeA74d36f1208260E4bE10", 10, 90000, false, 200000000000000, "0x4b29b2d3ebc574984360a114990b4c6edaeb6bf7", medDeployArg, function(e, contract) {
    if (e) {
        console.log("err creating contract", e);
    } else {
        if (!contract.address) {
            console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
        } else {
            console.log("Contract mined! Address: " + contract.address);
            address = contract.address
            console.log(contract);
        }
    }
   }
);

// Ok now back to Master and Association

loadScript("/home/ethereum/tmp/master.abi.js")
loadScript("/home/ethereum/tmp/master.bytecode.js")

var masterCtr = eth.contract(masterAbi);
var masterDeployArg = {from:eth.coinbase, data:masterByt, gas: 4054108, gasPrice: '200000000000'};
var masterInstance = masterCtr.new(masterDeployArg, function(e, contract) {
    if (e) {
        console.log("err creating contract", e);
    } else {
        if (!contract.address) {
            console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
        } else {
            console.log("Contract mined! Address: " + contract.address);
            address = contract.address
            console.log(contract);
        }
    }
   }
);

// Financial Product

loadScript("/home/ethereum/tmp/fp.abi.js")
loadScript("/home/ethereum/tmp/fp.bytecode.js")

var fpCtr = eth.contract(fpAbi);
var fpDeployArg = {from:eth.coinbase, data:fpByt, gas: 4054108, gasPrice: '200000000000'};
var fpInstance = fpCtr.new("BlockBank Finance Products", "FP", fpDeployArg, function(e, contract) {
    if (e) {
        console.log("err creating contract", e);
    } else {
        if (!contract.address) {
            console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
        } else {
            console.log("Contract mined! Address: " + contract.address);
            address = contract.address
            console.log(contract);
        }
    }
   }
);

// Marketplace

loadScript("/home/ethereum/tmp/marketplace.abi.js")
loadScript("/home/ethereum/tmp/marketplace.bytecode.js")

var mktCtr = eth.contract(marketplaceAbi);
var mktDeployArg = {from:eth.coinbase, data:marketplaceByt, gas: 4054108, gasPrice: '200000000000'};
var mktInstance = mktCtr.new(5000, 2000, "0xdd3828bd7d36555f96c1aaae7668a1e253dde7dd", "0x76a0b26c5e08282bcb421e66ecc78cb59f1e834c", mktDeployArg, function(e, contract) {
    if (e) {
        console.log("err creating contract", e);
    } else {
        if (!contract.address) {
            console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
        } else {
            console.log("Contract mined! Address: " + contract.address);
            address = contract.address
            console.log(contract);
        }
    }
   }
);

// DAT

loadScript("/home/ethereum/tmp/dat.abi.js")
loadScript("/home/ethereum/tmp/dat.bytecode.js")

var datCtr = eth.contract(datAbi);
var datDeployArg = {from:eth.coinbase, data:datByt, gas: 4054108, gasPrice: '200000000000'};
var datInstance = datCtr.new(10000,"0xdd3828bd7d36555f96c1aaae7668a1e253dde7dd", "0x76a0b26c5e08282bcb421e66ecc78cb59f1e834c", datDeployArg, function(e, contract) {
    if (e) {
        console.log("err creating contract", e);
    } else {
        if (!contract.address) {
            console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
        } else {
            console.log("Contract mined! Address: " + contract.address);
            address = contract.address
            console.log(contract);
        }
    }
   }
);

// Mudaraba

loadScript("/home/ethereum/tmp/mudaraba.abi.js")
loadScript("/home/ethereum/tmp/mudaraba.bytecode.js")

var mudCtr = eth.contract(mudAbi);
var mudDeployArg = {from:eth.coinbase, data:mudByt, gas: 4054108, gasPrice: '200000000000'};
var mudInstance1 = mudCtr.new("Patisserie Ibtissam", "123456/178", 1000000, "0xdd3828bd7d36555f96c1aaae7668a1e253dde7dd", "0x76a0b26c5e08282bcb421e66ecc78cb59f1e834c", mudDeployArg, function(e, contract) {
    if (e) {
        console.log("err creating contract", e);
    } else {
        if (!contract.address) {
            console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
        } else {
            console.log("Contract mined! Address: " + contract.address);
            address = contract.address
            console.log(contract);
        }
    }
   }
);

var mudInstance2 = mudCtr.new("Peinture et batiment SARL", "121213/178", 2500000, "0xdd3828bd7d36555f96c1aaae7668a1e253dde7dd", "0x76a0b26c5e08282bcb421e66ecc78cb59f1e834c", mudDeployArg, function(e, contract) {
    if (e) {
        console.log("err creating contract", e);
    } else {
        if (!contract.address) {
            console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
        } else {
            console.log("Contract mined! Address: " + contract.address);
            address = contract.address
            console.log(contract);
        }
    }
   }
);

var mudInstance3 = mudCtr.new("Pepiniere Bouskoura", "9457896/121", 10000000, "0xdd3828bd7d36555f96c1aaae7668a1e253dde7dd", "0x76a0b26c5e08282bcb421e66ecc78cb59f1e834c", mudDeployArg, function(e, contract) {
    if (e) {
        console.log("err creating contract", e);
    } else {
        if (!contract.address) {
            console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
        } else {
            console.log("Contract mined! Address: " + contract.address);
            address = contract.address
            console.log(contract);
        }
    }
   }
);

// Factoring

loadScript("/home/ethereum/tmp/factoring.abi.js")
loadScript("/home/ethereum/tmp/factoring.bytecode.js")

var facCtr = eth.contract(facAbi);
var facDeployArg = {from:eth.coinbase, data:facByt, gas: 4054108, gasPrice: '200000000000'};
var facInstance = facCtr.new("0xdd3828bd7d36555f96c1aaae7668a1e253dde7dd", "0x76a0b26c5e08282bcb421e66ecc78cb59f1e834c", facDeployArg, function(e, contract) {
    if (e) {
        console.log("err creating contract", e);
    } else {
        if (!contract.address) {
            console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
        } else {
            console.log("Contract mined! Address: " + contract.address);
            address = contract.address
            console.log(contract);
        }
    }
   }
);


