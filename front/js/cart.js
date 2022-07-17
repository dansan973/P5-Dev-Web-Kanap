//recuperer le localstorage


// creation tab et du panier
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function setCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));

}

function totalPrice() {
    let price = 0;
    let totalQuantity = 0
    for (let c of canapes) {
        price += c.price * c.quantity;
        totalQuantity += c.quantity
    }
    console.log("totalprice")

    const tPrice = document.getElementById('totalPrice')
    const tQuantity = document.getElementById('totalQuantity')
    tPrice.innerHTML = price
    tQuantity.innerHTML = totalQuantity
}

//recuperation localstorage
let cart = getCart()
    //creation tab global
let canapes = []


//Alimentation du tableau à partir localstorage ezt API
cart.forEach((product) => {
    const cartItems = document.getElementById("cart__items");
    const urlProduit = ` http://localhost:3000/api/products/${product.id}`;

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








            // modifification quantité avec addEventListener("change",fonction)
            //remplacement dans le tableau( splice) puis reactualistion page

            inputValue.addEventListener("change", (event) => {
                const indexPosition = canapes.findIndex((item) => {
                    return item.color === canape.color && item.id === canape.id
                })
                if (indexPosition === -1)
                    return

                canapes[indexPosition].quantity = parseInt(event.target.value)


                console.log(event.target.value)

                const newCart = canapes.map((canape) => {
                    return { "id": canape.id, "color": canape.color, "quantity": canape.quantity }

                })
                setCart(newCart)
                totalPrice()

            })



            // supprimer un item avec(elementClosest())
            //remplacement dans le tableau( splice) puis reactualistion page



            pDel.addEventListener("click", (event) => {
                const indexPosition = canapes.findIndex((del) => {
                        return del.color === canape.color && del.id === canape.id
                    })
                    //remove 
                canapes.splice(indexPosition, 1)
                const newCart = canapes.map((canape) => {
                        return { "id": canape.id, "color": canape.color, "quantity": canape.quantity }

                    })
                    //local
                setCart(newCart)
                totalPrice()
                    //dom
                cartItems.removeChild(article)


            })


            //affichage html du  prix total 

            totalPrice()
        })
})




// Récupérer les infos de l'utilisateur

function testFirstName() {
    let firstName = document.getElementById("firstName");
    //minuscules, majuscules, les espaces et les tirets, chaine entre 3 et 20 caractères
    let regexFirstName = /^[a-zA-Z\s-]{3,20}$/;

    // addEnventListener 
    firstName.addEventListener("change", function() {
        // Si les conditions sont valides
        if (regexFirstName.test(firstName.value) && firstName.value.length >= 3 && firstName.value.length < 20 && firstName.value !== "") {
            letfirstNameErrorMsg = document.getElementById("firstNameErrorMsg");
            firstNameErrorMsg.innerText = "";
        }


        // sinon message d'erreur
        else {
            let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
            firstNameErrorMsg.innerText = "vérifier votre prénom";
            return;
        }
    })





    // lastname






    // email check /minuscules, majuscules, les espaces et quelquelques caractères speciaux


    /*      function ValidateEmail(inputText)
            {
    	    var mailformat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    	    if(inputText.value.match(mailformat))
    	    {
    		alert("This is not a valid email address");
    		return false;
    		}
    */
}