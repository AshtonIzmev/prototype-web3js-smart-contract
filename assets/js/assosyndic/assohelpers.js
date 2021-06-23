/////////////////////////
// HELPER
/////////////////////////

async function getAssocMembers(contractObject) {
    var result = []
    var memberHistoricCount = await getContractValueWoArg(contractObject, "getMemberHistoricCount");
    for (i = 0; i < memberHistoricCount; i++) {
        let historicMember = await getContractValueWiArg(contractObject, "membersHistoric", i);
        let isMember = await getContractValueWiArg(contractObject, "members", historicMember.addr);
        if (isMember) {
            result.push([historicMember.name, historicMember.addr])
        }
    }
    return result;
}

async function getReferendums(contractObject) {
    var result = []
    var referendumsCount = await getContractValueWoArg(contractObject, "getReferendumsCount");
    if (referendumsCount > 0) {
        for (i = 0; i < referendumsCount; i++) {
            let q = await getContractValueWiArg(contractObject, "referendums", i);
            result.push(q)
        }
    }
    return result;
}

function setAssociationAddress(address) {
    $("#association-address").text(address);
    $(".association-address").text(address);
}

function resetAssociationAddress() {
    $("#association-address").text("");
    $(".association-address").text("");
}

function getAssociationAddress() {
    return $("#association-address").text();
}

/////////////////////////
// SEEK ASSOCIATION
/////////////////////////

function getContractAdminJson() {
    var defaultCtrType = "AssociationAdministrationCooptation.json";
    return $("#admin-select").text() == "" ? defaultCtrType : dictContract[$("#admin-select").text()];
}

async function seekAssoc(address) {
    setAssociationAddress(address);
    let contractObject = await getContractObject(address, assoJson);
    let account = await getPrimaryAccount();
    if (!contractObject) { resetAssociationAddress(); return; }

    var ownerP = getContractValueWoArg(contractObject, "owner");
    var nameP = getContractValueWoArg(contractObject, "name");
    var isMemberP = getContractValueWiArg(contractObject, "members", account);
    var membersCountP = getContractValueWoArg(contractObject, "membersCount");

    ownerP.then(function (pdt) {
        toggleBlock("details");
        $("#details-assoc").show();
        $("#association-address").text(address);
        $(".association-address").text(address);
        $("#president").text(pdt);
        var ismyassoc = pdt.toLocaleLowerCase() != account.toLocaleLowerCase();
        $(".myassoc").toggle(ismyassoc);
        $(".seassoc").toggle(!ismyassoc);
    })

    nameP.then(function (name) {
        $(".association-name").html(escapeXml(name));
    });

    isMemberP.then(function (isMember) {
        $(".ismember").toggle(isMember);
        $(".notmember").toggle(!isMember);
    });

    membersCountP.then(function (nb) {
        $("#nbmembers").text(nb)
    });

    // HANDLE Member List
    $("#member-list").html("");
    var assocMembers = await getAssocMembers(contractObject);
    for (i = 0; i < assocMembers.length; i++) {
        let escapedName = escapeXml(assocMembers[i][0]);
        let memberAddress = assocMembers[i][1];
        $("#member-list").append(`<p><span class="bold"> ${escapedName} </span> </span> <button type="button" class="btn btn-danger" style="padding: 0;" onclick="onSpecificMemberBan('${memberAddress}');">Bannir</button> </p>`);
    }

    // HANDLE Referendum List
    var referendums = await getReferendums(contractObject);
    if (referendums.length > 0) {
        $("#referendum-list").html(`<p><span class='title'>Nombre de referendums votés</span> : ${referendums.length}</p>`);
        for (i = 0; i < referendums.length; i++) {
            $("#referendum-list").append("<p><span class='bold'>" + escapeXml(referendums[i]) + "</span></p>");
        }
    }

    loadAdministrationEvents(address);
    
};

/////////////////////////
// HANDLE ADMIN CONTRACT
/////////////////////////

async function handleSeekHistoricAdminContract(adminAddress) {
    $("#administration-address").text(adminAddress);
    $(".administration-address").text(adminAddress);
    let contractAdminObject = await getContractObject(adminAddress, rootContractJson + getContractAdminJson());
    let account = await getPrimaryAccount();
    if (!contractAdminObject) { $("#administration-address").text(""); return; }


    var adminActionTypeP = await getContractValueWoArg(contractAdminObject, "getAdminActionType");
    var proposedMemberP = await getContractValueWoArg(contractAdminObject, "proposedMember");
    var voteCountP = await getContractValueWoArg(contractAdminObject, "voteCount");


    toggleBlock("gerer");
    $("#details-admin").show();
    $("#details-admin-type").text(dictLib[adminActionTypeP]);


    $("#details-admin-member").text("");
    var detailLib = "";
    if (proposedMemberP != "0x0000000000000000000000000000000000000000" && adminActionTypeP != "4" && adminActionTypeP != 2) {
        detailLib += " concernant la personne " + proposedMemberP;
    }

    if (adminActionTypeP == "4") {
        getContractValueWoArg(contractAdminObject, "referendumQuestion").then(function (q) {
            $("#details-admin-member").text(detailLib + ". Question : " + q);
        }).catch(function (error) { console.log(error); return; });
    } else if (adminActionTypeP == "3") {
        getContractValueWoArg(contractAdminObject, "memberName").then(function (n) {
            $("#details-admin-member").text(detailLib + ". Peudonyme : " + n);
        }).catch(function (error) { console.log(error); return; });
    } else {
        $("#details-admin-member").text(detailLib);
    }

    $("#details-admin-vote").text(voteCountP);
    $("#details-admin-seuil").text("(seuil requis : " + dictSeuil[adminActionTypeP] + "%)");
    $("#admin-select").text(adminActionTypeP);

    var assocP = await getContractValueWoArg(contractAdminObject, "assoCtr");
    let contractAssocObject = await getContractObject(assocP, assoJson);
    var memberCountP = await getContractValueWoArg(contractAssocObject, "membersCount");

    $("#details-admin-membercount").text(" sur " + memberCountP + " membre(s) soit " + 100*voteCountP/memberCountP + "%");
    if (100*voteCountP >= dictSeuil[adminActionTypeP]*memberCountP) { 
        $("#seuil-enough").show();
    }

    var didVoteP = await getContractValueWiArg(contractAdminObject, "didVotes", account);
    $("#details-admin-didvote").text(didVoteP ? ". Vous avez déjà voté pour" : "");
    if (!didVoteP) {
        var canVoteP = await getContractValueWiArg(contractAssocObject, "members", account);
        if (canVoteP) {
            $("#can-vote").show();
        }
    }

    var assocMembers = await getAssocMembers(contractAssocObject);
    $("#vote-list").html("");
    for (i = 0; i < assocMembers.length; i++) {
        let escapedName = escapeXml(assocMembers[i][0]);
        let memberAddress = assocMembers[i][1];
        let hasVoted = await getContractValueWiArg(contractAdminObject, "didVotes", memberAddress);
        let hasVotedLib = (hasVoted ? ' => A VOTE OUI': ' => EN ATTENTE DE VOTE')
        $("#vote-list").append(`<p><span class="bold"> ${escapedName} </span> ${hasVotedLib}</p>`);
    }
    
}

function onVoteForAdminContract() {
    voteForAdminContract();
}

async function voteForAdminContract() {
    var adminAddress = $("#administration-address").text();
    var contractObject = await getContractObject(adminAddress, rootContractJson + getContractAdminJson());

    if (!contractObject) { $("#administration-address").text(""); return; }
    var contractMethod = "vote";
    var contractArg = null;
    
    function transactionHashCallback(transactionHash) {
        $("#vote-status").html("<p>La tentative de vote a bien été reçue</p> <p>Merci de patienter une dizaine de secondes</p> <div class='spinner-border' role='status'><span class='sr-only'>Loading...</span></div> ");
        console.log(transactionHash);
    }
    function errorCallback (error) {
        console.log(error);
        $('.toast-header').text("Tentative de vote");
        $('.toast-body').text("Une erreur est survenue lors du vote pour ce contrat");
        $('.toast').toast({ 'delay': 3000 }).toast('show');
        $("#vote-status").html("<p> Erreur lors du vote. Merci de réessayer </p>");
    }
    function finalCallback(data) {
        $("#vote-status").text("Votre vote a bien été comptabilisé");
        handleSeekHistoricAdminContract(adminAddress);
    }

    callContractMethod(contractObject, contractMethod, contractArg, transactionHashCallback, errorCallback, finalCallback);
};

function onActAdminContract() {
    actAdminContract();
}

async function actAdminContract() {
    var adminAddress = $("#association-address").text();
    var contractObject = await getContractObject(adminAddress, assoJson);
    if (!contractObject) { $("#administration-address").text(""); return; }
    var contractMethod = dictMethods[$("#admin-select").text()];
    var contractArg = $("#administration-address").text();
    
    function transactionHashCallback(transactionHash) {
        $("#act-status").html("<p>La tentative d'action sur l'association a bien été reçue</p> <p>Merci de patienter une dizaine de secondes</p> <div class='spinner-border' role='status'><span class='sr-only'>Loading...</span></div> ");
        console.log(transactionHash);
    }
    function errorCallback (error) {
        console.log(error);
        $('.toast-header').text("Tentative d'application du contrat");
        $('.toast-body').text("Une erreur est survenue lors de l'action pour ce contrat");
        $('.toast').toast({ 'delay': 3000 }).toast('show');
        $("#act-status").html("<p> Erreur lors de l'action. Merci de réessayer </p>");
    }
    function finalCallback(data) {
        $("#act-status").text("Action réussie. L'association a bien été impactée");
        handleSeekHistoricAdminContract(adminAddress);
    }

    callContractMethod(contractObject, contractMethod, [contractArg], transactionHashCallback, errorCallback, finalCallback);

}