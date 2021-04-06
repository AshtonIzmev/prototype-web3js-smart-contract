async function main() {
    let web3 = await getWeb3();
    let netTyp = await web3.eth.net.getNetworkType();
    let id = await web3.eth.net.getId();
    web3.eth.getCoinbase(function (err, account) {
        if (err === null) {
            if ((netTyp == "private") && (id != WEB3ID)) {
                $(".container").show();
                $("#network-problem").hide();
            }
            setBalance(web3, account);
        }
    });
    loadHistoric();
};

function setBalance(w3, account) {
    w3.eth.getBalance(account, function (err, balance) {
        $("#solde").html((w3.utils.fromWei(balance, 'ether')).substring(0, 5) + "MED");
        $("#accountaddress").html(account.substring(0, 15) + "...");
        $("#completeaccountaddress").html(account);
    });
}
async function refreshEther() {
    getWeb3().then((web3) => {
        web3.eth.getCoinbase(function (err, account) {
            if (err === null) {
                setBalance(web3, account);
            }
        });
    });
};

function addTransferToStore(trsf) { addToStore(trsf, "transfert"); };

function loadHistoric() {
    var eventList = JSON.parse(getStore())['r'];
    $("#tbodyevents").html("");
    eventList.forEach(function (a) {
        var tuple = a.split("|");
        if (tuple[2] == "transfert") {
            var benef_amount = tuple[0].split(';');
            $("#tbodyevents").append(
                "<tr><td class='ht'>" + benef_amount[0].substring(0, 10) + "..." +
                "</td><td>" + benef_amount[1] + "</td><td>" + tuple[1] + "</td></tr>"
            );
        }
    });
};

function transfer() {
    var benef = $("#trsfInputBenef").val();
    var amount = $("#trsfInputAmount").val();
    addTransferToStore(benef + ";" + amount);
    alert(benef + amount);
    loadHistoric();
}

function deployMED() {
    var treasureAdd = $("#paramctr1").text();
    var ratePct = $("#paramctr2").text();
    var umi = $("#paramctr3").text();
    alert(treasureAdd + ratePct + umi);
}

window.addEventListener('load', main);

// web3.eth.sendTransaction({from:"0x981093C7A5AA41b6b5f754c27b3a62adBB34Dd7a", to:"0x132f15ff1af2c9741d10e12ddc141574eecadd25", value:web3.utils.toWei("1", "ether")});
