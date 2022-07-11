//recuperation url et id
const search = new URLSearchParams(window.location.search);
const id = search.get("id");

// recuperation api
fetch("http://localhost:3000/api/products/" + id)

//verification
.then((response) => {
        return response.json();
    })
    //creation d'une class pour canape
    .then((data) => {
        class Kanap {
            constructor(id, colors, name, price, description, imageUrl, altText) {
                    this.id = data._id;
                    this.colors = data.colors;
                    this.name = data.name;
                    this.price = data.price;
                    this.description = data.description;
                    this.imageUrl = data.imageUrl;
                    this.altText = data.altText;
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
        // On instancie la classe et on l'affiche
        const kanapElements = new Kanap();
        kanapElements.kanapProduct();

    })
    // on ecoute evenement avec  addEventL

const addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", () => {
    console.log("ecoute")

    // recupere produits  couleur et quantité (tab localStorage)
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let color = document.getElementById("colors").value;
    if (!color) {
        alert("choisissez une couleur")
        return
    }

    let quantity = parseInt(document.getElementById("quantity").value);
    if (quantity === 0) {
        alert("quantité invalide")
        return
    }


    // regroupe dans l'objet les informations produit
    let product = { color, quantity, id }


    // alimentation du tableau
    const cartIndex = cart.findIndex((kanap) => {
        return (product.id == kanap.id && product.color == kanap.color)
    })
    if (cartIndex == -1) cart.push(product);
    else cart[cartIndex].quantity += product.quantity

    console.log(cart)


    localStorage.setItem("cart", JSON.stringify(cart));
})