
loadScript("/home/ethereum/tmp/med.abi.js")
loadScript("/home/ethereum/tmp/med.bytecode.js")

var deployArg = {from:eth.coinbase, data:bytecode, gas: 4054108, gasPrice: '200000000000'}

var result = ctr.new("0x66A161F8Fbe105817aeeA74d36f1208260E4bE10", 10, 90000, false, 200000000000000, deployArg, function(e, contract) {
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

// check on var syslog contract address
