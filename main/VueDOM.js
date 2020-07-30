
const VDOM = new Vue({
    el: "#ViewDOM",
    data:{
        CardFood: []
    },
    mounted() {

            RealTimeRef.on("value", function(snapshot){
                /* console.log(snapshot.val()) */
                VDOM.CardFood = [];
                var objeto = snapshot.val()
                for(propiedad in objeto){
                    VDOM.CardFood.unshift({
                        '.key': propiedad,
                        nombre: objeto[propiedad].nombrePlato,
                        precio: objeto[propiedad].precioPlato,
                        descripcion: objeto[propiedad].desPlato,
                        ulrImg: objeto[propiedad].url
                    })
                }
/*                 thurl = VDOM.CardFood[0].ulrImg */
                
                console.log(objeto)
            });
    }/* ,
    methods:{
        getImg(){
            
        }
    } */
})