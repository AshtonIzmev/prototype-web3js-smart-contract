/////////////////////////
// LOCAL STORAGE
/////////////////////////

function addAssociationToStore(assoc) { addToStore(assoc, "association"); };
function addCooptationToStore(assoc) { addToStore(assoc, "cooptation"); };
function addBanToStore(assoc) { addToStore(assoc, "ban"); };
function addDissolutionToStore(assoc) { addToStore(assoc, "dissolution"); };
function addOwnerChangeToStore(assoc) { addToStore(assoc, "ownerchange"); };
function addReferendumToStore(assoc) { addToStore(assoc, "referendum"); };

function loadHistoric() {
    var eventList = JSON.parse(getStore())['r'];
    $("#event-histo").html("");
    eventList.forEach(function (a) {
        var tuple = a.split("|");
        if (!tuple[2].startsWith("r_")) {
            $("#event-histo").append(
                "<li>"
                + tuple[2].charAt(0).toUpperCase() + tuple[2].slice(1)
                + " <a title='Charger "
                + tuple[2]
                + "' href='#reche' onclick='"
                + (tuple[2] == "association" ? "seekHistoricAssociation" : "seekHistoricAdminContract")
                + "(\"" + tuple[0] + "\")'>"
                + tuple[0] + "</a> <span class='creaevent'>créée</span> à "
                + tuple[1] 
                + eraseBtn1
                + "'" + tuple[0] + "'" 
                + eraseBtn2
                + "</li>"
            );
        } else {
            $("#event-histo").append(
                "<li>"
                + tuple[2].charAt(2).toUpperCase() + tuple[2].slice(3)
                + " <a title='Charger "
                + tuple[2]
                + "' href='#reche' onclick='"
                + (tuple[2] == "r_association" ? "seekHistoricAssociation" : "seekHistoricAdminContract")
                + "(\"" + tuple[0] + "\")'>"
                + tuple[0] + "</a> <span class='rechevent'>recherchée</span> à "
                + tuple[1] 
                + eraseBtn1
                + "'" + tuple[0] + "'" 
                + eraseBtn2
                + "</li>"
            );
        }
    });
};