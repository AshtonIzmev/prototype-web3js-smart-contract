loadScript("/home/ethereum/tmp/kyc.abi.js")
loadScript("/home/ethereum/tmp/kyc.bytecode.js")
loadScript("/home/ethereum/tmp/med.abi.js")
loadScript("/home/ethereum/tmp/med.bytecode.js")
loadScript("/home/ethereum/tmp/fp.abi.js")
loadScript("/home/ethereum/tmp/fp.bytecode.js")
loadScript("/home/ethereum/tmp/marketplace.abi.js")
loadScript("/home/ethereum/tmp/marketplace.bytecode.js")

loadScript("/home/ethereum/tmp/dat.abi.js")
loadScript("/home/ethereum/tmp/dat.bytecode.js")
loadScript("/home/ethereum/tmp/mudaraba.abi.js")
loadScript("/home/ethereum/tmp/mudaraba.bytecode.js")
loadScript("/home/ethereum/tmp/factoring.abi.js")
loadScript("/home/ethereum/tmp/factoring.bytecode.js")

var kycInst = eth.contract(kycAbi).at("0x4b29b2d3ebc574984360a114990b4c6edaeb6bf7");
var medInst = eth.contract(medAbi).at("0xdd3828bd7d36555f96c1aaae7668a1e253dde7dd");
var fpInst = eth.contract(fpAbi).at("0x76a0b26c5e08282bcb421e66ecc78cb59f1e834c");
var mktInst = eth.contract(marketplaceAbi).at("0xbb1bdd553f21bd0aee5a0e783d19246ceebba571");

var datInst = eth.contract(datAbi).at("0x60d2729a948cd5cec18943bb2d69a8a58e51fd14");
var facInst = eth.contract(facAbi).at("0x36a43738884bb1b1af247d3428dde7f6c952b239");
var mudInst1 = eth.contract(mudAbi).at("0xfca80a163fa4462dfb91226c8e8058e82788f4d2");
var mudInst2 = eth.contract(mudAbi).at("0x8e8a4b517135bc71e8e68a547265752e99a4f06f");
var mudInst3 = eth.contract(mudAbi).at("0x69fc10dad001677402d6fb6f3832aa4bf16d12c4");


fpInst.setApprovalForAll(datInst.address, true, {from: eth.coinbase});
fpInst.setApprovalForAll(facInst.address, true, {from: eth.coinbase});
fpInst.setApprovalForAll(mudInst1.address, true, {from: eth.coinbase});
fpInst.setApprovalForAll(mudInst2.address, true, {from: eth.coinbase});
fpInst.setApprovalForAll(mudInst3.address, true, {from: eth.coinbase});

datInst.setProduct(180, 2, {from: eth.coinbase});
datInst.setProduct(360, 5, {from: eth.coinbase});

kycInst.submitKYC("Marketplace by BlockBank", "BLKBK", mktInst.address, {from: eth.coinbase});
kycInst.submitKYC("Produit DAT by BlockBank", "BLKBK", datInst.address, {from: eth.coinbase});
kycInst.submitKYC("Produit Factoring by BlockBank", "BLKBK", facInst.address, {from: eth.coinbase});
kycInst.submitKYC("Produit Mudaraba 1 by BlockBank", "BLKBK", mudInst1.address, {from: eth.coinbase});
kycInst.submitKYC("Produit Mudaraba 2 by BlockBank", "BLKBK", mudInst2.address, {from: eth.coinbase});
kycInst.submitKYC("Produit Mudaraba 3 by BlockBank", "BLKBK", mudInst3.address, {from: eth.coinbase});
