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
          <v-select
            item-text="cant"
            v-model="item.quantity"
            :items="cant"
            @input="changeCant(item, $event)"
          ></v-select>
          
          <!-- <v-list-item-title v-text="item.quantity"></v-list-item-title> -->
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-title>X</v-list-item-title>
        </v-list-item-content>

        <v-list-item-content>
          <v-list-item-title v-text="item.totalPrice"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon @click.prevent="removeFromCart(item)" color="#00000">mdi-trash-can</v-icon>
        </v-list-item-icon>
      </v-list-item>

      <template>
        <div class="pa-2">
          <span>Total: ${{ totalPrice }}</span>
          <v-btn to="/shop/checkout" block>Check Out</v-btn>
        </div>
        {{selected}}
      </template>

    </v-list>
    <!-- <pre>{{cart}}</pre> -->
        
</div>
</template>

<script>
export default {
    data(){
      return {
        cant:[1,2,3,4,5,6,7,8],
        selected: null
      }
    },
    methods: {
        removeFromCart(item) {
            this.$store.dispatch('removeFromCart', item);
        },
        changeCant(item, event){
          console.log(event)
          console.log(item)
          this.selected = parseInt(event)
          return this.$store.dispatch('incrementCArt', [item, event])
          
        }
    },
    computed: {
        cart(){
            return this.$store.state.cart.cart
        },
        cartCount(){
            return this.$store.state.cart.cartCount
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