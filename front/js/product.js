//recuperation url et id
const search = new URLSearchParams(window.location.search);
const id = search.get("id");


class Kanap {
    constructor(id, colors, name, price, description, imageUrl, altText) {
            this.id = id;
            this.colors = colors;
            this.name = name;
            this.price = price;
            this.description = description;
            this.imageUrl = imageUrl;
            this.altText = altText;
        }
        //recup données et affichage sur la page
    kanapProduct() {
        document.getElementById("title").innerHTML += this.name;
        document.getElementById("price").innerHTML += this.price;
        document.getElementById("description").innerHTML += this.description;
        const img = document.createElement("img");
        img.setAttribute("src", this.imageUrl);
        img.setAttribute("alt", this.altTxt);
        document.getElementsByClassName("item__img")[0].appendChild(img);
        //application html <option value="blanc">blanc</option
        for (let c in this.colors) {
            document.getElementById("colors").innerHTML += `<option value="${this.colors[c]}">${this.colors[c]}</option>`;
        }

    }
}
// recuperation api
fetch("http://localhost:3000/api/products/" + id)

//verification
.then((response) => {
        return response.json();
    })
    //creation d'une class pour canape
    .then((data) => {

        // On instancie la classe et on l'affiche
        const kanapElements = new Kanap(data._id, data.colors, data.name, data.price, data.description, data.imageUrl, data.altText);
        kanapElements.kanapProduct();

    })
    // on ecoute evenement avec  addEventLS

const addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", () => {
    console.log("ecoute")

    // recupere produits  couleur et quantité (tab localStorage)
    //la fonction JSONparse convertit le string  enJs( ici un array) on se premunit d'un null(undifined)avec la création d'un tableau vide
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let color = document.getElementById("colors").value;
    if (!color) {
        alert("choisissez une couleur")
        return
    }

    let quantity = parseInt(document.getElementById("quantity").value);
    if (quantity <= 0 || quantity > 100 || Number.isNaN(quantity)) {
        alert("quantité invalide")

        return
    }



    // regroupe dans l'objet les informations produit
    let product = { color, quantity, id }


    // alimentation du tableau
    const cartIndex = cart.findIndex((kanap) => {
            return (product.id == kanap.id && product.color == kanap.color)
        })
        // ajout du produit (findindex -1 pas de produit correspondant) ou uniquement quantité
    if (cartIndex == -1) cart.push(product);

    else cart[cartIndex].quantity += product.quantity

    console.log(cart)

    //convertit en string(chaine de caractères)
    localStorage.setItem("cart", JSON.stringify(cart))
})