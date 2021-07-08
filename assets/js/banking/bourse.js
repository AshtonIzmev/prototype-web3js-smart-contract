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
    loadMarketplaceHistoric();
    $("#sellfees").text(sellFees/100);
    $("#withdrawfees").text(withdrawFees/100);
    $('.toast').toast({ 'delay': 2000 });
};

async function loadMarketplaceHistoric() {
    var contractObjectDat = await getContractObject(datCtrAdd, datJson);
    var contractObjectMud = await getContractObject(mudarabaCtrAdd, mudarabaJson);
    var contractObjectFac = await getContractObject(factoringCtrAdd, factoringJson);
    var contractObjectMP = await getContractObject(marketplaceCtrAdd, marketplaceJson);
    var contractObjectMed = await getContractObject(medCtrAdd, medJsonPath);
    var contractObjectFP = await getContractObject(fpCtrAdd, fpJson);
    let days = await getContractValueWoArg(contractObjectMed, "daysElapsed");
    let subsLenDat = await getContractValueWoArg(contractObjectDat, "getSubscriptionLength");
    let subsLenMud = await getContractValueWoArg(contractObjectMud, "getSubscriptionLength");
    let subsLenFac = await getContractValueWoArg(contractObjectFac, "getSubscriptionLength");
    let description = await getContractValueWoArg(contractObjectMud, "description");
    let account = await getPrimaryAccount();
    let kycDic = await loadKycDic();
    $("#tbodyevents").html("");
    var produits = []
    for (let i=0; i<Number(subsLenDat); i++) {
        let tokid = await getContractValueWiArg(contractObjectDat, "getSubscription", i);
        let prod = await getContractValueWiArg(contractObjectDat, "getProduct", tokid);
        const daysLeft = (Number(prod[1])-days+Number(prod[0]));
        const monthsLeft = Math.floor(daysLeft/30);
        const payable = daysLeft < 0 ? `payable maintenant` : `payable dans ${monthsLeft} mois et ${daysLeft%30} jours`
        let libelle = `DAT de <span style="font-weight: bold;">${prod[3]/100}<sup>MED</sup></span> à ${prod[2]}% ${payable}`;
        produits.push({"tokid": tokid, "prod": prod, "lib": libelle});
    }
    for (let i=0; i<Number(subsLenMud); i++) {
        let tokid = await getContractValueWiArg(contractObjectMud, "getSubscription", i);
        let prod = await getContractValueWiArg(contractObjectMud, "getProduct", tokid);
        let libelle = `Souscription Mudaraba à <span style="font-style: italic;">${description}</span> de <span style="font-weight: bold;">${prod[1]/100}</span><sup>MED</sup>`;
        produits.push({"tokid": tokid, "prod": prod, "lib": libelle});
    }
    for (let i=0; i<Number(subsLenFac); i++) {
        let tokid = await getContractValueWiArg(contractObjectFac, "getSubscription", i);
        let prod = await getContractValueWiArg(contractObjectFac, "getProduct", tokid);
        let isValid = prod[4] == "false" ? "vérifiée" : "non vérifiée";
        let libelle = `Facture <span style="font-weight: bold;">${isValid}</span> d'un montant de 
        <span style="font-weight: bold;">${prod[2]/100}</span>
        <sup>MED</sup> datée à J+${prod[1]}`;
        produits.push({"tokid": tokid, "prod": prod, "lib": libelle});
    }
    for (let i=0; i<produits.length; i++) {
        let tokid = produits[i]["tokid"];
        let libelle = produits[i]["lib"];
        getContractValueWiArg(contractObjectMP, "isToSell", tokid).then(function(isToSell) {
            getContractValueWiArg(contractObjectFP, "ownerOf", tokid).then(function(owner) {
                var isYou = (owner.toLowerCase() == account.toLowerCase());
                var actions = "";
                if (isToSell) {
                    getContractValueWiArg(contractObjectMP, "getOffer", tokid).then(function(offer) {
                        isYou = (offer[0].toLowerCase() == account.toLowerCase());
                        actions = isYou ? `En vente pour ${offer[1]/100}<sup>MED</sup> | <a href='#' onclick='onWithdrawTokenProduct(${tokid})'>Annuler</a>` :
                        `<a href='#' onclick='onBuyTokenProduct(${tokid})'>Acheter pour ${offer[1]/100}<sup>MED</sup></a>`
                        $("#tbodyevents").append(`<tr><td>${libelle}</td><td>${actions}</td></tr>`);
                    });
                } else {
                        actions = isYou ? `<a href='#' onclick='showSellProduct("${tokid}")'>Mettre en vente</a> ` : 
                        `Propriétaire : ${kycDic[owner]}`;
                        $("#tbodyevents").append(`<tr><td>${libelle}</td><td>${actions}</td></tr>`);
                }
            });
        });
    }
};

async function showSellProduct(tokId) {
    $("#tokid").text(tokId);
    $('#modal-sell').modal('show');
    $('.modal-backdrop').show();
}

async function onWithdrawTokenProduct(tokId) {
    var contractObject = await getContractObject(marketplaceCtrAdd, marketplaceJson);
    var contractMethod = "withdraw";
    var contractArg = [tokId];

    function errorCallback(error) {
        console.log(error);
        showToastGeneric("Retrait de mise en vente de produit", "Une erreur est survenue lors de l'annulation", 3000);
    };
    function transactionHashCallback(transactionHash) {
        showToastGeneric("Retrait de mise en vente de produit", "L'annulation de la mise en vente est en cours. Merci de patienter", 3000);
    };
    function finalCallback(data) {
        showToastGeneric("Retrait de mise en vente de produit", "L'annulation a été correctement effectuée", 3000);
        loadMarketplaceHistoric();
        loadMedInfos();
    };

    callContractMethod(contractObject, contractMethod, contractArg, transactionHashCallback, errorCallback, finalCallback);
};

async function onSellTokenProduct() {
    $("#faspin").toggle();
    var price = $("#productAmount").val();
    var tokId = $("#tokid").text();
    var allowance = Number(price) + sellFees + withdrawFees;
    var callback = () => preauthorizeAmount(() => sellTokenProduct(price, tokId), marketplaceCtrAdd, allowance);
    preauthorizeToken(callback, tokId);
};

async function onBuyTokenProduct(tokId) {
    var contractObjectMP = await getContractObject(marketplaceCtrAdd, marketplaceJson);
    var offer = await getContractValueWiArg(contractObjectMP, "getOffer", tokId);
    var allowance = Number(offer[1]);
    preauthorizeAmount(() => buyTokenProduct(tokId), marketplaceCtrAdd, allowance);
};

async function sellTokenProduct(price, tokId) {
    var contractObject = await getContractObject(marketplaceCtrAdd, marketplaceJson);
    var contractMethod = "sell";
    var contractArg = [tokId, price*100];

    function errorCallback(error) {
        console.log(error);
        showToastGeneric("Mise en vente de produit", "Une erreur est survenue lors de la mise en vente", 3000);
    };
    function transactionHashCallback(transactionHash) {
        showToastGeneric("Mise en vente de produit", "La mise en vente est en cours. Merci de patienter", 3000);
    };
    function finalCallback(data) {
        showToastGeneric("Mise en vente de produit", "La mise en vente pour un prix de vente de " + price + "MED a été correctement effectuée", 3000);
        $("#productAmount").val("");
        $("#faspin").toggle();
        loadMarketplaceHistoric();
        loadMedInfos();
    };

    callContractMethod(contractObject, contractMethod, contractArg, transactionHashCallback, errorCallback, finalCallback);

    $('#modal-sell').modal('hide');
    $('.modal-backdrop').hide();    
};

async function buyTokenProduct(tokId) {
    var contractObject = await getContractObject(marketplaceCtrAdd, marketplaceJson);
    var contractMethod = "buy";
    var contractArg = [tokId];

    function errorCallback(error) {
        console.log(error);
        showToastGeneric("Achat de produit", "Une erreur est survenue lors de l'achat", 3000);
    };
    function transactionHashCallback(transactionHash) {
        showToastGeneric("Achat de produit", "L'achat est en cours. Merci de patienter", 3000);
    };
    function finalCallback(data) {
        showToastGeneric("Achat de produit", "L'achat du token " + tokId + "a été correctement effectuée", 3000);
        loadMarketplaceHistoric();
        loadMedInfos();
    };

    callContractMethod(contractObject, contractMethod, contractArg, transactionHashCallback, errorCallback, finalCallback);
};

window.addEventListener('load', main);
