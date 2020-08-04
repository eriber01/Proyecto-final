
//variables para subir la info de los card
const nombrePlato = document.getElementById('nombre-plato');
const precioPlato = document.getElementById('precio-plato');
const desPlato = document.getElementById('descripcion-plato');
const tipoPlato = document.getElementById('tipoPlato')
const formUp = document.getElementById('form-subir')
const formUpdate = document.getElementById('form-update')


//controlan la vsta de las opciones del CMS
const ViewSubir = document.getElementById('btn-crudSubir')
const ViewActualizar = document.getElementById('btn-crudActualizar')
const ViewBorrar = document.getElementById('btn-crudBorrar')

//dispara los eventos que muestra las opciones del CMS
ViewSubir.addEventListener('click', function(){
    formUp.style.display = 'flex'
    formUpdate.style.display = 'none'
});

ViewActualizar.addEventListener('click', function(){
    formUpdate.style.display = 'flex'
    formUp.style.display = 'none'
})



//referencas a firebase
var db = firebase.storage();
var RealTime = firebase.database()


formUp.addEventListener('submit', function(eve){
    eve.preventDefault()
    //seleciona y sube la imagen a firebase storage
    var archivo = eve.target[3].files[0];

    /* console.log(archivo.name) */
    subirImgStorage(archivo)
})

//funcion sube la imagen a firebase storage
function subirImgStorage(archivo){

    var refStorage = db.ref(`RestauranteImg/${tipoPlato.value}`).child(archivo.name);
    var uploadTask = refStorage.put(archivo);

    //mensaje si ocurre algun error
    uploadTask.on('state_changed', null,
        function (error) {
            console.log('Error al subir el archivo', error);
        },
        function(){
            console.log('Subida completada de imagen');

            var urlDescarga  = uploadTask.h.downloadURLs;
            /* console.log(uploadTask.h.downloadURLs)
 */ 
            //sube los datos a la real time databese
            firebaseRealTimeUpload(archivo.name, urlDescarga.toString());
        }
    );
}

//funcion sube los datos a Real Time database
function firebaseRealTimeUpload(nameImg, ulrImg){

    var refRealTime = RealTime.ref().child(`RestauranteData/${tipoPlato.value}`)

    refRealTime.push({
        nombrePlato: nombrePlato.value,
        precioPlato: precioPlato.value,
        desPlato: desPlato.value,
        url: ulrImg,
        imgName: nameImg
        
    })
    .then(function(docRef){
        console.log("Subida exitosa de datos")
        formUp.reset()
    })
    .catch(function(error){
        console.log('error al subir', error)
    });
}