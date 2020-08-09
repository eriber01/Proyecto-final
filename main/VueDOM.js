//referencias a las 3 ubicacion de los platos en la base de datos
const RefPLatoFuerte = firebase.database().ref().child('RestauranteData/platoFuerte');
const RefEntradas = firebase.database().ref().child('RestauranteData/entradas')
const RefBebidas = firebase.database().ref().child('RestauranteData/bebidas')

//instancia de vue para los platos fuertes
const VuePlatoFuerte = new Vue({
    el: "#VuePlatoFuerte",
    data:{
        VFuerteDOM: []
    },
    mounted() {

        RefPLatoFuerte.on("value", function(snapshot){
                /* console.log(snapshot.val()) */
                VuePlatoFuerte.VFuerteDOM = [];
                var objeto = snapshot.val()
                for(propiedad in objeto){
                    VuePlatoFuerte.VFuerteDOM.unshift({
                        '.key': propiedad,
                        nombre: objeto[propiedad].nombrePlato,
                        precio: objeto[propiedad].precioPlato,
                        descripcion: objeto[propiedad].desPlato,
                        urlImg: objeto[propiedad].url,
                        dataKey: objeto[propiedad].keyPlato
                    })
                    
                    console.log(typeof(objeto[propiedad].keyPlato))
                }
            });
    }
});


//instancia de vue para las entradas
const VueEntradas = new Vue({
    el: '#VueEntradas',
    data:{
        VEntradaDOM: []
    },
    mounted(){
        RefEntradas.on("value", function(snapshot){
            VueEntradas.VEntradaDOM = []
            var objeto = snapshot.val()

            for(propiedad in objeto){
                VueEntradas.VEntradaDOM.unshift({
                    '.key': propiedad,
                    nombre: objeto[propiedad].nombrePlato,
                    precio: objeto[propiedad].precioPlato,
                    descripcion: objeto[propiedad].desPlato,
                    urlImg: objeto[propiedad].url
                })

            }
        })
    }

});


//instancia de vue para las bebidas
const VueBebidas = new Vue({
    el: '#VueBebidas',
    data: {
        VBebidasDOM: []
    },
    mounted(){
        RefBebidas.on("value", function(snapshot){
            VueBebidas.VBebidasDOM = []
            var objeto = snapshot.val()

            for(propiedad in objeto){
                VueBebidas.VBebidasDOM.unshift({
                    '.key': propiedad,
                    nombre: objeto[propiedad].nombrePlato,
                    precio: objeto[propiedad].precioPlato,
                    descripcion: objeto[propiedad].desPlato,
                    urlImg: objeto[propiedad].url
                })
            }
        })
    }
})