//1) fetch dans api     
        //recuperer les infos dans une vaiable "products"
     //   2) parcourir les products et créer elements html et ensuite les envoyer dans la page html
fetch("http://localhost:3000/api/products", {
  "method": "GET",
  "headers": {}
})
.then(response => {
  console.log(response);
})
.catch(err => {
  console.error(err);
});