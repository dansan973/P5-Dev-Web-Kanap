//recuperer le localstorage


// creation tab et du panier
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function setCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));

}

let cart = getCart()

cart.forEach((product) => {
    const cartItems = document.getElementById("cart__items");
    const urlProduit = ` http://localhost:3000/api/products/${product.id}`;

    fetch(urlProduit)
        .then((reponse) => {
            return reponse.json()
        })
        .then((data) => {
            canape = { "id": product.id, "color": product.color, "quantity": product.quantity, "price": data.price, "name": data.name, "img": data.imageUrl, "alt": data.altText }
            console.log(canape)

            let article = document.createElement("article")

            let divCartItemImg = document.createElement("div")
            divCartItemImg.setAttribute("class", "cart__item__img")
            let img = document.createElement("img")
            img.setAttribute("src", canape.img)
            img.setAttribute("alt", canape.alt)
            divCartItemImg.appendChild(img)
            article.appendChild(divCartItemImg)

            let h2 = document.createElement("h2")
            h2.appendChild(document.createTextNode(canape.name))

            let p = document.createElement("p")
            p.appendChild(document.createTextNode(canape.color))


            let pPrice = document.createElement("p")
            pPrice.appendChild(document.createTextNode(canape.price))

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