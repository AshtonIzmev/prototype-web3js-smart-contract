
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
    loadDATHistoric();
    $('.toast').toast({ 'delay': 2000 });
};

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

async function buyProduct() {
    var productMontant = $("#productAmount").val();
    var dat2pct6mois = $("#dat2pct6mois")[0].checked;
    var dat5pct12mois = $("#dat5pct12mois")[0].checked;

    var libDat = dat2pct6mois ? "2% à 6 mois" : dat5pct12mois ? "5% à 12 mois": "";

    var dayDuration = dat2pct6mois ? 6*30 : dat5pct12mois ? 12*30: 0;
    var interest = dat2pct6mois ? 2 : dat5pct12mois ? 5: 0;
    
    var contractObject = await getContractObject(datCtrAdd, datJson);
    var contractMethod = "subscribe";
    var contractArg = [productMontant*100, dayDuration, interest];

    function errorCallback(error) {
        console.log(error);
        $('.toast-header').text("Souscription de DAT");
        $('.toast-body').text("Une erreur est survenue lors de la soumission");
        $('.toast').toast({ 'delay': 3000 }).toast('show');
    };
    function transactionHashCallback(transactionHash) {
        $('.toast-header').text("Souscription de DAT");
        $('.toast-body').text("Votre souscription au DAT est en cours. Merci de patienter.");
        $('.toast').toast({ 'delay': 3000 }).toast('show');
    };
    function finalCallback(data) {
        $('.toast-header').text("Achat de DAT");
        $('.toast-body').text("La souscription au DAT " + libDat + " a été correctement réalisé");
        $('.toast').toast({ 'delay': 3000 }).toast('show');
        loadMedInfos();
        loadDATHistoric("#tbodyevents");
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
        loadDATHistoric();
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
        loadDATHistoric();
    };

    $('#modal-subscribe').modal('hide');
    $('.modal-backdrop').hide();

    callContractMethod(contractObject, contractMethod, contractArg, transactionHashCallback, errorCallback, finalCallback);
}

async function onPreauthorize(callback) {
    var productMontant = $("#productAmount").val();
    preauthorizeAmount(callback, datCtrAdd, productMontant);
};

async function loadDATHistoric() {
    var contractObjectMed = await getContractObject(medCtrAdd, medJsonPath);
    var contractObjectFP = await getContractObject(fpCtrAdd, fpJson);
    let days = await getContractValueWoArg(contractObjectMed, "daysElapsed");
    var contractObjectDat = await getContractObject(datCtrAdd, datJson);
    let subsLen = await getContractValueWoArg(contractObjectDat, "getSubscriptionLength");
    let account = await getPrimaryAccount();
    $("#tbodyevents").html("");
    for (let i=0; i<Number(subsLen); i++) {
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
                    ` : `Propriétaire : ${owner}`;
                    $("#tbodyevents").append(
                        `<tr>
                        <td>DAT de ${prod[3]/100}MED à ${prod[2]}% ${payable}</td>
                        <td>${actions}</td>
                        </tr>`
                    );
                });
            });
        });
    }
}

function plusdinfos() {
    $('.toast-header').text("Informations");
    $('.toast-body').text("Afin d'acheter un produit bancaire dans la blockchain, il faut préparer une autorisation de débit.");
    $('.toast').toast({ 'delay': 10000 }).toast('show');
};

window.addEventListener('load', main);