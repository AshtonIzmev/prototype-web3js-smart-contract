var tokenCtrAdd = "0x92Ed9a464e2A8a1e79A34056A854A75839176430";

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
        [treasureAdd, parseInt(ratePct), parseInt(umi), mintable == "true", parseInt(initial)], 
        '/mederc20/contracts/MED.json', 
        errorCallback, transactionHashCallback, finalCallback);
};

async function onTransferERC20Btn() {
    var benef = $("#trsfInputBenef").val();
    var amount = $("#trsfInputAmount").val();
    var lib = $("#trsfInputLib").val();

    var contractObject = await getContractObject(tokenCtrAdd, '/mederc20/contracts/MED.json');
    var contractMethod = "transfer";
    var contractArg = [benef, parseInt(amount)];
    
    function errorCallback (error) {
        console.log(error);
        $('.toast-header').text("Tentative de transfert");
        $('.toast-body').text("Une erreur est survenue lors du transfert");
        $('.toast').toast({ 'delay': 3000 }).toast('show');
    }
    function finalCallback(data) {
        $('.toast-header').text("Transfert");
        $('.toast-body').text("Le transfert de " + amount + "MED a été correctement réalisé");
        $('.toast').toast({ 'delay': 3000 }).toast('show');
        addTransferToStore(benef + ";" + amount);
        addBenefToStore(benef + ";" + lib);
        loadSolde();
        loadHistoric();
    }

    callContractMethod(contractObject, contractMethod, contractArg, console.log, errorCallback, finalCallback);
}

async function loadSolde() {
    var contractObject = await getContractObject(tokenCtrAdd, '/mederc20/contracts/MED.json');
    let account = await getPrimaryAccount();
    let result = await getContractValueWiArg(contractObject, "balanceOf", account);
    $("#solde").text(result);
    console.log("Solde à jour");
};

async function loadTaxDays() {
    var contractObject = await getContractObject(tokenCtrAdd, '/mederc20/contracts/MED.json');
    let account = await getPrimaryAccount();
    let result = await getContractValueWiArg(contractObject, "elapsedTaxDaysOf", account);
    let daysElapsed = await getContractValueWoArg(contractObject, "daysElapsed");
    $("#tax-delay").text(daysElapsed - result);
    console.log("Tax days à jour");
};

async function loadUMI() {
    var contractObject = await getContractObject(tokenCtrAdd, '/mederc20/contracts/MED.json');
    let account = await getPrimaryAccount();
    let result = await getContractValueWiArg(contractObject, "elapsedIncomeMonthOf", account);
    let monthsElapsed = await getContractValueWoArg(contractObject, "monthsElapsed");
    let umi = await getContractValueWoArg(contractObject, "universalMonthlyIncome");
    $("#income").text(umi * (monthsElapsed - result));
    console.log("UMI à jour");
};

async function loadTotalSupply() {
    var contractObject = await getContractObject(tokenCtrAdd, '/mederc20/contracts/MED.json');
    let totalSupply = await getContractValueWoArg(contractObject, "totalSupply");
    let allowMint = await getContractValueWoArg(contractObject, "allowMint");
    $("#total-supply").text(totalSupply/1000000000 + "G");
    $("#mintable").text(allowMint ? "(Imprimable)" : "(Non imprimable)")
    console.log("Total supply à jour");
};

async function payTaxesGetUmi() {

    let account = await getPrimaryAccount();
    var contractObject = await getContractObject(tokenCtrAdd, '/mederc20/contracts/MED.json');
    var contractMethod = "updateAccount";
    
    function errorCallback (error) {
        console.log(error);
        $('.toast-header').text("Passage à la caisse");
        $('.toast-body').text("Récupérer son revenu universel et payer ses taxes");
        $('.toast').toast({ 'delay': 5000 }).toast('show');
    }
    function finalCallback(data) {
        $('.toast-header').text("Passage à la caisse");
        $('.toast-body').text("Le revenu universel a été transféré sur votre compte. Les taxes ont été payées");
        $('.toast').toast({ 'delay': 5000 }).toast('show');
        loadSolde();
        loadTaxDays();
        loadUMI();
    }

    callContractMethod(contractObject, contractMethod, [account], console.log, errorCallback, finalCallback);
}

async function addDay() {
    var contractObject = await getContractObject(tokenCtrAdd, '/mederc20/contracts/MED.json');
    var contractMethod = "incrementDay";
    function finalCallback(data) { loadTaxDays(); };
    callContractMethod(contractObject, contractMethod, null, console.log, console.log, finalCallback);
}

async function addMonth() {
    var contractObject = await getContractObject(tokenCtrAdd, '/mederc20/contracts/MED.json');
    var contractMethod = "incrementMonth";
    function finalCallback(data) { loadUMI(); };
    callContractMethod(contractObject, contractMethod, null, console.log, console.log, finalCallback);
}