loadScript("/home/ethereum/tmp/med.abi.js")
loadScript("/home/ethereum/tmp/med.bytecode.js")

var med = eth.contract(medAbi).at("0xdd3828bd7d36555f96c1aaae7668a1e253dde7dd");

med.incrementMonth({from: eth.coinbase});

