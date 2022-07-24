//recuperer le localstorage


// creation array (parse) et se premunit du null en créant le tableau vide prêt à etre rempli
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}
//reconvertit en chaine de caractères le cart
function setCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));

}

function totalPriceQuantity() {
    let price = 0;
    let totalQuantity = 0
    for (let c of canapes) {
        price += c.price * c.quantity;
        totalQuantity += c.quantity
    }


    const tPrice = document.getElementById('totalPrice')
    const tQuantity = document.getElementById('totalQuantity')
    tPrice.innerHTML = price
    tQuantity.innerHTML = totalQuantity
}

//recuperation localstorage
let cart = getCart()
    //creation tab global// 
let canapes = []


//Alimentation du array à partir localstorage et API if cart.length==0 then display("panier vide")
cart.forEach((product) => {
    const cartItems = document.getElementById("cart__items");
    const urlProduit = `http://localhost:3000/api/products/${product.id}`;

    // recuperation des elements et injection html avec createElement et appendChild
    fetch(urlProduit)
        .then((reponse) => {
            return reponse.json()
        })
        .then((data) => {
            const canape = { "id": product.id, "color": product.color, "quantity": product.quantity, "price": data.price, "name": data.name, "img": data.imageUrl, "alt": data.altTxt }
            console.log(canape)
            canapes.push(canape)
            let article = document.createElement("article")
            article.setAttribute("class", "cart__item")
            article.setAttribute("data-id", canape.id)
            article.setAttribute("data-color", canape.color)

            let divCartItemImg = document.createElement("div")
            divCartItemImg.setAttribute("class", "cart__item__img")


            let img = document.createElement("img")
            img.setAttribute("src", canape.img)
            img.setAttribute("alt", canape.alt)
            divCartItemImg.appendChild(img)
            article.appendChild(divCartItemImg)


            let divCartItemContent = document.createElement("div")
            divCartItemContent.setAttribute("class", "cart__item__content")
            article.appendChild(divCartItemContent)

            let divCartItemContentDescription = document.createElement("div")
            divCartItemContentDescription.setAttribute("class", "cart__item__content__description")
            divCartItemContent.appendChild(divCartItemContentDescription)


            let h2 = document.createElement("h2")
            h2.appendChild(document.createTextNode(canape.name))
            divCartItemContentDescription.appendChild(h2)


            let p = document.createElement("p")
            p.appendChild(document.createTextNode(canape.color))
            divCartItemContentDescription.appendChild(p)

            let pPrice = document.createElement("p")
            pPrice.appendChild(document.createTextNode(canape.price))
            divCartItemContentDescription.appendChild(pPrice)



            let divCartItemContentSettings = document.createElement("div")
            divCartItemContentSettings.setAttribute("class", "cart__item__content__settings")

            let divCartItemContentSettingsQuantity = document.createElement("div")
            divCartItemContentSettingsQuantity.setAttribute("class", "cart__item__content__settings__quantity")
            let pquant = document.createElement("p")
            let inputValue = document.createElement("input")
            inputValue.setAttribute("value", canape.quantity)
            inputValue.setAttribute("type", "number")
            inputValue.setAttribute("class", "itemQuantity")
            inputValue.setAttribute("name", "itemQuantity")
            inputValue.setAttribute("min", "1")
            inputValue.setAttribute("max", "100")


            pquant.appendChild(document.createTextNode("Qté : "))

            divCartItemContentSettings.appendChild(divCartItemContentSettingsQuantity)
            divCartItemContentSettingsQuantity.appendChild(pquant)
            divCartItemContentSettingsQuantity.appendChild(inputValue)
            divCartItemContent.appendChild(divCartItemContentSettings)





            let divCartItemContentSettingsDelete = document.createElement("div")
            divCartItemContentSettingsDelete.setAttribute("class", "cart__item__content__settings__delete")
            let pDel = document.createElement("p")
            pDel.setAttribute("class", "deleteItem")
            pDel.appendChild(document.createTextNode("Supprimer"))

            divCartItemContentSettingsDelete.appendChild(pDel)
            divCartItemContentSettings.appendChild(divCartItemContentSettingsDelete)

            cartItems.appendChild(article)








            // modifification quantité après écoute évennement
            inputValue.addEventListener("change", (event) => {

                const newQuantity = parseInt(event.target.value)
                const indexPosition = canapes.findIndex((item) => {
                        return item.color === canape.color && item.id === canape.id
                    })
                    //si different de null verifie les conditions
                if (indexPosition !== -1) {
                    if (newQuantity < 1 || newQuantity > 100 || Number.isNaN(newQuantity)) {
                        event.target.value = canapes[indexPosition].quantity
                        alert("quantité invalide")
                        return
                    }
                    // si conditions requises remplacement dans le array puis reactualistion page
                    canapes[indexPosition].quantity = parseInt(event.target.value)
                }
                const newCart = canapes.map((canape) => {
                    return { "id": canape.id, "color": canape.color, "quantity": canape.quantity }
                })
                setCart(newCart)
                totalPriceQuantity()

            })



            // supprimer un item remplacement dans le tableau( splice) puis reactualistion page

            pDel.addEventListener("click", (event) => {
                const indexPosition = canapes.findIndex((del) => {
                    return del.color === canape.color && del.id === canape.id
                })
                canapes.splice(indexPosition, 1)
                const newCart = canapes.map((canape) => {
                    return { "id": canape.id, "color": canape.color, "quantity": canape.quantity }
                })
                setCart(newCart)
                totalPriceQuantity()
                cartItems.removeChild(article)
            })


            //affichage html du  prix total 
            totalPriceQuantity()
        })
})




// Récupérer les infos de l'utilisateur

// check firstname minuscules, majuscules, les espaces et les tirets, chaine entre 3 et 20 caractères
function testFirstName(inputText) {
    let regexFirstName = /^[a-zA-Z\s-]{3,20}$/;
    return regexFirstName.test(inputText)
}


// check lastname minuscules, majuscules, les espaces et les tirets, chaine entre 3 et 20 caractères
function testLastName(inputText) {
    let regexLastName = /^[a-zA-Z\s-]{3,20}$/;
    return regexLastName.test(inputText)
}


//check adresse  minuscules, majuscules, les chiffres, les espaces, les tirets et les apostrophes
function testAddress(inputText) {
    let regexAddress = /^[a-z'A-Z'0-9-\s]+$/;
    return regexAddress.test(inputText)
}


//check ville les minuscules, majuscules, les chiffres, les espaces, les tirets
function testCity(inputText) {
    let regexCity = /^[a-zA-Z0-9-\s]+$/;
    return regexCity.test(inputText)
}



// email check /minuscules, majuscules, les espaces et quelquelques caractères speciaux
function validateEmail(inputText) {
    let regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return regexEmail.test(inputText)
}


// réponses regex et check formulaire 
const form = document.querySelector(".cart__order__form")

function setlistenerForm() {


    form.firstName.addEventListener("change", function() {
        if (testFirstName(form.firstName.value)) {
            let firstNameErrorMsg = document.getElementById("firstNameErrorMsg")
            firstNameErrorMsg.innerText = ""
        } else {
            let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
            firstNameErrorMsg.innerText = "vérifiez votre prénom";
            return;
        }
    })


    form.lastName.addEventListener("change", function() {
        if (testLastName(form.lastName.value)) {
            let lastNameErrorMsg = document.getElementById("lastNameErrorMsg")
            lastNameErrorMsg.innerText = ""
        } else {
            let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
            lastNameErrorMsg.innerText = "vérifiez votre nom";
            return;
        }
    })

    form.address.addEventListener("change", function() {
        if (testAddress(form.address.value)) {
            let addressErrorMsg = document.getElementById("addressErrorMsg")
            addressErrorMsg.innerText = ""
        } else {
            let addressErrorMsg = document.getElementById("addressErrorMsg");
            addressErrorMsg.innerText = "vérifiez votre adresse";
            return;
        }
    })
    form.city.addEventListener("change", function() {
        if (testCity(form.city.value)) {
            let cityErrorMsg = document.getElementById("cityErrorMsg");
            cityErrorMsg.innerText = "";
        } else {
            let cityErrorMsg = document.getElementById("cityErrorMsg");
            cityErrorMsg.innerText = "vérifiez votre ville";
            return;
        }
    })

    form.email.addEventListener("change", function() {
        if (validateEmail(form.email.value)) {
            let emailErrorMsg = document.getElementById("emailErrorMsg")
            emailErrorMsg.innerText = ""
        } else {
            let emailErrorMsg = document.getElementById("emailErrorMsg");
            emailErrorMsg.innerText = "vérifiez votre email";
            return;
        }
    })
}

setlistenerForm()





// écoute de l'evenement submit order

form.addEventListener("submit", function(e) {
    e.preventDefault();


    // creation "contact" données utilisateur
    const contact = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        address: form.address.value,
        city: form.city.value,
        email: form.email.value,
    }

    // verification du contenu formulaire 

    if (testFirstName(form.firstName.value) &&
        testLastName(form.lastName.value) &&
        testAddress(form.address.value) &&
        testCity(form.city.value) &&
        validateEmail(form.email.value)) {

        order(contact)

    } else {
        alert("Merci de vérifier le contenu de votre formulaire");
        return;
    }

})

function order(contact) {
    //creation de l'array des produits de la commande
    let products = [];
    for (let p of canapes) {
        products.push(p.id);
    }


    // élément paquet qui contient  "contact" et produits commandés
    let pack = {
        contact: contact,
        products: products
    }



    const options = {
        method: "POST",
        body: JSON.stringify(pack),
        headers: {
            "Content-Type": "application/json",
        },
    };

    // On appelle l'api
    fetch("http://localhost:3000/api/products/order", options)

    .then((response) => {
            return response.json();
        })
        // Envoie des données à la page confirmation
        .then((data) => {
            window.location.href = `confirmation.html?orderId=${data.orderId}`;
        })

    // traitement erreur
    .catch((error) => {
        alert(error);
    })
}