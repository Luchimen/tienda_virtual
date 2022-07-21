const items=document.getElementById('items')
const template=document.getElementById('template').content
const fragment=document.createDocumentFragment()
document.addEventListener('DOMContentLoaded',()=>{
    fetchData()
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
        console.log(productos)
        template.querySelector('h3').textContent=productos.name
        template.querySelector('p','.descripcion').textContent=productos.description
        template.querySelector('img').setAttribute("src",productos.image.thumbnail)
        template.querySelector('#precio').textContent=productos.price
        const clone=template.cloneNode(true)
        fragment.appendChild(clone)
        console.log(template)
    });
    items.appendChild(fragment)
}