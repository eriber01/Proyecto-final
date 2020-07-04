const addCarritoView =  document.querySelectorAll('.card-food > .agregar-carrito')
let carritoView = Array.from(addCarritoView)

MostrarAgregarCarrito()

function MostrarAgregarCarrito(){
    carritoView.forEach(function(view, index){

        view.addEventListener('mouseover', function(eve){
            view.classList.add('no')
        })
    
        view.addEventListener('mouseout', function(eve){
            view.classList.remove('no')
        })
    })
}
