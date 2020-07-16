<template>
    <div>
        <v-container>
        <v-row >
            <v-col cols="12" sm="6" md="4" xs="12" 
                    v-for="produtc in produtcs.produtcs"
                    :key="produtc.id">
                <v-card
                    max-width="344"
                    class="mx-auto"
                >
                    <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="headline">Our Changing Planet</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>

                    <v-img
                    class="card-img"
                    :src="produtc.image"
                    lazy-src="https://picsum.photos/id/11/100/60"
                    height="194"
                    position
                    ></v-img>

                    <v-card-text class="card-text-main">
                        <v-btn class="btn-product" flat><span>{{ produtc.name }}</span></v-btn>
                        <v-select
                            :items="items"
                            label="Solo field"
                            dense
                            solo
                        ></v-select>
                        <span class="span-price">$ {{ produtc.price }} USD</span>
                        <v-btn color="#448669" class="add-cart" @click="addProdutcCart(produtc)"><span>ADD TO CART</span></v-btn>
                        <v-btn flat class="learn-more" :to="{name: 'show-produtc', params:{id:produtc.id, name:produtc.slug}}"><span>LEARN MORE</span></v-btn>
                    </v-card-text>

                    <v-card-actions>
                    
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        </v-container>
    </div>
</template>

<script>

export default {
    data: () => ({
      items: ['One-time purchase', 'Monthly subscription - Monthly'],
    }),
    methods: {
        addProdutcCart(produtc){
            //console.log('add produtc' + produtc)
             this.$store.dispatch('addProdutcCart', produtc)
        }
    },
    computed:{
        produtcs(){
            return this.$store.state.produtcs
        },
    },
    created(){
        this.$store.dispatch('getProdutcs') // dispatch loading
    }
}

</script>