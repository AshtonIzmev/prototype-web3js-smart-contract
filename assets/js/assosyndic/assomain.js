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
    loadAssociationEvents();
};

window.addEventListener('load', main);