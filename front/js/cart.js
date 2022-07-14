//recuperer le localstorage


// creation tab et du panier
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function setCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));

}
//recuperation localstorage
let cart = getCart()
    //Alimentation du tableau 
cart.forEach((product) => {
    const cartItems = document.getElementById("cart__items");
    const urlProduit = ` http://localhost:3000/api/products/${product.id}`;

    // recuperation des elements et injection html avec createElement
    fetch(urlProduit)
        .then((reponse) => {
            return reponse.json()
        })
        .then((data) => {
            canape = { "id": product.id, "color": product.color, "quantity": product.quantity, "price": data.price, "name": data.name, "img": data.imageUrl, "alt": data.altTxt }
            console.log(canape)

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



            /**!--  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
        <div class="cart__item__img">
        <img src="../images/product01.jpg" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>Nom du produit</h2>
            <p>Vert</p>
            <p>42,00 €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article> -->
      */

        })
})