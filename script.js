const items=document.getElementById('items')
const card=document.getElementsByClassName('card')
const aside=document.getElementById('aside')
const input=document.getElementById('input')
const template=document.getElementById('template').content
const templateaside=document.getElementById('template_aside').content
const fragment=document.createDocumentFragment()
let carrito={}
document.addEventListener('DOMContentLoaded',()=>{
    fetchData()
    //LocalStorage
    if(localStorage.getItem('carrito')){
        carrito=JSON.parse(localStorage.getItem('carrito'))
        mostrarcarrito()
    }
})
var element = document.getElementById("input");
element.addEventListener("keypress", function(event) {
	 if (event.key === "Enter") {
 		//alert(event.key  + " " + event.which);
 		event.preventDefault();
     }
});

document.addEventListener("keyup",e=>{
    buscar(e)
})

const buscar=e=>{
    if(e.target.matches("#input")){
        document.querySelectorAll(".card").forEach(elemento=> {
            elemento.textContent.toLowerCase().includes(e.target.value.toLowerCase())
            ? elemento.classList.remove("filtro")
            :elemento.classList.add("filtro")
        })
    } 
}

items.addEventListener('click',e =>{
    agregarcarrito(e)
})
aside.addEventListener('click', e =>{
    btnevent(e)
})
const fetchData=async() =>{
    try{
        const res=await fetch('products.json')
        const data=await res.json()
        printcard(data)
        //console.log(data)
    }catch (error){
        console.log(error)
    }
}
const printcard=data=>{
    data.forEach(productos => {
        //console.log(productos)
        template.querySelector('h3').textContent=productos.name
        //template.querySelector('p','.descripcion').textContent=productos.description
        template.querySelector('img').setAttribute("src",productos.image.thumbnail)
        template.querySelector('#precio').textContent=productos.sale_price
        template.querySelector('button').dataset.id=productos.id
        const clone=template.cloneNode(true)
        fragment.appendChild(clone)
        //console.log(template)
    });
    items.appendChild(fragment)
}

const agregarcarrito = e => {
    if(e.target.classList.contains('btn')){
        enviarcarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const enviarcarrito =objeto =>{
    //console.log(objeto)
    const producto={
        id: objeto.querySelector('.btn').dataset.id,
        name:objeto.querySelector('h3').textContent,
        precio:objeto.querySelector('#precio').textContent,
        img:objeto.querySelector('img').src,
        cantidad:1
    }
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad=carrito[producto.id].cantidad+1
    }
    carrito[producto.id]={...producto}
    mostrarcarrito()
}
const mostrarcarrito = () =>{
    //console.log(carrito)
    aside.innerHTML='<h3>Carrito de compras</h3>'
    Object.values(carrito).forEach(producto =>{
        templateaside.querySelector('h3').textContent=producto.name
        templateaside.querySelector('img').src=producto.img
        templateaside.querySelector(".shop__paragraph").innerHTML= '<span>Precio Unitario: </span>'+ producto.precio
        templateaside.querySelector(".shop__btncounter").textContent= producto.cantidad
        templateaside.querySelector('#total').innerHTML= '<span>Total: </span>'+producto.cantidad * producto.precio
        templateaside.querySelector('#menor').dataset.id=producto.id
        templateaside.querySelector('#mayor').dataset.id=producto.id
        const clone=templateaside.cloneNode(true)
        fragment.appendChild(clone)
    })
    aside.appendChild(fragment)
    localStorage.setItem('carrito',JSON.stringify(carrito))
}

const btnevent=e=>{
    if(e.target.id=='mayor'){
        //console.log(carrito[e.target.dataset.id])
        carrito[e.target.dataset.id]
        const producto=carrito[e.target.dataset.id]
        //producto.cantidad++ // si funciona!
        producto.cantidad=carrito[e.target.dataset.id].cantidad+1
        carrito[e.target.dataset.id]={...producto}
        mostrarcarrito()
    }
    if(e.target.id=='menor'){
        const producto=carrito[e.target.dataset.id]
        //producto.cantidad-- // si funciona!
        producto.cantidad=carrito[e.target.dataset.id].cantidad-1
        if(producto.cantidad===0){
            delete carrito[e.target.dataset.id]
        }
        mostrarcarrito()
    }

    e.stopPropagation()
}