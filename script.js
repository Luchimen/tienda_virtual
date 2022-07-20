import products from "./products.json" assert { type: "json" };

let productosTienda = products;

productosTienda.map((product) => {
  const imgSrc = product.image.original;
  let img = document.createElement("img");
  img.src = imgSrc;
  const cardImagen = `<section class="card">
  <img src=${imgSrc} alt="Imagen de prueba" />
  <h3>Nombre de producto</h3>
  <p>Descripcion</p>
  <p>Precio</p>
</section>`;
  const div = document.createElement("div");
  div.innerHTML = cardImagen;
  document.querySelector("gridImages").append(div.firstElementChild);
});
