<template>
    <div>
        <Navbar></Navbar>
        <v-row>
            <div class="img-description">
                <span class="span-display-offer">FREE SHIPPING ON ORDERS OVER $100</span>
            </div>
        </v-row> 
        <v-container>
            <v-row>
                <v-col cols="12" xs="12" sm="6" md="4">
                    <v-img
                    :src="produtc.image"
                    height="500"
                    position
                    ></v-img>
                </v-col>
                <v-col 
                    offset-md="1"
                    cols="12"
                    xs="12"
                    sm="6"
                    md="7"
                >
                    <h1>{{ produtc.name }}</h1>
                     <v-rating color="#ffff00" v-model="rating"></v-rating>
                     <v-row>
                        <v-col cols="12" sm="4" md="4">
                            <span class="span-price" v-bind:class="{ 'span-price-offert': active == 1 }">$ {{ produtc.price }} <span class="curren">USD</span></span>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" v-if="active == 1">
                            <span class="span-price">$ {{ produtc.price }} <span class="curren">USD</span> - Monthly</span>
                        </v-col>
                     </v-row>
                     <v-radio-group>                  
                        <v-radio-group v-model="active">
                            <v-row>
                            <v-col cols="12" sm="4" md="4">  
                                <v-radio label="One-time purchase" value="0"></v-radio>
                            </v-col>
                            <v-col cols="12" sm="4" md="4">  
                                <v-radio label="Monthly subscription" value="1"></v-radio>
                            </v-col>
                            </v-row>
                        </v-radio-group>
                    </v-radio-group>
                    <v-row>
                        <v-col cols="12" sm="3" md="3">
                            <span>Cant</span>
                            <v-select
                            :items="items"
                            filled
                            ></v-select>
                        </v-col>
                        <v-col offset-md="3" cols="12" sm="6" md="6">
                            <p class="buy-more">BUY MORE, SAVE MORE</p>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <v-btn block color="#448669">ADD TO CART</v-btn>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-btn block flat class="btn-check-out">CHECK OUT</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>

import Navbar from './partials/navbar.vue'

export default {
    components: {
        Navbar
    },
    data () {
        return {
            produtcId: this.$route.params.id,
            rating: 5,
            items: [1,2,3,4,5],
            active: null
        }
    },
    methods:{

    },
    computed: {
        produtc(){
            return this.$store.state.produtcs.produtc
        }
    },
    created() {
        this.$store.dispatch('showProdutc', this.produtcId) // dispatch loading
    }
}
</script>