function setBalance(w3, account) {
    w3.eth.getBalance(account, function (err, balance) {
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