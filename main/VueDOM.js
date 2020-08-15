//referencias a las 3 ubicacion de los platos en la base de datos
const RefPLatoFuerte = firebase.database().ref().child('RestauranteData/platoFuerte');
const RefEntradas = firebase.database().ref().child('RestauranteData/entradas')
const RefBebidas = firebase.database().ref().child('RestauranteData/bebidas')

//instancia de vue para los platos fuertes
const VuePlatoFuerte = new Vue({
    el: "#VuePlatoFuerte",
    data:{
        VFuerteDOM: []
    },
    mounted() {

        RefPLatoFuerte.on("value", function(snapshot){
                /* console.log(snapshot.val()) */
                VuePlatoFuerte.VFuerteDOM = [];
                var objeto = snapshot.val()
                for(propiedad in objeto){
                    VuePlatoFuerte.VFuerteDOM.unshift({
                        '.key': propiedad,
                        nombre: objeto[propiedad].nombrePlato,
                        precio: objeto[propiedad].precioPlato,
                        descripcion: objeto[propiedad].desPlato,
                        urlImg: objeto[propiedad].url,
                        dataKey: objeto[propiedad].keyPlato
                    })
                    
                    /* console.log(objeto[propiedad].keyPlato) */
                }
            });
    }
});


//instancia de vue para las entradas
const VueEntradas = new Vue({
    el: '#VueEntradas',
    data:{
        VEntradaDOM: []
    },
    mounted(){
        RefEntradas.on("value", function(snapshot){
            VueEntradas.VEntradaDOM = []
            var objeto = snapshot.val()

            for(propiedad in objeto){
                VueEntradas.VEntradaDOM.unshift({
                    '.key': propiedad,
                    nombre: objeto[propiedad].nombrePlato,
                    precio: objeto[propiedad].precioPlato,
                    descripcion: objeto[propiedad].desPlato,
                    urlImg: objeto[propiedad].url
                })

            }
        })
    }

});


//instancia de vue para las bebidas
const VueBebidas = new Vue({
    el: '#VueBebidas',
    data: {
        VBebidasDOM: []
    },
    mounted(){
        RefBebidas.on("value", function(snapshot){
            VueBebidas.VBebidasDOM = []
            var objeto = snapshot.val()

            for(propiedad in objeto){
                VueBebidas.VBebidasDOM.unshift({
                    '.key': propiedad,
                    nombre: objeto[propiedad].nombrePlato,
                    precio: objeto[propiedad].precioPlato,
                    descripcion: objeto[propiedad].desPlato,
                    urlImg: objeto[propiedad].url
                })
            }
        })
    }
})

// logica, eventos y funciones de agregar a al carrito

//variables
const DomCarrito = document.querySelector('#lista-carrito tbody')
const DomTotal = document.querySelector('#total tbody')

document.addEventListener('DOMContentLoaded',function(eve){
    console.log('hola mundo');

    //esta funcion se cargar de esperar a que cargue todo en el DOM antes crear los eventos
    setTimeout(function(){

        let data;

        RefPLatoFuerte.on('value', function(snapshot){
        data = snapshot.val()
    
            for(dat in data){
                id: data[dat].keyPlato
                
                const brn_Carrito = document.querySelector(`#${data[dat].keyPlato}`)

                brn_Carrito.addEventListener('click', function(eve){
                    eve.preventDefault()

                    const carrito =  eve.target.parentElement.parentElement;
                    //console.log(carrito)
                    const dataCarrito = {
                        nombre: carrito.querySelector('h3').textContent,
                        precio: carrito.querySelector('span').textContent,
                        id: carrito.querySelector('img').getAttribute('id')
                    }

                    console.log(dataCarrito)
                    // inserta los datos del plato al carrito
                    insertarCarrito(dataCarrito)
                    function insertarCarrito(dataCarrito){

                        const rowCarrito = document.createElement('tr')

                        //agrega el templace literal que ira al DOM
                        rowCarrito.innerHTML = `
                            <td>${dataCarrito.nombre}</td>
                            <td>${dataCarrito.precio}</td>
                            <td>
                                <a href="#" class="borrar">X</a>
                            </td>
                        `;

                        //agregar los datos al dom
                        DomCarrito.appendChild(rowCarrito)
                        console.log('se agrego el curso')
                        console.log(dataCarrito)

                        guardarLocalStorage(dataCarrito)
                    }
                })
            }
        })
    }, 3000)
} )


function guardarLocalStorage(dataCarrito){
    let dataCarritos;
    
    dataCarritos = obtenerLocalStorage();
    dataCarritos.push(dataCarrito)

    localStorage.setItem('Orden', JSON.stringify(dataCarritos))
    console.log(dataCarritos)
}


 //Suma el precio de los valores del carrito

const Cuenta = document.getElementById('cuenta').addEventListener('click', CarritoCuenta)

function CarritoCuenta(){

    console.log('cuenta funcona')
    let CarritoData;
    let total = 0;

    CarritoData = obtenerLocalStorage();

    for(let i=0; i<CarritoData.length; i++){
        let precioLS = Number(CarritoData[i].precio)
        total = total + precioLS;
    }

    console.log(total)

    const VueCuenta = new Vue({
        el: "#total",
        data: {
            VerCuenta: `${total}`
        }
    })
}

//obtione la cuenta que es guardada en el localstorage
function obtenerLocalStorage(){
    let dataCarritos;
    
    if(localStorage.getItem("Orden") === null){
        dataCarrito = []
    }else{
        dataCarrito = JSON.parse(localStorage.getItem('Orden'))
    }

    return dataCarrito;
}

//Eliminar un plato del carrito
const retirarPlato = document.getElementById('carrito').addEventListener('click', function(eve){
    eve.preventDefault()
    
    let elimiarPlato, platoID;

    if(eve.target.classList.contains('borrar')){
        eve.target.parentElement.parentElement.remove()
        elimiarPlato = eve.target.parentElement.parentElement
        /* platoID = elimiarPlato.querySelector('a'). */
    }
})

//elimina la cuenta

const cancelar = document.getElementById('cancelar').addEventListener('click', function(eve){
    eve.preventDefault()
    //confirmacion de la eliminacion de la cuenta

    swal({
        title: "Esta segudo que desea Proceguir?",
        text: "Una vez cancelada debera elegir los plato otra vez!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            swal("Listo su plato ah sido eliminado!", {
            icon: "success",
        });
        setTimeout(function(){
            window.location.reload()
            localStorage.clear()
        }, 2000)
        } else {
            swal("Los platos siguen como los dejo!");
        }
    });
})