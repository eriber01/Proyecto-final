
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