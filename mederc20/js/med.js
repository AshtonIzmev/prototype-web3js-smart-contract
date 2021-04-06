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
};

function setBalance(w3, account) {
    w3.eth.getBalance(account, function (err, balance) {
        $("#solde").html((w3.utils.fromWei(balance, 'ether')).substring(0, 5) + "ETH");
        $("#accountaddress").html(account.substring(0, 15)+"...");
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




window.addEventListener('load', main);