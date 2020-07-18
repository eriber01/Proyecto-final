
// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyBW0gEqdV5PVuNT_qaNLSuO3Scv6PNNb1o",
authDomain: "proyecto-final-8285d.firebaseapp.com",
databaseURL: "https://proyecto-final-8285d.firebaseio.com",
projectId: "proyecto-final-8285d",
storageBucket: "proyecto-final-8285d.appspot.com",
messagingSenderId: "332592113776",
appId: "1:332592113776:web:89acc7d751aea01374ecb5",
measurementId: "G-DLW4PCDNLP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// variables del form para acceder al sistema

const user = document.getElementById('user')
const pass = document.getElementById('pass')
const btn_acceder = document.getElementById('btn-acceder');

const formulario = document.getElementById('form-login');



//funcion y eventos para acceder al CMS
formulario.addEventListener('submit', function(eve){
    eve.preventDefault()

    //autentificacion por firebase
    firebase.auth().signInWithEmailAndPassword(user.value, pass.value)
    .then(function(){
        swal({
            icon: "success",
        });

        setTimeout(function spera(){
            window.location.href = '../CMS.html';
        }, 700)
    })
    .catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;

        swal("EL Usuario o la Contraseña son erroneos", {
            className: "red-bg",
        });

        formulario.reset()
    })
})

// funcion para el observador "se activa cual el estado de la sesion cambia"

function observador(){
    firebase.auth().onAuthStateChanged(function(user){
        if(user){

            formulario.reset()

            console.log('acceso')
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
    
        } else {
            formulario.reset()
            console.log('no acceso')
        }
    })
}

//llamada de la funcion observador
observador()
