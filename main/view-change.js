//recarga la pagina al hacer click en inicio
const restart = document.querySelector('#inicio')
restart.addEventListener('click', function(eve){
    
    setTimeout(function wait(){
        window.location.reload()
    }, 200)
})

//variables para mostrar el login
const btnLoginView =  document.querySelector('#btn-login')
const LoginView = document.querySelector('#form-login')

btnLoginView.addEventListener('click', function(eve){
    eve.preventDefault()
    LoginView.classList.toggle('mostrar-login')

})



//variables para mostrar el carrito
const btnCarritoView =  document.querySelector('#carrito-btn-view')
const CarritoView = document.querySelector('#carrito')



btnCarritoView.addEventListener('click', function(eve){
    eve.preventDefault()
    CarritoView.classList.toggle('mostrar-carrito')
})



//variables para agregar al carrito
const addCarritoView =  document.querySelectorAll('.card-food > .agregar-carrito')
let carritoView = Array.from(addCarritoView)



// funcion para mostrar el agregar al carrito de la comida y bebida
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


