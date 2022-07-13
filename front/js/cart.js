//recuperer le localstorage


// creation tab
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}