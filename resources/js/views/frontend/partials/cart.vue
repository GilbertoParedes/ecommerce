<template>
<div> 
    <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link" href="">
            Cart ({{ cartCount }})
        </a>

        <div v-if="cart.length > 0" class="navbar-dropdown is-boxed is-right">
            <a v-for="item in cart"
                :key="item.id"
                class="navbar-item"
                href=""
            >
                <!--- Remove --->
                <span class="removeBtn"
                    title="Remove from cart"
                    @click.prevent="removeFromCart(item)">X</span>
                <!--- End Remove --->

                {{ item.title }} x{{ item.quantity }} - ${{ item.totalPrice }}
            </a>

            <a class="navbar-item" href="">
                Total: ${{ totalPrice }}
            </a>

            <hr class="navbar-divider">

            <a class="navbar-item" href="">
                Checkout
            </a>
        </div>

        <div v-else class="navbar-dropdown is-boxed is-right">
            <a class="navbar-item" href="">
                Cart is empty
            </a>
        </div>
    </div>
    <code>{{ cartCount }}</code>
    <pre>{{ cart }}</pre>
</div>
</template>

<script>
export default {
    methods: {
        removeFromCart(item) {
            this.$store.dispatch('removeFromCart', item);
        },
        saveCart(item){
            this.$store.dispatch('saveCart')
        }
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