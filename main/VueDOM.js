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








/* const carrito = document.getElementById('no').addEventListener('click', function(eve){
    eve.preventDefault()
    console.log('hola')

    let data
    RefPLatoFuerte.on('value', function(snapshot){
    data = snapshot.val()

    for(dat in data){
        id: data[dat].keyPlato
        console.log(data[dat].keyPlato)
    }
    })
}) */


// logica, eventos y funciones de agregar a al carrito

//variables
const DomCarrito = document.querySelector('#lista-carrito tbody')
document.addEventListener('DOMContentLoaded',function(eve){
    console.log('hola mundo');

    //esta funcion se cargar de esperar a que cargue todo en el DOM antes crear los eventos
    setTimeout(function(){

 

        let data
        RefPLatoFuerte.on('value', function(snapshot){
        data = snapshot.val()
    
            for(dat in data){
                id: data[dat].keyPlato
                /* console.log(data[dat].keyPlato) */

                const brn_Carrito = document.getElementById(data[dat].keyPlato)
            /*  console.log(nose) */
        
                brn_Carrito.addEventListener('click', function(eve){
                    eve.preventDefault()
                    
                    const carrito =  eve.target.parentElement.parentElement;
                    console.log(carrito)
                    const dataCarrito = {
                        nombre: carrito.querySelector('h3').textContent,
                        precio: carrito.querySelector('span').textContent
                    }

                    console.log(dataCarrito)
                    console.log(`click en agregar carrito ${data[dat].nombrePlato}`)


                    // inserta los datos del curso al DOM
                    insertarCarrito(dataCarrito)
                    function insertarCarrito(dataCarrito){

                        const row = document.createElement('tr')

                        //agrega el templace literal que ira al DOM
                        row.innerHTML = `
                            <td>${dataCarrito.nombre}</td>
                            <td>${dataCarrito.precio}</td>
                        `;

                        //agregar los datos al dom
                        DomCarrito.appendChild(row)
                        console.log('se agrego el curso')
                    }
                })
            }
        })

    }, 3000)
} )