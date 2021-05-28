
loadScript("/home/ethereum/tmp/med.abi.js")
loadScript("/home/ethereum/tmp/med.bytecode.js")

var med = eth.contract(abi).at("0x01AbA88b557c46dC82D9B6f8367125370AB23c49");

med.incrementDay({from: eth.coinbase});

/*

/usr/bin/geth attach geth.ipc --exec 'loadScript("med.day.js")'

*/