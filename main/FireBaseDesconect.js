
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

