//varibles para subir la imagen
const formulario = document.getElementById('form-subir');


firebase.initializeApp({
    apiKey: "AIzaSyBW0gEqdV5PVuNT_qaNLSuO3Scv6PNNb1o",
    authDomain: "proyecto-final-8285d.firebaseapp.com",
    databaseURL: "https://proyecto-final-8285d.firebaseio.com",
    storageBucket: "proyecto-final-8285d.appspot.com"
});



// Servicios de APIs Firebase
var db = firebase.storage();


//evento que dispara a funcion
//formulario.addEventListener('submit', enviar)

window.onload = function(){
    /* var archivo =  */document.getElementById('img-plato').addEventListener('change', function(eve){
        eve.preventDefault()

        var archivo = eve.target.files[0];
        enviar(archivo)
    })
}
//funcion que envia la imagen
function enviar(archivo) {
    //selector de la imagen que se va a subir
    subirArchivo(archivo);

    // función que se encargará de subir el archivo
    function subirArchivo(archivo) {
        // referencia del lugar donde se guardara la imagen
        var refStorage = db.ref('restaurante').child(archivo.name);
        // Comienzo la tarea de upload
        var uploadTask = refStorage.put(archivo);

        //mensaje si ocurre algun error
        uploadTask.on('state_changed', null,
            function (error) {
                console.log('Error al subir el archivo', error);
            },
            function(){
                console.log('Subida completada');
            }
        );
    }
}


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