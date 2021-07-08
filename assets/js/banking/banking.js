async function loadMedInfos() {
    var contractObject = await getContractObject(medCtrAdd, medJsonPath);
    let account = await getPrimaryAccount();
    let solde = await getContractValueWiArg(contractObject, "balanceOf", account);
    let days = await getContractValueWoArg(contractObject, "daysElapsed");
    let allowance = await getContractValueWi2Arg(contractObject, "allowance", account, medCtrAdd);
    $("#allowance").text(allowance/100);
    $("#solde").text(solde/100);
    $("#date").text("Jour " + days);
    $("#connect").hide();
    console.log("Solde à jour");
};

async function preauthorizeAmount(callback, destinationAdd, amount) {

    var contractObject = await getContractObject(medCtrAdd, medJsonPath);
    var contractMethod = "approve";
    var contractArg = [destinationAdd, amount*100];

    $('#modal-allow').modal('hide');
    $('.modal-backdrop').hide();

    function errorCallback(error) {
        console.log(error);
        showToastGeneric("Autorisation de débit", "Une erreur est survenue lors de la pré-autorisation", 3000);
    };
    function transactionHashCallback(transactionHash) {
        showToastGeneric("Autorisation de débit", "Votre pré-autorisation est en cours. Merci de patienter.", 5000);
    };
    function finalCallback(data) {
        showToastGeneric("Autorisation de débit", "La pré-autorisation pour un montant de  " + amount + "MED a été correctement effectuée", 3000);
        callback();
    };

    callContractMethod(contractObject, contractMethod, contractArg, transactionHashCallback, errorCallback, finalCallback);
};

async function preauthorizeToken(callback, tokId) {

    var contractObject = await getContractObject(fpCtrAdd, fpJson);
    var contractMethod = "approve";
    var contractArg = [marketplaceCtrAdd, tokId];

    function errorCallback(error) {
        console.log(error);
        showToastGeneric("Autorisation de manipulation de token", "Une erreur est survenue lors de la pré-autorisation", 3000);
    };
    function transactionHashCallback(transactionHash) {
        showToastGeneric("Autorisation de manipulation de token", "Votre pré-autorisation est en cours. Merci de patienter.", 3000);
    };
    function finalCallback(data) {
        showToastGeneric("Autorisation de manipulation de token", "La pré-autorisation pour le token d'id " + tokId + " a été correctement effectuée", 3000);
        callback();
    };

    $('#modal-allow').modal('hide');
    $('.modal-backdrop').hide();

    callContractMethod(contractObject, contractMethod, contractArg, transactionHashCallback, errorCallback, finalCallback);
};

async function loadKycDic() {
    var kycDic = {}
    var contractObject = await getContractObject(kycCtrAdd, kycJsonPath);
    contractObject.getPastEvents("IdentitySubmission", { fromBlock: 0, toBlock: 'latest' }, function (error, eventResult) {
        if (error)
            console.log(error);
        else if (eventResult) {
            eventResult.forEach(function (e) {
                let kycName = e.returnValues._name;
                let kycPersonnAdd = e.returnValues._add;
                kycDic[kycPersonnAdd] = kycName;
            });
        }
    });
    return kycDic;
};
