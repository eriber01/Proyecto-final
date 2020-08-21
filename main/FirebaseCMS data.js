//variables para el metodo subir, actualizar y borrar
const nombrePlato = document.getElementById('nombre-plato');
const precioPlato = document.getElementById('precio-plato');
const desPlato = document.getElementById('descripcion-plato');
const tipoPlato = document.getElementById('tipoPlato')
const tipoPlatoUpdate = document.getElementById('tipoPlato-update')
const tipoPlatoBorrar = document.getElementById('tipoPlato-borrar')


//controla la selecion del tipo de plato a editar
const selectFuerte = document.getElementById("selectFuerte")
const selectEntrada = document.getElementById("selectEntrada")
const selectBebidas = document.getElementById("selectBebidas")

const ViewPlatoFuerte = document.getElementById('vistaFuerte')
const ViewEntrada = document.getElementById('vistaEntrada')
const ViewBebida = document.getElementById('vistaBebida')

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

//sube las actualizaciones de los platos fuertes
selectFuerte.addEventListener('click', function(eve){
    eve.preventDefault()

        ViewPlatoFuerte.classList.toggle('no')
        ViewEntrada.classList.add('no')
        ViewBebida.classList.add('no')

        RealFuerte = RealTime.ref().child(`RestauranteData/PlatoFuerte`);
        let objetoFuerte;
        //recorrido de los datos del plato fuerte
        RealFuerte.on('value', function(snapshot){
            objetoFuerte = snapshot.val()
            for(dataFuerte in objetoFuerte){

                const bntUpdate = document.getElementById(`${objetoFuerte[dataFuerte].IDkey}`)
                
                bntUpdate.addEventListener('click', function(eve){
                    eve.preventDefault()
                    
                    let RealUpdate = RealTime.ref().child(`RestauranteData/PlatoFuerte/${objetoFuerte[dataFuerte].IDkey}`);
                    
                    const ObjetoData = eve.target.parentElement;
                    const ObjetoUpdate = {
                        nombre: ObjetoData.querySelector("input[type=text]").value,
                        precio: ObjetoData.querySelector("input[type=number]").value,
                        descripcion: ObjetoData.querySelector('textarea').value
                    }
                    UpdateData(RealUpdate, ObjetoUpdate)
                })
            }
        })
})


selectEntrada.addEventListener('click', function(eve){
    eve.preventDefault()

    ViewEntrada.classList.toggle('no')
    ViewPlatoFuerte.classList.add('no')
    ViewBebida.classList.add('no')

    let objetoEntrada;
    RealEntradas = RealTime.ref().child(`RestauranteData/entradas`);
    RealEntradas.on('value', function(snapshot){
        objetoEntrada = snapshot.val()
        for(dataEntrada in objetoEntrada){

            const bntUpdateEntrada = document.getElementById(`${objetoEntrada[dataEntrada].IDkey}`)
            
            bntUpdateEntrada.addEventListener('click', function(eve){
                eve.preventDefault()

                let RealUpdateEntrada; 
                
                RealUpdateEntrada = RealTime.ref().child(`RestauranteData/entradas/${objetoEntrada[dataEntrada].IDkey}`);
                
                //console.log(objetoEntrada[dataEntrada].IDkey)
                const ObjetoDataEntrada = eve.target.parentElement;
                const ObjetoUpdateEntrada = {
                    nombre: ObjetoDataEntrada.querySelector("input[type=text]").value,
                    precio: ObjetoDataEntrada.querySelector("input[type=number]").value,
                    descripcion: ObjetoDataEntrada.querySelector('textarea').value
                }

                //console.log(ObjetoUpdateEntrada + ' ads ' + RealUpdateEntrada)
                UpdateData(RealUpdateEntrada, ObjetoUpdateEntrada)
            })
        }
    })

})


selectBebidas.addEventListener('click', function(eve){
    eve.preventDefault()

    ViewBebida.classList.toggle('no')
    ViewEntrada.classList.add('no')
    ViewPlatoFuerte.classList.add('no')
    RealBebidas = RealTime.ref().child(`RestauranteData/bebidas`);
    let objetoBebidas
    RealBebidas.on('value', function(snapshot){
        objetoBebidas = snapshot.val()
        for(dataBebidas in objetoBebidas){

            const bntUpdateBebidas = document.getElementById(`${objetoBebidas[dataBebidas].IDkey}`)
            
            bntUpdateBebidas.addEventListener('click', function(eve){
                eve.preventDefault()

                let RealUpdateBebidas; 
                
                RealUpdateBebidas = RealTime.ref().child(`RestauranteData/bebidas/${objetoBebidas[dataBebidas].IDkey}`);
                
                //console.log(objetoBebidas[dataEntrada].IDkey)
                const ObjetoDataBebidas = eve.target.parentElement;
                const ObjetoUpdateBebidas = {
                    nombre: ObjetoDataBebidas.querySelector("input[type=text]").value,
                    precio: ObjetoDataBebidas.querySelector("input[type=number]").value,
                    descripcion: ObjetoDataBebidas.querySelector('textarea').value
                }

                UpdateData(RealUpdateBebidas, ObjetoUpdateBebidas)

            })
        }
    })
})

///funcion para actualizar los datos
function UpdateData(ref, objeto){


    swal({
        title: "Esta seguro?",
        text: "Si continua, los seran editados!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
    .then((willDelete) => {
        if (willDelete) {
            ref.update({
                nombrePlato: objeto.nombre,
                precioPlato: objeto.precio,
                desPlato: objeto.descripcion
            })
            .then(function(docRef){
                console.log("actualizacion exitosa de datos")
            })
            .catch(function(error){
                console.log('error al subir', error)
            })

        swal("Listo! El plato ah Sido actualizado!", {
            icon: "success",
        });

        setTimeout(function(){
            location.reload()
        },3000)
        } else {
        swal("Ah cancelado los datos siguen igual");
        }
    });
}

// funcion para borrar los platos
document.addEventListener('DOMContentLoaded', function(){
    console.log('funciona borrar');

        //plato fuerte
        cargarPlatoFuerte()

        //entrada
        cargarEntrada()

        //bebidas
        cargarBebidas()
})

    //itera los datos para sacarlos de firebase

function cargarPlatoFuerte(){

    RealFuerte = RealTime.ref().child(`RestauranteData/PlatoFuerte`);
    RealFuerte.on('value', function(snapshot){
        objeto = snapshot.val()
        for(var data in objeto){
            //creando los datos que van a ser agregados al dom
            const Btn_Borrar = document.createElement('form')
            Btn_Borrar.innerHTML = `
                <h3>Plato Fuerte</h3>
                <p>${objeto[data].nombrePlato}</p>
                
                <a id=${objeto[data].IDkey} class="borrar">Eliminar<a>
            `
            document.querySelector('#BorrarVue').appendChild(Btn_Borrar)
        }

        borrarFuerte = document.querySelectorAll('p + a')

        let tipoFuerte = 'PlatoFuerte'
        for(let i = 0; i < borrarFuerte.length; i++){
            borrarFuerte[i].addEventListener('click', function(){
                BorrarPlato(tipoFuerte)
            })
        }
        
    })
}


function cargarEntrada(){

    RealEntradas = RealTime.ref().child(`RestauranteData/entradas`);
    RealEntradas.on('value', function(snapshot){
        objeto = snapshot.val()
        for(var data in objeto){
            //creando los datos que van a ser agregados al dom
            const Btn_Borrar = document.createElement('form')
            Btn_Borrar.innerHTML = `
                <h3>Entradas</h3>
                <p>${objeto[data].nombrePlato}</p>
                
                <a id=${objeto[data].IDkey} class="borrar">Eliminar<a>
            `
            document.querySelector('#BorrarVue').appendChild(Btn_Borrar)
        }

        borrarEntrada = document.querySelectorAll('p + a')

        let tipoEntrada = 'entradas'
        for(let i = 0; i < borrarEntrada.length; i++){
            borrarEntrada[i].addEventListener('click', function(){
                BorrarPlato(tipoEntrada)
            })
        }
    })
}

function cargarBebidas(){

    RealBebidas = RealTime.ref().child(`RestauranteData/bebidas`);
    RealBebidas.on('value', function(snapshot){
        objeto = snapshot.val()
        for(var data in objeto){
            //creando los datos que van a ser agregados al dom
            const Btn_Borrar = document.createElement('form')
            Btn_Borrar.innerHTML = `
                <h3>Bebidas</h3>
                <p>${objeto[data].nombrePlato}</p>
                
                <a id=${objeto[data].IDkey} class="borrar">Eliminar<a>
            `
            document.querySelector('#BorrarVue').appendChild(Btn_Borrar)
        }

        borrarBebida = document.querySelectorAll('p + a')

        let tipoBebida = 'bebidas'
        for(let i = 0; i < borrarBebida.length; i++){
            borrarBebida[i].addEventListener('click', function(){
                BorrarPlato(tipoBebida)
            })
        }
    })
}

//ejecuta el proceso de borrado de la base de datos
function BorrarPlato(tipoPlato){
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
                BDborrarRef = RealTime.ref(`RestauranteData/${tipoPlato}/${idDB}`)
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