<template>
    <div>
        <navbar></navbar>
        <v-container>
        <v-row justify="center">
            <v-col cols="12">
                <div class="table-header"><span>ITEMS IN YOUR CART</span></div>
                <v-simple-table class="shop-table">
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">Quantity</th>
                        <th class="text-left">Product</th>
                        <th class="text-left">Unit Price</th>
                        <th class="text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in cart" :key="item.id">
                        <td>
                            <v-select
                                item-text="cant"
                                v-model="item.quantity"
                                :items="cant"
                                @input="changeCant(item, $event)"
                            ></v-select>
                        </td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.totalPrice }}</td>
                        <td>
                            <v-icon @click.prevent="removeFromCart(item)" color="#000000">mdi-trash-can</v-icon>
                        </td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12" xs="12" sm="6" md="4">
                <v-btn class="btn-pay" >Continue Shoping</v-btn>
            </v-col>
            <v-col cols="12" sx="12" sm="6" md="8">
                <v-btn class="btn-pay">Login</v-btn>
                <span>or Enter Your Information Below To Get Started </span>
            </v-col>
        </v-row>
        <v-row>
                <v-col cols="12" sm="6" md="6">
                    <v-card
                        class="chekout-cart"
                    >
                        <v-card-title class="cart-title-text">
                            BILLING INFORMATION
                        </v-card-title>
                        <v-card-text>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                    label="First Name"
                                    outlined
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                    label="Last Name"
                                    outlined
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                    label="Email address"
                                    outlined
                                    suffix="@gmail.com"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                    label="Phone Number"
                                    outlined
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                        <v-col cols="12">
                                <v-text-field
                                    label="Street Address"
                                    outlined
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-select
                                :items="items"
                                label="Country"
                                outlined
                                ></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-select
                                :items="items"
                                label="State"
                                outlined
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                    label="City"
                                    outlined
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                    label="Zip Code"
                                    outlined
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-card
                        class="chekout-cart"
                    >
                        <v-card-title class="cart-title-text">
                            BILLING INFORMATION
                        </v-card-title>
                        <v-card-text>
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field
                                    label="Coupon"
                                    outlined
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-btn class="btn-coupon" large block height="55" >Apply<v-icon>car-engine-start</v-icon></v-btn>
                            </v-col>
                        </v-row>
                        <div class="pay-section">
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-img src="https://storage.googleapis.com/wfs/images/cc.png"></v-img>
                            </v-col>
                        </v-row>
                        <v-row>
                        <v-col cols="12">
                                <v-text-field
                                    label="Credit Card Number"
                                    outlined
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" sm="4" md="4">
                                <v-text-field
                                    label="Exp. Date"
                                    outlined
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4" md="4">
                                <v-text-field
                                    label="CVC"
                                    outlined
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="4" md="4">
                                <v-text-field
                                    label="Zip Code"
                                    outlined
                                ></v-text-field>
                            </v-col>
                        </v-row>
                            <v-btn block large class="btn-pay" >PAY<span>$373.90 USD</span></v-btn>
                        </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import navbar from '../partials/navbar'

export default {
    components: { navbar },
    data() {
        return {
            cant:[1,2,3,4,5,6,7,8],
        }
    },
    methods: {
        removeFromCart(item) {
            this.$store.dispatch('removeFromCart', item);
        },
        changeCant(item, event){
          return this.$store.dispatch('incrementCArt', [item, event])
        }
    },
    computed:  {
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