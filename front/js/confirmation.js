// fonction recuperation ID via l'Url
function confirmation() {

    const orderId = new URLSearchParams(window.location.search).get("orderId")
    document.getElementById("orderId").innerHTML += orderId;
    // fonction vider le local storage
    localStorage.clear()
}
confirmation()