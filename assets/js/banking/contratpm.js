async function main() {
    let web3 = await getWeb3();
    let netTyp = await web3.eth.net.getNetworkType();
    let id = await web3.eth.net.getId();
    web3.eth.getCoinbase(function (err, account) {
        if (err === null) {
            if ((netTyp == "private") && (id == WEB3ID)) {
                $(".connexion").hide();
            }
        }
    });
    loadMedInfos();
    loadHistoric();
    $('.toast').toast({ 'delay': 2000 });
};

async function loadHistoric() {
    var contractObjectFP = await getContractObject(fpCtrAdd, fpJson);
    var contractObjectFac = await getContractObject(factoringCtrAdd, factoringJson);
    let subsLen = await getContractValueWoArg(contractObjectFac, "getSubscriptionLength");
    let account = await getPrimaryAccount();
    let kycDic = await loadKycDic();
    $("#tbodyevents").html("");
    for (let i=0; i<Number(subsLen); i++) {
        getContractValueWiArg(contractObjectFac, "getSubscription", i).then(function(tokid) {
            getContractValueWiArg(contractObjectFac, "getProduct", tokid).then(function(prod) {
                getContractValueWiArg(contractObjectFP, "ownerOf", tokid).then(function(owner) {
                    const isYou = (owner.toLowerCase() == account.toLowerCase());
                    const isValid = prod[4] == "false" ? "vérifiée" : "non vérifiée";
                    const actions = `Propriétaire : ${kycDic[owner]}`;
                    $("#tbodyevents").append(
                        `<tr>
                        <td>Facture <span style="font-weight: bold;">${isValid}</span> d'un montant de 
                            <span style="font-weight: bold;">${prod[2]/100}</span>
                            <sup>MED</sup> datée à J+${prod[1]} du client ${prod[0]}
                        </td>
                        <td>${actions}</td>
                        </tr>`
                    );
                });
            });
        });
    }
}

async function onSellInvoice() {
    var productMontant = $("#productAmount").val();
    var borrower = $("#borrower").val();
    var invoiceId = $("#facture").val();
    
    var contractObject = await getContractObject(factoringCtrAdd, factoringJson);
    var contractMethod = "sellInvoice";
    var contractArg = [productMontant*100, borrower, invoiceId];

    function errorCallback(error) {
        console.log(error);
        showToastGeneric("Affacturage", "Une erreur est survenue lors de la souscription", 3000);
    };
    function transactionHashCallback(transactionHash) {
        showToastGeneric("Affacturage", "Votre publication de facture est en cours. Merci de patienter.", 3000);
    };
    function finalCallback(data) {
        showToastGeneric("Affacturage", "La publication de la facture " + invoiceId + " pour " + borrower + " a été correctement réalisée", 3000);
        loadMedInfos();
        loadHistoric();
    };

    $('#modal-subscribe').modal('hide');
    $('.modal-backdrop').hide();

    callContractMethod(contractObject, contractMethod, contractArg, transactionHashCallback, errorCallback, finalCallback);
}



window.addEventListener('load', main);