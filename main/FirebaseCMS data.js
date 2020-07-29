//variables para subir la info de los card
const nombrePlato = document.getElementById('nombre-plato');
const precioPlato = document.getElementById('precio-plato');
const desPlato = document.getElementById('descripcion-plato');
const form = document.getElementById('form-subir')

var otraDB = firebase.database().ref().child('imgRef')

form.addEventListener('submit', function(eve){
    eve.preventDefault()
    
    //sube los datos a la real time databese
    otraDB.push({
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

