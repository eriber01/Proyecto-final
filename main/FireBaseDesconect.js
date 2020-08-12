
//salir del sistema con firebase
const btn_Logout = document.getElementById('btn-salir');

    btn_Logout.addEventListener('click', function(eve){
    eve.preventDefault()

    firebase.auth().signOut()
    .then(function(){
        console.log('saliste')
        window.location.href = 'index.html'
    })
    .catch(function(){
        
    })
})


// funcion para el observador "se activa cual el estado de la sesion cambia"
function observador(){
    firebase.auth().onAuthStateChanged(function(user){
        if(user){

            console.log(firebase.auth())
            console.log('acceso')
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;

        } else {
            console.log('no acceso')
            alert('No estas logueado, Vuelva a la Pagina de inicio')
            window.location = "index.html";
        }
    })
}

//llamada de la funcion observador
observador()




































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
                /* console.log(data[dat].keyPlato) */

                const brn_Carrito = document.getElementById(data[dat].keyPlato)
            /*  console.log(nose) */
        
                brn_Carrito.addEventListener('click', function(eve){
                    //eve.preventDefault()


                    const prueva = eve.target.parentElement;
                    const carrito =  eve.target.parentElement.parentElement;
                    console.log(carrito)
                    const dataCarrito = {
                        nombre: carrito.querySelector('h3').textContent,
                        precio: carrito.querySelector('span').textContent
                    }

                    console.log(dataCarrito)
                    console.log(`click en agregar carrito ${data[dat].nombrePlato}`)


                
                    /* Total = parseInt(prueva.querySelector('span').textContent) */
                    const arreglo = [n/* parseInt(prueva.querySelector('span').textContent) */]

                    let Total = arreglo.reduce((acumulador, elemento) => acumulador + elemento, 0)

                    console.log(Total)
                    // inserta los datos del plato al carrito
                    insertarCarrito(dataCarrito)
                    function insertarCarrito(dataCarrito){

                        const rowCarrito = document.createElement('tr')
/*                         const rowTotal = document.createElement('tr')
                        let mas;
                        
                        let DomTotal; */
                        
                        //agrega el templace literal que ira al DOM
                        rowCarrito.innerHTML = `
                            <td>${dataCarrito.nombre}</td>
                            <td>${dataCarrito.precio}</td>
                        `;

                        //calcula el total a pagar

/*                         Total = parseInt(prueva.querySelector('span').textContent)
                        const arreglo = []
                        arreglo.push(Total) */
/*                             console.log(mas = Total + Total);
                            
                        function suma(uno){
                            for(i = 0; i<= Total; i++){
                                var resultado = uno + uno;
                            }
                            alert("la suma es " + resultado)
                        }
                        suma(Total) */
/*                         rowTotal.innerHTML = `
                                <td>TOTAL</td>
                                <td>${Total}</td>
                        ` */
                        //agregar los datos al dom
                        DomCarrito.appendChild(rowCarrito)

                        /* console.log(carrito.querySelector('td').textContent); */
                
                        /* DomTotal.appendChild(rowTotal) */
                        console.log('se agrego el curso')
                    }
                })
            }
        })

    }, 3000)
} )