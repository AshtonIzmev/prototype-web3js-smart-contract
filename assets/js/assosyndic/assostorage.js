/////////////////////////
// LOCAL STORAGE
/////////////////////////

function addCooptationToStore(assoc) { addToStore(assoc, "cooptation"); };
function addBanToStore(assoc) { addToStore(assoc, "ban"); };
function addDissolutionToStore(assoc) { addToStore(assoc, "dissolution"); };
function addOwnerChangeToStore(assoc) { addToStore(assoc, "ownerchange"); };
function addReferendumToStore(assoc) { addToStore(assoc, "referendum"); };

async function loadAssociationEvents() {
    var contractObject = await getContractObject(masterCtrAdd, masterJsonPath);
    contractObject.getPastEvents("CreationEvent", { fromBlock: 0, toBlock: 'latest' }, function (error, eventResult) {
        if (error)
            console.log(error);
        else if (eventResult) {
            $("#event-assoc-histo").html("");
            eventResult.forEach(function (e) {
                let assoAdd = e.returnValues._association;
                let assoName = e.returnValues._name;
                let assoFounder = e.returnValues._founder;
                $("#event-assoc-histo").append(
                    `<p>${assoName} <span style="font-style: italic;">(founder ${assoFounder})</span>
                    <button href='#' onclick='onSeekAssoc("${assoAdd}")' type="button" class="btn-dark" style="padding:revert;">Charger l'association</button></p>`
                );
            });
        }
    });
}

function kindSwitch(k) {
    switch (k) {
        case "0":
          return "Bannissement" 
        case "1":
            return "Changement de président"
        case "2":
            return "Dissolution"
        case "3":
            return "Cooptation de membre"
        case "4":
            return "Referendum"  
        default:
            return "Erreur" 
    }
}

async function loadAdministrationEvents(assocAdd) {
    var contractObject = await getContractObject(assocAdd, assoJson);
    contractObject.getPastEvents("AdminEvent", { fromBlock: 0, toBlock: 'latest' }, function (error, eventResult) {
        if (error)
            console.log(error);
        else if (eventResult) {
            $("#event-admin-histo").html("");
            if (eventResult.length > 0) {
                $(".details-admin-hide").show();
            }
            eventResult.forEach(function (e) {
                let adminAdd = e.returnValues._event;
                let adminKind = kindSwitch(e.returnValues._kind);
                getContractValueWiArg(contractObject, "seenAdmins", adminAdd).then(function(seenAdmin) {
                    var acted = seenAdmin ? "Acté" : "En cours";
                    $("#event-admin-histo").append(
                        `<p>${adminKind} <button href='#' onclick='onSeekAdminContract("${adminAdd}", "${e.returnValues._kind}")' type="button" class="btn-dark" style="padding:revert;">Charger l'action</button> <span style="font-style: italic;">${acted}</span> </p>`
                    );
                });
            });
        }
    });
};