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

    console.log(window.history.forward())

})

//variables para mostrar el carrito
const btnCarritoView =  document.querySelector('#carrito-btn-view')
const CarritoView = document.querySelector('#carrito')

btnCarritoView.addEventListener('click', function(eve){
    eve.preventDefault()
    CarritoView.classList.toggle('mostrar-carrito')
})


//controla el boton de ir hacia arriba

    //analiza el scroll para hacer visible el boton
window.onscroll = function(){
    if(document.documentElement.scrollTop > 100){
        document.querySelector('#scroll-up').classList.add('display-up');
    }else{
        document.querySelector('#scroll-up').classList.remove('display-up');
    }
}


//boton arriba
Subir_o_Bajar('#scroll-up', 0)

//boton nosotros
Subir_o_Bajar("#nosotros", 9999999999999999999)


//logica de subir o bajar
function Subir_o_Bajar(clase, distacia){
    document.querySelector(clase).addEventListener('click', function(){
        window.scrollTo({
            top: distacia,
            behavior: 'smooth'
        })
    })
}