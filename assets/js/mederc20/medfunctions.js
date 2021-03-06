function onCreateERC20Btn() {
    var treasureAdd = $("#paramctr1").text();
    var ratePct = $("#paramctr2").text();
    var umi = $("#paramctr3").text();
    var mintable = $("#paramctr4").text();
    var initial = $("#paramctr5").text();

    $("#smiley-deploy").show();

    function errorCallback(error) {
        console.log(error);
        $('.toast-header').text("Création d'un nouveau token MED");
        $('.toast-body').text("Une erreur est survenue lors de la création");
        $('.toast').toast({ 'delay': 3000 }).toast('show');
        $("#smiley-deploy-status").html("<p> Erreur lors de la création du contrat du token ERC20 Moroccan E-Dirham. Merci de réessayer </p>");
    };
    function transactionHashCallback(transactionHash) {
        $("#smiley-deploy-status").html("<p>La demande de création de Token a bien été reçue</p><p>Merci de patienter une dizaine de secondes</p> <div class='spinner-border' role='status'><span class='sr-only'>Loading...</span></div> ");
    };
    function finalCallback(contractInstance) {
        var d = new Date();
        var ds = d.toISOString().slice(11, 19);
        $("#smiley-deploy-status").html("")
        $('.toast-header').text("Création de token");
        $('.toast-body').text("Un contrat de token a bien été créé à l'adresse " + contractInstance.options.address);
        $('.toast').toast({ 'delay': 2000 }).toast('show');
        $("#token-address").append("<p> Token créée à l'adresse <span class='bold'>" + contractInstance.options.address + "</span> à " + ds + "</p>");
    };
    createContract(
        [treasureAdd, parseInt(ratePct), parseInt(umi), mintable == "true", parseInt(initial)], medJsonPath, 
        errorCallback, transactionHashCallback, finalCallback);
};

async function onTransferERC20Btn() {
    var benef = $("#trsfInputBenef").val();
    var amount = $("#trsfInputAmount").val();
    var lib = $("#trsfInputLib").val();

    var contractObject = await getContractObject(medCtrAdd, medJsonPath);
    var contractMethod = "transfer";
    var contractArg = [benef, parseInt(parseFloat(amount)*100)];
    
    function errorCallback (error) {
        console.log(error);
        $('.toast-header').text("Tentative de transfert");
        $('.toast-body').text("Une erreur est survenue lors du transfert");
        $('.toast').toast({ 'delay': 3000 }).toast('show');
    };
    function transactionHashCallback(transactionHash) {
        $('#fa3').toggle();
        $('.toast-header').text("Tentative de transfert");
        $('.toast-body').text("Votre transfert est en cours de traitement. Merci de patienter.");
        $('.toast').toast({ 'delay': 3000 }).toast('show');
    };
    function finalCallback(data) {
        $('#fa3').toggle();
        $('.toast-header').text("Transfert");
        $('.toast-body').text("Le transfert de " + amount + "MED a été correctement réalisé");
        $('.toast').toast({ 'delay': 3000 }).toast('show');
        addTransferToStore(benef + ";" + amount);
        addBenefToStore(benef + ";" + lib);
        $("#trsfInputBenef").val("");
        $("#trsfInputAmount").val("");
        $("#trsfInputLib").val("");
        loadSolde();
        loadHistoric();
        $('#modal-transfer').modal('hide');
        $('.modal-backdrop').hide();
    };

    callContractMethod(contractObject, contractMethod, contractArg, transactionHashCallback, errorCallback, finalCallback);
}

async function loadSolde() {
    var contractObject = await getContractObject(medCtrAdd, medJsonPath);
    let account = await getPrimaryAccount();
    let result = await getContractValueWiArg(contractObject, "balanceOf", account);
    $("#solde").text(result/100);
    $("#connect").hide();
    console.log("Solde à jour");
};

async function loadTaxDays() {
    var contractObject = await getContractObject(medCtrAdd, medJsonPath);
    let account = await getPrimaryAccount();
    let result = await getContractValueWiArg(contractObject, "elapsedTaxDaysOf", account);
    let daysElapsed = await getContractValueWoArg(contractObject, "daysElapsed");
    $("#tax-delay").text(daysElapsed - result);
    console.log("Tax days à jour");
};

async function loadUMI() {
    var contractObject = await getContractObject(medCtrAdd, medJsonPath);
    let account = await getPrimaryAccount();
    let result = await getContractValueWiArg(contractObject, "elapsedIncomeMonthOf", account);
    let monthsElapsed = await getContractValueWoArg(contractObject, "monthsElapsed");
    let umi = await getContractValueWoArg(contractObject, "universalMonthlyIncome");
    $("#income").text(umi * (monthsElapsed - result) / 100);
    console.log("UMI à jour");
};

async function loadTotalSupply() {
    var contractObject = await getContractObject(medCtrAdd, medJsonPath);
    let totalSupply = await getContractValueWoArg(contractObject, "totalSupply");
    let allowMint = await getContractValueWoArg(contractObject, "allowMint");
    $("#total-supply").text(totalSupply/100000000000 + "G");
    $("#mintable").text(allowMint ? "(Imprimable)" : "(Non imprimable)")
    console.log("Total supply à jour");
};

async function payTaxesGetUmi() {

    let account = await getPrimaryAccount();
    var contractObject = await getContractObject(medCtrAdd, medJsonPath);
    var contractMethod = "updateAccount";
    
    function errorCallback (error) {
        console.log(error);
        $('.toast-header').text("Passage à la caisse");
        $('.toast-body').text("Une erreur est survenue lors de la récupération du revenu universel et du paiement des taxes");
        $('.toast').toast({ 'delay': 5000 }).toast('show');
    };
    function transactionHashCallback(transactionHash) {
        $('#fa11').toggle();
        $('#fa12').toggle();
        $('#fa21').toggle();
        $('#fa22').toggle();
        $('.toast-header').text("Passage à la caisse");
        $('.toast-body').text("La transaction de récupération de revenu et de paiement de taxe a bien été reçue. Merci de patienter");
        $('.toast').toast({ 'delay': 5000 }).toast('show');
    };
    function finalCallback(data) {
        $('#fa11').toggle();
        $('#fa12').toggle();
        $('#fa21').toggle();
        $('#fa22').toggle();
        $('.toast-header').text("Passage à la caisse");
        $('.toast-body').text("Le revenu universel a été transféré sur votre compte. Les taxes ont été payées");
        $('.toast').toast({ 'delay': 5000 }).toast('show');
        loadSolde();
        loadTaxDays();
        loadUMI();
    };

    callContractMethod(contractObject, contractMethod, [account], transactionHashCallback, errorCallback, finalCallback);
}

async function addDay() {
    var contractObject = await getContractObject(medCtrAdd, medJsonPath);
    var contractMethod = "incrementDay";
    function finalCallback(data) { loadTaxDays(); };
    callContractMethod(contractObject, contractMethod, null, console.log, console.log, finalCallback);
}

async function addMonth() {
    var contractObject = await getContractObject(medCtrAdd, medJsonPath);
    var contractMethod = "incrementMonth";
    function finalCallback(data) { loadUMI(); };
    callContractMethod(contractObject, contractMethod, null, console.log, console.log, finalCallback);
}