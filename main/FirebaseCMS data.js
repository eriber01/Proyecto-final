//variables para subir la info de los card
const nombrePlato = document.getElementById('nombre-plato');
const precioPlato = document.getElementById('precio-plato');
const desPlato = document.getElementById('descripcion-plato');
const form = document.getElementById('form-subir')


// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBW0gEqdV5PVuNT_qaNLSuO3Scv6PNNb1o",
    authDomain: "proyecto-final-8285d.firebaseapp.com",
    projectId: "proyecto-final-8285d"
});

var db = firebase.firestore();



form.addEventListener('submit', function(eve){
    eve.preventDefault()
    
    /* var db = firebase.firestore(); */

    db.collection("imagenes").add({
        nombrePlato: nombrePlato.value,
        precioPlato: precioPlato.value,
        desPlato: desPlato.value
    })
    .then(function(docRef){
        console.log('subido el id es', docRef.id)
    })
    .catch(function(error){
        console.log('error al subir', error)
    });
})




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