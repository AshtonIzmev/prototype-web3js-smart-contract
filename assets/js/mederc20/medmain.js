async function main() {
    let web3 = await getWeb3();
    let netTyp = await web3.eth.net.getNetworkType();
    let id = await web3.eth.net.getId();
    web3.eth.getCoinbase(function (err, account) {
        if (err === null) {
            if ((netTyp == "private") && (id == WEB3ID)) {
                $(".connexion").hide();
                setAccount(web3, account);
            }
        }
    });
    loadHistoric();
    loadDetails();
};

function addTransferToStore(trsf) { addToStore(trsf, medTransfertStorageKey); };
function addBenefToStore(trsf) { addRechercheToStore(trsf, medbeneficiaireStorageKey); };

function loadHistoric() {
    var eventList = JSON.parse(getStore())['r'];
    $("#tbodyevents1").html("");
    $("#tbodyevents2").html("");
    eventList.forEach(function (a) {
        var tuple = a.split("|");
        if (tuple[2] == medTransfertStorageKey) {
            var benef_amount = tuple[0].split(';');
            $("#tbodyevents1").append(
                "<tr><td class='ht'>" + benef_amount[0].substring(0, 10) + "..." +
                "</td><td>" + benef_amount[1] + "</td><td>" + tuple[1] + "</td></tr>"
            );
        }
        if (tuple[2] == medbeneficiaireStorageKey) {
            var benef_lib = tuple[0].split(';');
            $("#tbodyevents2").append(
                "<tr><td class='ht'><a href='#' onclick='preload(\"" + benef_lib[0] +"\", \"" + benef_lib[1] + "\")'>" + benef_lib[0].substring(0, 12) + "...</a>" +
                "</td><td>" + benef_lib[1] + "</td>"
            );
        }
    });
};

function preload(benef, lib) {
    $("#trsfInputBenef").val(benef);
    $("#trsfInputLib").val(lib);
}

function loadDetails() {
    loadSolde();
    loadTaxDays();
    loadUMI();
    loadTotalSupply();
};

function updateAccount() {
    payTaxesGetUmi();
}

function plusdinfos() {
    $('.toast-header').text("Informations");
    $('.toast-body').text("La quantité totale de crypto-token disponible dans l'ensemble des wallets. Celle-ci peut être fixe ou modulable si le contract est ouvert à la création et destruction monétaire.");
    $('.toast').toast({ 'delay': 10000 }).toast('show');
}

function showBkam() {
    $("#bkam").toggle();
}

window.addEventListener('load', main);
