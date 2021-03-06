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
    var contractObjectMud2 = await getContractObject(mudarabaCtrAdd2, mudarabaJson);
    var contractObjectMud3 = await getContractObject(mudarabaCtrAdd3, mudarabaJson);
    let account = await getPrimaryAccount();
    let solde = await getContractValueWiArg(contractObjectMed, "balanceOf", account);
    let days = await getContractValueWoArg(contractObjectMed, "daysElapsed");
    let allowance = await getContractValueWi2Arg(contractObjectMed, "allowance", account, medCtrAdd);

    let capitalCap = await getContractValueWoArg(contractObjectMud, "capitalCap");
    let totalCapital = await getContractValueWoArg(contractObjectMud, "totalCapital");
    let description = await getContractValueWoArg(contractObjectMud, "description");
    let ice = await getContractValueWoArg(contractObjectMud, "ice");

    let capitalCap2 = await getContractValueWoArg(contractObjectMud2, "capitalCap");
    let totalCapital2 = await getContractValueWoArg(contractObjectMud2, "totalCapital");
    let description2 = await getContractValueWoArg(contractObjectMud2, "description");
    let ice2 = await getContractValueWoArg(contractObjectMud2, "ice");

    let capitalCap3 = await getContractValueWoArg(contractObjectMud3, "capitalCap");
    let totalCapital3 = await getContractValueWoArg(contractObjectMud3, "totalCapital");
    let description3 = await getContractValueWoArg(contractObjectMud3, "description");
    let ice3 = await getContractValueWoArg(contractObjectMud3, "ice");

    let mudarabaTxt = `Souscription ?? ${description} (ICE ${ice}). Capital demand?? ${capitalCap/100}MED. Capital souscrit ${totalCapital/100}MED`;
    let mudarabaTxt2 = `Souscription ?? ${description2} (ICE ${ice2}). Capital demand?? ${capitalCap2/100}MED. Capital souscrit ${totalCapital2/100}MED`;
    let mudarabaTxt3 = `Souscription ?? ${description3} (ICE ${ice3}). Capital demand?? ${capitalCap3/100}MED. Capital souscrit ${totalCapital3/100}MED`;
    $("#allowance").text(allowance/100);
    $("#solde").text(solde/100);
    $("#date").text("Jour J+" + days);
    $("#connect").hide();
    $("#mud1txt").text(mudarabaTxt);
    $("#mud2txt").text(mudarabaTxt2);
    $("#mud3txt").text(mudarabaTxt3);
    console.log("Solde ?? jour");
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
        showToastGeneric("Achat de DAT", "La souscription au contrat Mudaraba pour un montant de " + productMontant + " a ??t?? correctement r??alis??", 3000);
        $("#faspin").toggle();
        $("#productAmount").val("");
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

    var libelle = dat2pct6mois ? "2% ?? 6 mois" : dat5pct12mois ? "5% ?? 12 mois": "";

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
        showToastGeneric("Achat de DAT", "La souscription au DAT " + libelle + " a ??t?? correctement r??alis??", 3000);
        $("#productAmount").val("");
        $("#faspin").toggle();
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
        $('.toast-body').text("L'annulation de la souscription au DAT a ??t?? correctement r??alis??");
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
        $('.toast-body').text("Votre DAT n'est pas encore ??chu");
        $('.toast').toast({ 'delay': 3000 }).toast('show');
        return;
    }
    
    var contractObject = await getContractObject(datCtrAdd, datJson);
    var contractMethod = "payDat";
    var contractArg = [tokId];

    $('#modal-subscribe').modal('hide');
    $('.modal-backdrop').hide();

    function errorCallback(error) {
        console.log(error);
        showToastGeneric("Paiement de DAT", "Une erreur est survenue lors de la soumission", 5000);
    };
    function transactionHashCallback(transactionHash) {
        showToastGeneric("Paiement de DAT", "Votre paiement est en cours. Merci de patienter.", 5000);
    };
    function finalCallback(data) {
        showToastGeneric("Paiement de DAT", "Le paiement du DAT ?? l'??ch??ance a ??t?? correctement r??alis??", 3000);
        loadMedInfos();
        loadHistoric();
    };

    callContractMethod(contractObject, contractMethod, contractArg, transactionHashCallback, errorCallback, finalCallback);
}

async function onPreauthorize(callback) {
    $("#faspin").toggle();
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
                    ` : `Propri??taire : ${kycDic[owner]}`;
                    $("#tbodyevents").append(
                        `<tr>
                        <td>DAT de <span style="font-weight: bold;">${prod[3]/100}</span><sup>MED</sup> ?? ${prod[2]}% ${payable}</td>
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
                        <a href='#' onclick='onHandleFund("${tokid}")'>Capitaliser | D??caisser</a>
                        ` : `Propri??taire : ${kycDic[owner]}`;
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
    $("#faspin2").toggle();
    var tokid = $("#tokid").text();
    var isCapi = $("#capitalize")[0].checked;
    var montant = $("#productCapital").val();
    var lib = isCapi ? "capitalisation" : "d??caissement";

    var contractObject = await getContractObject(mudarabaCtrAdd, mudarabaJson);
    var contractMethod = isCapi ? "addFund" : "withdrawFund";
    var contractArg = [tokid, montant*100];

    $('#modal-subscribe').modal('hide');
    $('.modal-backdrop').hide();

    function errorCallback(error) {
        console.log(error);
        showToastGeneric("Gestion de Mudaraba", "Une erreur est survenue lors de la " + lib, 3000);
    };
    function transactionHashCallback(transactionHash) {
        showToastGeneric("Gestion de Mudaraba", "Votre " + lib + " est en cours. Merci de patienter.", 3000);
    };
    function finalCallback(data) {
        showToastGeneric("Gestion de Mudaraba", "Votre " + lib + " a ??t?? correctement r??alis??", 3000);
        $("#productCapital").val("");
        $("#faspin2").toggle();
        loadMedInfos();
        loadHistoric();
    };

    $('#modal-mudaraba').modal('hide');
    $('.modal-backdrop').hide();

    var callback = () => callContractMethod(contractObject, contractMethod, contractArg, transactionHashCallback, errorCallback, finalCallback);
    if (isCapi) {
        preauthorizeAmount(callback, mudarabaCtrAdd, montant);
    } else {
        callback();
    }
}

function plusdinfos() {
    $('.toast-header').text("Informations");
    $('.toast-body').text("Afin d'acheter un produit bancaire dans la blockchain, il faut pr??parer une autorisation de d??bit.");
    $('.toast').toast({ 'delay': 10000 }).toast('show');
};

window.addEventListener('load', main);