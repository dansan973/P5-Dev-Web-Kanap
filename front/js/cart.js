//recuperer le localstorage


// creation tab
function getPanier() {
    return JSON.parse(localStorage.getItem("cart"));
}
let panier = getPanier()
console.log(panier)