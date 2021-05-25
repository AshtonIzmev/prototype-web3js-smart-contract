
loadScript("/home/ethereum/tmp/med.abi.js")
loadScript("/home/ethereum/tmp/med.bytecode.js")
loadScript("/home/ethereum/tmp/med.deploy.js")

var med = eth.contract(abi).at("0x91EA2D6Ed5F19b877abEC6B4597331E5D81F35d3");

med.incrementMonth({from: eth.coinbase});

