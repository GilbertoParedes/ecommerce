<template>
<div> 
    <!-- <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link" href="">
            Cart ({{ cartCount }})
        </a> -->


    <v-list subheader>  
      <v-subheader>Cart Shop</v-subheader>

      <v-list-item
        v-for="item in cart"
        :key="item.id"
        
      >
        <v-list-item-avatar>
          <v-img :src="item.image"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-title v-text="item.quantity"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-title>X</v-list-item-title>
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-title v-text="item.totalPrice"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
        <v-btn class="mx-1" @click.prevent="removeFromCart(item)" fab small>
          <v-icon color="#ff0000">mdi-trash-can</v-icon>
        </v-btn>
        </v-list-item-icon>
      </v-list-item>

      <template>
        <div class="pa-2">
          <v-btn block>Total: ${{ totalPrice }}</v-btn>
        </div>
      </template>

    </v-list>
    <!-- <pre>{{cart}}</pre> -->
        
</div>
</template>

<script>
export default {
    methods: {
        removeFromCart(item) {
            this.$store.dispatch('removeFromCart', item);
        },
    },
    computed: {
        cart(){
            return this.$store.state.produtcs.cart
        },
        cartCount(){
            return this.$store.state.produtcs.cartCount
        },
        totalPrice(){
            let total = 0;

            for (let item of this.cart){
                total += item.totalPrice
            }

            return total.toFixed(2)
        }
    }
}
</script>

<style>
.removeBtn {
    margin-right: 1rem;
    color: red;
}
</style>