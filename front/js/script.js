//1) fetch dans api     
//recuperer les infos dans une vaiable "products"
//   2) parcourir les products et créer elements html et ensuite les envoyer dans la page html
let products = []
fetch("http://localhost:3000/api/products", {
    "method": "GET",
    "headers": {}
})

// recuperation  des "products"
.then(response => {
        return response.json()
    })
    .then(products => {

        listProductsInHtml(products)

    })
    // traitement erreurs
    .catch(err => console.error(err));

// retour des produits api
function listProductsInHtml(products) {
    let items = document.getElementById("items")

    //   injection des produits avec createElement puis appendChild
    for (let index in products) {
        let a = document.createElement("a")
        a.setAttribute("href", "./product.html?id=" + products[index]._id)

        let article = document.createElement("article")

        let img = document.createElement("img")
        img.setAttribute("src", products[index].imageUrl)
        img.setAttribute("alt", products[index].altTxt)

        let h3 = document.createElement("h3")
        h3.setAttribute("class", "productName")
        h3.innerHTML = "<strong>" + products[index].name + "</strong>"

        let p = document.createElement("p")
        p.setAttribute("class", "productDescription")
        p.innerHTML = products[index].description

        a.appendChild(article)
        article.appendChild(img)
        article.appendChild(h3)
        article.appendChild(p)

        items.appendChild(a)
    }
}