async function getWeb3() {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();
            // Acccounts now exposed
            return web3;
        } catch (error) {
            console.error(error);
        }
    } else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log('Injected web3 detected.');
        return web3;
    } else {
        const provider = new Web3.providers.HttpProvider(blockchainProvider);
        const web3 = new Web3(provider);
        console.log('No web3 instance injected, using Local web3.');
        return web3;
    }
};


function setBalance(w3, account) {
    w3.eth.getBalance(account, function (err, balance) {
        $("#solde").html((w3.utils.fromWei(balance, 'ether')).substring(0, 5) + " ETH");
    });
};

function setAccount(w3, account) {
    w3.eth.getBalance(account, function (err, balance) {
        $("#accountaddress").html(account.substring(0, 15) + "...");
        $("#completeaccountaddress").html(account);
    });
};

async function refreshEther() {
    getWeb3().then((web3) => {
        web3.eth.getCoinbase(function (err, account) {
            if (err === null) {
                setBalance(web3, account);
            }
        });
    });
};

function getEther() {
    getWeb3().then((web3) => {
        web3.eth.getCoinbase(function (err, account) {
            if (err === null) {
                $.getJSON('https://curieux.ma/getether/' + account)
                    .done(function (data) {
                        $("#event").html("<p> 1 Ether reçu. Récepissé de la transaction : " + data.response.split('\n')[0] + ". Il sera visible dans une dizaine de secondes")
                        $('.toast-header').text("Envoi d'Ether");
                        $('.toast-body').text("Envoi d'ether à l'adresse réussi");
                        $('.toast').toast({ 'delay': 2000 }).toast('show');
                        setTimeout(refreshEther, 5000);
                        setTimeout(refreshEther, 10000);
                        setTimeout(refreshEther, 15000);
                        setTimeout(refreshEther, 20000);
                    })
                    .fail(function (jqxhr, textStatus, error) {
                        $('.toast-header').text("Envoi d'Ether");
                        if (jqxhr.responseJSON) {
                            if (jqxhr.responseJSON.data) {
                                $('.toast-body').text(jqxhr.responseJSON.data.stack.split('t.')[0]);
                            }
                            if (jqxhr.responseJSON.response) {
                                $('.toast-body').text(jqxhr.responseJSON.response);
                            }
                        } else {
                            $('.toast-body').text("Une erreur est survenue");
                        }
                        $('.toast').toast({ 'delay': 10000 }).toast('show');
                        console.log("error");
                    })
            }
        });
    });
}

async function getContractObject(contractAddress, jsonContract) {
    if (!contractAddress) {
        showToast();
        return;
    }
    let web3 = await getWeb3();
    let account = await getPrimaryAccount();
    let jsonData = await $.getJSON(jsonContract);
    let abi = jsonData['abi'];
    var ctr;
    try {
        ctr = new web3.eth.Contract(abi, contractAddress, { from: account });
    } catch (error) {
        showToastAdmin();
        return null;
    };
    return ctr;
};

async function createContract(deploymentArgs, jsonContract, errorCallback, transactionHashCallback, finalCallback) {
    let web3 = await getWeb3();
    let account = await getPrimaryAccount();
    $.getJSON(jsonContract, function (data) {
        let abi = data['abi'];
        let bytecode = data['bytecode'];
        let ctr = new web3.eth.Contract(abi);
        ctr.deploy({ data: bytecode, arguments: deploymentArgs })
            .send({ from: account, gas: gasGlobal, gasPrice: gasPriceGlobal }, function (error, transactionHash) { })
            .on('error', errorCallback)
            .on('transactionHash', transactionHashCallback)
            .on('receipt', function (receipt) { })
            .on('confirmation', function (confirmationNumber, receipt) { })
            .then(finalCallback);
    });
};

async function callContractMethod(contractObject, methodTypeArg, methodCallArg, transactionHashCallback, errorCallback, finalCallback) {
    let account = await getPrimaryAccount();
    var call;
    if (methodCallArg) {
        call = contractObject.methods[methodTypeArg](...methodCallArg);
    } else {
        call = contractObject.methods[methodTypeArg]();
    }
    call.send({
        from: account,
        gas: gasGlobal,
        gasPrice: gasPriceGlobal
    }, function (error, transactionHash) {
        console.log(error);
        console.log(transactionHash);
    })
        .on('transactionHash', transactionHashCallback)
        .on('receipt', function (receipt) { })
        .on('confirmation', function (confirmationNumber, receipt) { })
        .on('error', errorCallback)
        .then(finalCallback);
}

async function getPrimaryAccount() {
    let web3 = await getWeb3();
    return web3.eth.getCoinbase();
}

async function getContractValueWiArg(contractObject, methodTypeArg, methodCallArg) {
    return contractObject.methods[methodTypeArg](methodCallArg).call();
}

async function getContractValueWoArg(contractObject, methodTypeArg) {
    return contractObject.methods[methodTypeArg]().call();
}