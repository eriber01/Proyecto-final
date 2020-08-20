//variables para el metodo subir
const nombrePlato = document.getElementById('nombre-plato');
const precioPlato = document.getElementById('precio-plato');
const desPlato = document.getElementById('descripcion-plato');
const tipoPlato = document.getElementById('tipoPlato')


//controla los submit
const formUp = document.getElementById('form-subir')

//controla las vistas
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

    console.log('se ve')
})



//referencas a firebase
var db = firebase.storage();
var RealTime = firebase.database()

//evento que dispara la subida de los datos
formUp.addEventListener('submit', function(eve){
    eve.preventDefault()
    //seleciona y sube la imagen a firebase storage
    var archivo = eve.target[3].files[0];

    //carga la funcion que sube los datos y pide la confirmacion
    swal({
        title: "Estas seguro?",
        text: "Si continuas, el Plato sera agregado a la Base Datos!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            swal("Listo! Su Plato a sido agregado a la Base de Datos!", {
            icon: "success",
            });
            subirImgStorage(archivo)
        } else {
            swal("A cancelado la creacion del Plato!");
        }
    });
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
        imgName: nameImg
    })
    .then(function(docRef){
        console.log("Subida exitosa de datos ")
        let key = docRef.path.o[2]
        let refUpdate = RealTime.ref().child(`RestauranteData/${tipoPlato.value}/${key}`);
        refUpdate.update({
            IDkey:key
        })
        window.location.reload()
    })
    .catch(function(error){
        console.log('error al subir', error)
    });
}


//carga los datos del modulo actualizar desde firebase y los procesa en el DOM con Vue.js
let Real = RealTime.ref().child('RestauranteData/PlatoFuerte');

const VueCMSupdate = new Vue({
    el: '#UpdateVue',
    data:{
        VueUpdate: []
    },
    mounted(){
        Real.on('value', function(snapshot){
            VueCMSupdate.VueUpdate = []
            let objeto = snapshot.val()

            for(data in objeto){
                VueCMSupdate.VueUpdate.unshift({
                    nombre: objeto[data].nombrePlato,
                    descripcion: objeto[data].desPlato,
                    precio: objeto[data].precioPlato,
                    id: objeto[data].IDkey
                })
                console.log(objeto)
            }
        });
    }
})

//funcion de la actualizacion de los datos
document.addEventListener('DOMContentLoaded', function(eve){
    eve.preventDefault()
    setTimeout(function(){

        let objeto;
        Real.on('value', function(snapshot){
            objeto = snapshot.val()
            for(data in objeto){

                const bntUpdate = document.getElementById(`${objeto[data].IDkey}`)

                bntUpdate.addEventListener('submit', function(eve){
                    eve.preventDefault()
                    let RealUpdate = RealTime.ref().child(`RestauranteData/PlatoFuerte/${objeto[data].IDkey}`);
                    
                    const ObjetoData = eve.target;
                    
                    const ObjetoUpdate = {
                        nombre: ObjetoData.querySelector("input[type=text]").value,
                        precio: ObjetoData.querySelector("input[type=number]").value,
                        descripcion: ObjetoData.querySelector('textarea').value
                    }

                    console.log(ObjetoUpdate)
                    
                    RealUpdate.update({
                        nombrePlato: ObjetoUpdate.nombre,
                        precioPlato: ObjetoUpdate.precio,
                        desPlato: ObjetoUpdate.descripcion
                    })
                    .then(function(docRef){
                        console.log("actualizacion exitosa de datos")
                        
                    })
                    .catch(function(error){
                        console.log('error al subir', error)
                    })
                })
            }
        })

    },3000)
})


// funcion para borrar los platos
document.addEventListener('DOMContentLoaded', BorrarPlato())

function BorrarPlato(){

    console.log('funciona borrar');

    //itera los datos para sacarlos de firebase
    Real.on('value', function(snapshot){
        objeto = snapshot.val()
        for(var data in objeto){
            //creando los datos que van a ser agregados al dom
            const Btn_Borrar = document.createElement('form')
            Btn_Borrar.innerHTML = `
                <p>${objeto[data].nombrePlato}</p>
                
                <a id=${objeto[data].IDkey} class="borrar">Eliminar<a>
            `
            document.querySelector('#BorrarVue').appendChild(Btn_Borrar)
        }
    })
    let BDborrarRef;


    let dataDOM = document.getElementById("BorrarVue")
    let idDB;

    dataDOM.addEventListener('click', function(eve){
        eve.preventDefault()
        console.log(eve.target.parentElement)



        swal({
            title: "Estas seguro?",
            text: "Si continuas, no podras recuperar los datos!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {

                idDB = eve.target.parentElement.querySelector('a').getAttribute('id')
                console.log(idDB)
                BDborrarRef = RealTime.ref("RestauranteData/PlatoFuerte/" + idDB)
                BDborrarRef.remove().then(function(){
                    console.log("el plato fue borrado")
                })
                .catch(function(){
                    console.log('algo salio mal')
                })

                swal("Listo! El Plato a sido Eliminado de la base de datos", {
                icon: "success"});

                setTimeout(function(){
                    location.reload()
                },2000)
            } else {
                swal("A cancelado la Eliminacion del plato");
            }
        });
        
    });


}