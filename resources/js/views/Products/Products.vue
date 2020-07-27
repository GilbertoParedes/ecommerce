<template>
    <div>
    <v-row>
        <v-btn color="blue" @click="addModal()" block>Add Product</v-btn>
    </v-row>
    <v-row>
        <v-simple-table fixed-header height="300px">
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Description</th>
                <th class="text-left">Price</th>
                <th class="text-left">image</th>
                <th class="text-left">Status</th>
                <th class="text-left">Actualizar</th>
                <th class="text-left">Eliminar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                <td>{{ product.name }}</td>
                <td>{{ product.description }}</td>
                <td>{{ product.price }}</td>
                <td>
                    <v-img width="50" height="50" :src="product.image"></v-img>
                </td>
                <td>{{ product.status }}</td>
                <td>
                    <v-btn class="mx-1"  @click="editProduct(product)" fab small color="#4fa7ff">
                    <v-icon color="#ffffff">mdi-pencil</v-icon>
                    </v-btn>
                </td>
                <td>
                    <v-btn class="mx-1" @click="deleteProduct(product)" fab small color="#ff0000">
                    <v-icon color="#ffffff" dark>mdi-trash-can</v-icon>
                    </v-btn>
                </td>
                </tr>
            </tbody>
            </template>
        </v-simple-table>
    </v-row>
        <AddProduct></AddProduct>
        <ProductEdit></ProductEdit>
    </div>
</template>

<script>
import ProductEdit from './ProductEdit.vue'
import AddProduct from './addProduct.vue'

export default {
    components: {
        ProductEdit,
        AddProduct,
    },
    data() {
        return {
            
        }
    },
    methods: {
        addModal(){
            this.$store.dispatch('addModal')
        },
        editProduct(product){
            console.log('edit product' + product)
            this.$store.dispatch('editProduct', product)
        },
        deleteProduct(product){

        }
    },
    computed: {
        products(){
            return this.$store.state.produtcs.produtcs
        },
        
    },
    created() {
        this.$store.dispatch('products')
    }
}
</script>