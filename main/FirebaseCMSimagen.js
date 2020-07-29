

// variables y referencias de APIs Firebase

var imgRef = firebase.database().ref().child('imgRef');

//evento que dispara a funcion
//formulario.addEventListener('submit', enviar)

window.onload = function(){

    imgRef.on("value", function(snapshot){
/*         var imgData = snapshot.val();

        for(var dataimg in imgData){
            console.log(`url de imagen ${imgData[dataimg].url}, nombre de la imagen ${imgData[dataimg].nombre}` )
        }
 */
        /* console.log(imgData) */
    })
    
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
        var refStorage = db.ref('restaurante/').child(archivo.name);
        // Comienzo la tarea de upload
        var uploadTask = refStorage.put(archivo);

        //mensaje si ocurre algun error
        uploadTask.on('state_changed', null,
            function (error) {
                console.log('Error al subir el archivo', error);
            },
            function(){
                console.log('Subida completada');

                var urlDescarga  = uploadTask.h.downloadURLs;
                console.log(uploadTask.h.downloadURLs)
                crearRefereciaIMG(archivo.name, urlDescarga);
            }
        );
    }
}


function crearRefereciaIMG(nameImg, urlDescarga){
    imgRef.push({
        nombre: nameImg,
        url: urlDescarga
    });
}