//variables para la info de los card
const nombrePlato = document.getElementById('nombre-plato');
const precioPlato = document.getElementById('precio-plato');
const desPlato = document.getElementById('descripcion-plato');
const tipoPlato = document.getElementById('tipoPlato')
const formUp = document.getElementById('form-subir')
const UpdateView = document.getElementById('update-view')
const BorrarView = document.getElementById('borrar-view')

//controlan la vsta de las opciones del CMS
const ViewSubir = document.getElementById('btn-crudSubir')
const ViewActualizar = document.getElementById('btn-crudActualizar')
const ViewBorrar = document.getElementById('btn-crudBorrar')

//dispara los eventos que muestra las opciones del CMS
ViewSubir.addEventListener('click', function(eve){
    eve.preventDefault()
    formUp.classList.add('formDisplay')
    UpdateView.classList.remove('formDisplay')
    BorrarView.classList.remove('formDisplay')
});

ViewActualizar.addEventListener('click', function(eve){
    eve.preventDefault()
    UpdateView.classList.add('formDisplay')
    formUp.classList.remove('formDisplay')
    BorrarView.classList.remove('formDisplay')
})

ViewBorrar.addEventListener('click',function(eve){
    eve.preventDefault()
    BorrarView.classList.add('formDisplay')
    formUp.classList.remove('formDisplay')
    UpdateView.classList.remove('formDisplay')
})



//referencas a firebase
var db = firebase.storage();
var RealTime = firebase.database()

//evento que dispara la subida de los datos
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
        tipoPlato: tipoPlato.value,
        url: ulrImg,
        imgName: nameImg,
    })
    .then(function(docRef){
        console.log("Subida exitosa de datos " + key)
        console.log(docRef)
        formUp.reset()
    })
    .catch(function(error){
        console.log('error al subir', error)
    });
}



//crea y llena los form del modulo actualizar
window.onload = function(){
    var Real = RealTime.ref().child('RestauranteData/PlatoFuerte');
    
    Real.on("value", function(snapshot){
    var RealData = snapshot.val()

    console.log('funciona');
        for(var data in RealData){
            /* console.log(RealData[data])

            console.log(parseInt(RealData[data].precioPlato));
            console.log(RealData.key);
            console.log(snapshot.val()) */
            
            const formUpdateLoad = document.createElement('form')
            formUpdateLoad.autocomplete = 'off';
            formUpdateLoad.setAttribute('aria-required', 'true')
            formUpdateLoad.innerHTML = `
                <label>Elija el tipo de Plato al que va a cambiar</label>
                <br>
                <select name="" id="tipoPlatoUpdate">
                    <option value="platoFuerte">Plato Fuerte</option>
                    <option value="entradas">Entradas</option>
                    <option value="bebidas">Bebidas</option>
                </select>
                <br>
                <!-- <label for="NombrePlato">Nombre del plato</label> -->
                <textarea id="nombre-platoUpdate">\ ${RealData[data].nombrePlato}\</textarea>
                
                <!-- <label for="precio-plato">Precio del Plato</label> -->
                <input type="number" name="" placeholder="Precio del Plato" id="precio-platoUpdate">
                
                <br>
                <label class="lb-img" for="img-platoUpdate">Selecione la nueva imagen del plato</label>
                <input type="file" id="img-platoUpdate" alt="" placeholder="Selecione la imagen del plato" accept="image/png, .jpeg, .jpg">
                
                <br>
                <!-- <label for="DescripcionPlato">Descripcion Plato</label> -->
                <textarea name="" id="descripcion-platoUpdate" cols="15" rows="5">\ ${RealData[data].desPlato}\</textarea>
                
                <input type="submit" onclick="UpdateCard()" class="enviar" id="btn-Update" value="Actualiar">
            `
        
                document.querySelector('#update-view').appendChild(formUpdateLoad)

                
        };//fin de laiteracion que crea y llena los form
        BorrarPlato(RealData)
    });
}



//funcion de la actualizacion de los datos

function UpdateCard() {
    console.log('funciona')
    alert('funciona')

    var RealUpdate = RealTime.ref().child('RestauranteData/PlatoFuerte');
    
    RealUpdate.update({
        nombrePlato: nombrePlato.value,
        precioPlato: precioPlato.value,
        desPlato: desPlato.value,
        tipoPlato: tipoPlato.value

        
    })
    .then(function(docRef){
        console.log("actualizacion exitosa de datos")
        alert('funciona')
        console.log(docRef)
    })
    .catch(function(error){
        console.log('error al subir', error)
    })
}


// funcion para borrar los plato

function BorrarPlato(RealData){

    console.log(RealData)

    //itera los datos para sacarlos de firebase
    for(var dat in RealData){
                //creando los datos que van a ser agregados al dom
        const formSubir = document.createElement('form')
        formSubir.autocomplete = 'off'
        formSubir.setAttribute('aria-required', 'true')
        formSubir.innerHTML = `
            <p>${RealData[dat].nombrePlato}</p>
            <a id=${RealData[dat].keyPlato} class="borrar">X<a>
        `
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

        document.querySelector('#borrar-view').appendChild(formBorrar)


        //toma el id y borra los datos de firebase
        let dataDOM = document.getElementById(`${RealData[dat].keyPlato}`)
    
        let idDB;
    
        dataDOM.addEventListener('click', function(eve){
            eve.preventDefault()

            BDborrarRef = RealTime.ref(`RestauranteData/PlatoFuerte/${RealData[dat].keyPlato}`)
            BDborrarRef.remove().then(function(){
                console.log("el plato fue borrado")
                /* window.location.reload() */
            })
            .catch(function(){
                console.log('algo salio mal')
            })
            console.log(BDborrarRef.remove());
        });
    }


=======
        console.log(RealData[dat])
        document.querySelector('#borrar-view').appendChild(formSubir)
    }

>>>>>>> parent of d9b29e7... Modulo de borrar listo

=======
        console.log(RealData[dat])
        document.querySelector('#borrar-view').appendChild(formSubir)
    }

>>>>>>> parent of d9b29e7... Modulo de borrar listo
=======
        console.log(RealData[dat])
        document.querySelector('#borrar-view').appendChild(formSubir)
    }

>>>>>>> parent of d9b29e7... Modulo de borrar listo

}