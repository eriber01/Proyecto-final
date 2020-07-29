/* // variables y referencias de APIs Firebase
var imgRef = firebase.database().ref().child('imgRef');

//evento que dispara a funcion
//formulario.addEventListener('submit', enviar)

window.onload = function(){

    imgRef.on("value", function(snapshot){
        var imgData = snapshot.val();
        for(var dataimg in imgData){
            console.log(`url de imagen ${imgData[dataimg].url}, nombre de la imagen ${imgData[dataimg].nombre}` )
        }

        console.log(imgData)
    })
} */