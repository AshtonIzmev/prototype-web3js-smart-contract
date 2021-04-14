async function main() {
  let web3 = await getWeb3();
  let netTyp = await web3.eth.net.getNetworkType();
  let id = await web3.eth.net.getId();
  web3.eth.getCoinbase(function (err, account) {
      if (err === null) {
          if ((netTyp == "private") && (id == WEB3ID)) {
              $(".container").show();
              $("#network-problem").hide();
          }
          setBalance(web3, account);
      }
  });
};

function setBalance(w3, account) {
  w3.eth.getBalance(account, function (err, balance) {
    $("#solde").html((w3.utils.fromWei(balance, 'ether')).substring(0, 5) + " ETH");
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

function getEther() {
  getWeb3().then((web3) => {
      web3.eth.getCoinbase(function (err, account) {
          if (err === null) {
              $.getJSON('https://curieux.ma/getether/' + account)
              .done(function (data) {
                  $("#event").html("<p> 1 Ether reçu. Récepissé de la transaction : " + data.response.split('\n')[0] + ". Il sera visible dans une dizaine de secondes")
                  $('.toast-header').text("Envoi d'Ether");
                  $('.toast-body').text("Envoi d'ether à l'adresse réussi");
                  $('.toast').toast({ 'delay': 2000 }).toast('show');
                  setTimeout(refreshEther, 5000);
                  setTimeout(refreshEther, 10000);
                  setTimeout(refreshEther, 15000);
                  setTimeout(refreshEther, 20000);
              })
              .fail(function (jqxhr, textStatus, error) {
                  $('.toast-header').text("Envoi d'Ether");
                  if (jqxhr.responseJSON) {
                      if (jqxhr.responseJSON.data) {
                          $('.toast-body').text(jqxhr.responseJSON.data.stack.split('t.')[0]);
                      }
                      if (jqxhr.responseJSON.response) {
                          $('.toast-body').text(jqxhr.responseJSON.response);
                      }
                  } else {
                      $('.toast-body').text("Une erreur est survenue");
                  }
                  $('.toast').toast({ 'delay': 10000 }).toast('show');
                  console.log("error");
              })
          }
      });
  });
}

window.addEventListener('load', main);