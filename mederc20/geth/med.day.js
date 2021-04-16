
loadScript("/home/ethereum/tmp/med.abi.js")
loadScript("/home/ethereum/tmp/med.bytecode.js")
loadScript("/home/ethereum/tmp/med.deploy.js")

var med = eth.contract(abi).at("0x398c53e17a755280b3cb7283f2e79cde57973119");

med.incrementDay({from: eth.coinbase});

