
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
    $('.toast').toast({ 'delay': 2000 });
    checkKYC();
    loadKYCHistoric();
};

async function onSubmitKYC() {
    var kycName = $("#kycName").val();
    var kycId = $("#kycId").val();

    var contractObject = await getContractObject(kycCtrAdd, kycJsonPath);
    var contractMethod = "submitKYC";
    var contractArg = [kycName, kycId];

    function errorCallback(error) {
        console.log(error);
        $('.toast-header').text("Tentative de soumission d'identité");
        $('.toast-body').text("Une erreur est survenue lors de la soumission");
        $('.toast').toast({ 'delay': 3000 }).toast('show');
    };
    function transactionHashCallback(transactionHash) {
        $('.toast-header').text("Tentative de soumission d'identité");
        $('.toast-body').text("Votre soumission est en cours de traitement. Merci de patienter.");
        $('.toast').toast({ 'delay': 3000 }).toast('show');
    };
    function finalCallback(data) {
        $('.toast-header').text("Soumission");
        $('.toast-body').text("La vérification de l'identité de " + kycName + " a été correctement réalisé");
        $('.toast').toast({ 'delay': 3000 }).toast('show');
        loadKYCHistoric();
        checkKYC();
    };

    $('#modal-submit').modal('hide');
    $('.modal-backdrop').hide();

    callContractMethod(contractObject, contractMethod, contractArg, transactionHashCallback, errorCallback, finalCallback);
};

async function loadKYCHistoric() {
    var contractObject = await getContractObject(kycCtrAdd, kycJsonPath);
    contractObject.getPastEvents("IdentitySubmission", { fromBlock: 0, toBlock: 'latest' }, function (error, eventResult) {
        if (error)
            console.log(error);
        else if (eventResult) {
            $("#tbodyevents").html("");
            eventResult.forEach(function (e) {
                let kycName = e.returnValues._name;
                let kycAdd = e.returnValues._add;
                let kycCutAdd = kycAdd.substring(0, 10);
                $("#tbodyevents").append(
                    `<tr><td> ${kycName} </td><td><a href='#' onclick='copyAdd("${kycAdd}")'> ${kycCutAdd} ...</a></td><td></td>`
                );
            });
        }
    });
}

async function checkKYC() {
    let account = await getPrimaryAccount();
    var contractObject = await getContractObject(kycCtrAdd, kycJsonPath);
    let isVerified = await getContractValueWiArg(contractObject, "ecitizen", account);
    if (isVerified) {
        $("#kycstatus").text("a");
        $("#kycstatuscolor").removeClass("bg-danger");
        $("#kycstatuscolor").addClass("bg-success");
    }
};

function copyAdd(add) {
    $("#addcopied").html(
        `<p>Adresse copiée :</p><p>${add}</p>`
    );
    $('.toast-header').text("Addresse copiée");
    $('.toast-body').text("");
    $('.toast').toast({ 'delay': 2000 }).toast('show');
    copyStringToClipboard(add);
};

function copyStringToClipboard (str) {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
 };

window.addEventListener('load', main);