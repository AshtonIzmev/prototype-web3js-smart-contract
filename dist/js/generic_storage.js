/////////////////////////
// LOCAL STORAGE
/////////////////////////

var keyLocalStorage = "events_v0.3";
var emptyRes = '{"r":[]}';

function getStore() {
    return window.localStorage.getItem(keyLocalStorage) || emptyRes;
};

function addToStore(assoc, typeStore) {
    var current = window.localStorage.getItem(keyLocalStorage) || emptyRes;
    dicur = JSON.parse(current);
    dicur['r'].push((assoc + '|' + new Date().toISOString() + "|" + typeStore));
    window.localStorage.setItem(keyLocalStorage, JSON.stringify(dicur));
};

function addRechercheToStore(assoc, typeStore) {
    var current = window.localStorage.getItem(keyLocalStorage) || emptyRes;
    dicur = JSON.parse(current);
    var ind = dicur['r'].map(x => x.split("|")[0]).indexOf(assoc);
    if (ind > -1) {
        return;
    }
    dicur['r'].push((assoc + '|' + new Date().toISOString() + "|" + typeStore));
    window.localStorage.setItem(keyLocalStorage, JSON.stringify(dicur));
};

function removeFromStore(assoc) {
    var current = window.localStorage.getItem(keyLocalStorage) || emptyRes;
    dicur = JSON.parse(current);
    var ind = dicur['r'].map(x => x.split("|")[0]).indexOf(assoc);
    if (ind > -1) {
        dicur['r'].splice(ind, 1);
    }
    window.localStorage.setItem(keyLocalStorage, JSON.stringify(dicur));
};

function addSomethingToStore(assoc) { addToStore(assoc, "generic"); };