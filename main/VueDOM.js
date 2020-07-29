const VDOM = new Vue({
    el: "#ViewDOM",
    data:{
        CardFood: []
    },

    mounted() {
        db.collection("imagenes").get().then((querySnapSchot) => {
            let CargaDOM = querySnapSchot.docChanges();
            /* console.log(CargaDOM) */
            CargaDOM.forEach(Carga => {
                if(Carga.type == 'added'){
                    this.CardFood.unshift(Carga.doc.data())
                }
            })
        })
        
    }
})