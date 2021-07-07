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

async function loadMedInfos() {
    var contractObjectMed = await getContractObject(medCtrAdd, medJsonPath);
    var contractObjectMud = await getContractObject(mudarabaCtrAdd, mudarabaJson);
    let account = await getPrimaryAccount();
    let solde = await getContractValueWiArg(contractObjectMed, "balanceOf", account);
    let days = await getContractValueWoArg(contractObjectMed, "daysElapsed");
    let allowance = await getContractValueWi2Arg(contractObjectMed, "allowance", account, medCtrAdd);
    let capitalCap = await getContractValueWoArg(contractObjectMud, "capitalCap");
    let totalCapital = await getContractValueWoArg(contractObjectMud, "totalCapital");
    let description = await getContractValueWoArg(contractObjectMud, "description");
    let ice = await getContractValueWoArg(contractObjectMud, "ice");
    let mudarabaTxt = `Souscription à ${description} (ICE ${ice}). Capital demandé ${capitalCap/100}MED. Capital souscrit ${totalCapital/100}MED`;
    $("#allowance").text(allowance/100);
    $("#solde").text(solde/100);
    $("#date").text("Jour " + days);
    $("#connect").hide();
    $("#mud1txt").text(mudarabaTxt);
    console.log("Solde à jour");
};

async function buyProduct() {
    var mudaraba1 = $("#mudaraba1")[0].checked;
    if (mudaraba1) {
        buyMudaraba()
    } else {
        buyDAT()
    }
}

async function buyMudaraba() {
    var productMontant = $("#productAmount").val();
    var contractObject = await getContractObject(mudarabaCtrAdd, mudarabaJson);
    var contractMethod = "subscribe";
    var contractArg = [productMontant*100];

    function errorCallback(error) {
        console.log(error);
        showToastGeneric("Souscription de Mudaraba", "Une erreur est survenue lors de la soumission", 3000);
    };
    function transactionHashCallback(transactionHash) {
        showToastGeneric("Souscription de Mudaraba", "Votre souscription au contrat Mudaraba est en cours. Merci de patienter.", 3000);
    };
    function finalCallback(data) {
        showToastGeneric("Achat de DAT", "La souscription au contrat Mudaraba pour un montant de " + productMontant + " a été correctement réalisé", 3000);
        loadMedInfos();
        loadHistoric();
    };

    $('#modal-subscribe').modal('hide');
    $('.modal-backdrop').hide();

    callContractMethod(contractObject, contractMethod, contractArg, transactionHashCallback, errorCallback, finalCallback);
}

async function buyDAT() {
    var productMontant = $("#productAmount").val();
    var dat2pct6mois = $("#dat2pct6mois")[0].checked;
    var dat5pct12mois = $("#dat5pct12mois")[0].checked;

    var libelle = dat2pct6mois ? "2% à 6 mois" : dat5pct12mois ? "5% à 12 mois": "";

    var dayDuration = dat2pct6mois ? 6*30 : dat5pct12mois ? 12*30: 0;
    var interest = dat2pct6mois ? 2 : dat5pct12mois ? 5: 0;
    
    var contractObject = await getContractObject(datCtrAdd, datJson);
    var contractMethod = "subscribe";
    var contractArg = [productMontant*100, dayDuration, interest];

    function errorCallback(error) {
        console.log(error);
        showToastGeneric("Souscription de DAT", "Une erreur est survenue lors de la soumission", 3000);
    };
    function transactionHashCallback(transactionHash) {
        showToastGeneric("Souscription de DAT", "Votre souscription au DAT est en cours. Merci de patienter.", 3000);
    };
    function finalCallback(data) {
        showToastGeneric("Achat de DAT", "La souscription au DAT " + libelle + " a été correctement réalisé", 3000);
        loadMedInfos();
        loadHistoric();
    };

    $('#modal-subscribe').modal('hide');
    $('.modal-backdrop').hide();

    callContractMethod(contractObject, contractMethod, contractArg, transactionHashCallback, errorCallback, finalCallback);
}

async function cancelProduct(tokId) {
    
    var contractObject = await getContractObject(datCtrAdd, datJson);
    var contractMethod = "cancelDat";
    var contractArg = [tokId];

    function errorCallback(error) {
        console.log(error);
        $('.toast-header').text("Annulation de DAT");
        $('.toast-body').text("Une erreur est survenue lors de la soumission");
        $('.toast').toast({ 'delay': 3000 }).toast('show');
    };
    function transactionHashCallback(transactionHash) {
        $('.toast-header').text("Annulation de DAT");
        $('.toast-body').text("Votre annulation est en cours. Merci de patienter.");
        $('.toast').toast({ 'delay': 3000 }).toast('show');
    };
    function finalCallback(data) {
        $('.toast-header').text("Annulation de DAT");
        $('.toast-body').text("L'annulation de la souscription au DAT a été correctement réalisé");
        $('.toast').toast({ 'delay': 3000 }).toast('show');
        loadMedInfos();
        loadHistoric();
    };

    $('#modal-subscribe').modal('hide');
    $('.modal-backdrop').hide();

    callContractMethod(contractObject, contractMethod, contractArg, transactionHashCallback, errorCallback, finalCallback);
}

async function payProduct(tokId, daysRemaining) {

    if (Number(daysRemaining) >= 0) {
        $('.toast-header').text("Paiement de DAT");
        $('.toast-body').text("Votre DAT n'est pas encore échu");
        $('.toast').toast({ 'delay': 3000 }).toast('show');
        return;
    }
    
    var contractObject = await getContractObject(datCtrAdd, datJson);
    var contractMethod = "payDat";
    var contractArg = [tokId];

    function errorCallback(error) {
        console.log(error);
        $('.toast-header').text("Paiement de DAT");
        $('.toast-body').text("Une erreur est survenue lors de la soumission");
        $('.toast').toast({ 'delay': 3000 }).toast('show');
    };
    function transactionHashCallback(transactionHash) {
        $('.toast-header').text("Paiement de DAT");
        $('.toast-body').text("Votre paiement est en cours. Merci de patienter.");
        $('.toast').toast({ 'delay': 3000 }).toast('show');
    };
    function finalCallback(data) {
        $('.toast-header').text("Paiement de DAT");
        $('.toast-body').text("Le paiement du DAT à l'échéance a été correctement réalisé");
        $('.toast').toast({ 'delay': 3000 }).toast('show');
        loadMedInfos();
        loadHistoric();
    };

    $('#modal-subscribe').modal('hide');
    $('.modal-backdrop').hide();

    callContractMethod(contractObject, contractMethod, contractArg, transactionHashCallback, errorCallback, finalCallback);
}

async function onPreauthorize(callback) {
    var productMontant = $("#productAmount").val();
    var mudaraba1 = $("#mudaraba1")[0].checked;
    if (mudaraba1) {
        preauthorizeAmount(callback, mudarabaCtrAdd, productMontant);
    } else {
        preauthorizeAmount(callback, datCtrAdd, productMontant);
    }
};

async function loadHistoric() {
    var contractObjectMed = await getContractObject(medCtrAdd, medJsonPath);
    var contractObjectFP = await getContractObject(fpCtrAdd, fpJson);
    let days = await getContractValueWoArg(contractObjectMed, "daysElapsed");
    var contractObjectDat = await getContractObject(datCtrAdd, datJson);
    var contractObjectMud = await getContractObject(mudarabaCtrAdd, mudarabaJson);
    let subsLenDat = await getContractValueWoArg(contractObjectDat, "getSubscriptionLength");
    let subsLenMud = await getContractValueWoArg(contractObjectMud, "getSubscriptionLength");
    let capitalCap = await getContractValueWoArg(contractObjectMud, "capitalCap");
    let account = await getPrimaryAccount();
    let kycDic = await loadKycDic();
    $("#tbodyevents").html("");
    for (let i=0; i<Number(subsLenDat); i++) {
        getContractValueWiArg(contractObjectDat, "getSubscription", i).then(function(tokid) {
            getContractValueWiArg(contractObjectDat, "getProduct", tokid).then(function(prod) {
                getContractValueWiArg(contractObjectFP, "ownerOf", tokid).then(function(owner) {
                    const daysLeft = (Number(prod[1])-days+Number(prod[0]));
                    const monthsLeft = Math.floor(daysLeft/30);
                    const isYou = (owner.toLowerCase() == account.toLowerCase());
                    const payable = daysLeft < 0 ? `payable maintenant` : `payable dans ${monthsLeft} mois et ${daysLeft%30} jours`
                    const actions = isYou ? `
                        <a href='#' onclick='cancelProduct("${tokid}")'>Annuler</a> | 
                        <a href='#' onclick='payProduct("${tokid}", "${daysLeft}")'>Payer</a>
                    ` : `Propriétaire : ${kycDic[owner]}`;
                    $("#tbodyevents").append(
                        `<tr>
                        <td>DAT de <span style="font-weight: bold;">${prod[3]/100}</span><sup>MED</sup> à ${prod[2]}% ${payable}</td>
                        <td>${actions}</td>
                        </tr>`
                    );
                });
            });
        });
    }
    for (let i=0; i<Number(subsLenMud); i++) {
        getContractValueWiArg(contractObjectMud, "getSubscription", i).then(function(tokid) {
            getContractValueWiArg(contractObjectMud, "getProduct", tokid).then(function(prod) {
                getContractValueWiArg(contractObjectFP, "ownerOf", tokid).then(function(owner) {
                    const isYou = (owner.toLowerCase() == account.toLowerCase());
                    const actions = isYou ? `
                        <a href='#' onclick='onHandleFund("${tokid}")'>Capitaliser | Décaisser</a>
                        ` : `Propriétaire : ${kycDic[owner]}`;
                    $("#tbodyevents").append(
                        `<tr>
                        <td>Mudaraba de <span style="font-weight: bold;">${prod[1]/100}</span><sup>MED</sup> sur un capital de <span style="font-weight: bold;">${capitalCap/100}</span><sup>MED</sup></td>
                        <td>${actions}</td>
                        </tr>`
                    );
                });
            });
        });
    }
}

function onHandleFund(tokId) {
    $('#modal-mudaraba').modal('show');
    $('.modal-backdrop').show();
    $("#tokid").text(tokId);
}

async function onDeCapitalize() {
    var tokid = $("#tokid").text();
    var isCapi = $("#capitalize")[0].checked;
    var montant = $("#productCapital").val();
    var lib = isCapi ? "capitalisation" : "décaissement";

    var contractObject = await getContractObject(mudarabaCtrAdd, mudarabaJson);
    var contractMethod = isCapi ? "addFund" : "withdrawFund";
    var contractArg = [tokid, montant*100];

    function errorCallback(error) {
        console.log(error);
        showToastGeneric("Gestion de Mudaraba", "Une erreur est survenue lors de la " + lib, 3000);
    };
    function transactionHashCallback(transactionHash) {
        showToastGeneric("Gestion de Mudaraba", "Votre " + lib + " est en cours. Merci de patienter.", 3000);
    };
    function finalCallback(data) {
        showToastGeneric("Gestion de Mudaraba", "Votre " + lib + " a été correctement réalisé", 3000);
        loadMedInfos();
        loadHistoric();
    };

    $('#modal-subscribe').modal('hide');
    $('.modal-backdrop').hide();
    
    var callback = () => callContractMethod(contractObject, contractMethod, contractArg, transactionHashCallback, errorCallback, finalCallback);
    if (isCapi) {
        preauthorizeAmount(callback, mudarabaCtrAdd, montant);
    } else {
        callback();
    }

    $('#modal-mudaraba').modal('hide');
    $('.modal-backdrop').hide();
}

function plusdinfos() {
    $('.toast-header').text("Informations");
    $('.toast-body').text("Afin d'acheter un produit bancaire dans la blockchain, il faut préparer une autorisation de débit.");
    $('.toast').toast({ 'delay': 10000 }).toast('show');
};

window.addEventListener('load', main);