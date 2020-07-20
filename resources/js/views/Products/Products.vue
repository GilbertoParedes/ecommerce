<template>
    <div>
        <v-simple-table fixed-header height="300px">
            <template v-slot:default>
            <thead>
                <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Price</th>
                <th class="text-left">Actualizar</th>
                <th class="text-left">Eliminar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                <td>{{ product.name }}</td>
                <td>{{ product.price }}</td>
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
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        editProduct(product){

        },
        deleteProduct(product){

        }
    },
    computed: {
        products(){
            return this.$store.state.produtcs.produtcs
        }
    },
    created() {
        this.$store.dispatch('products')
    }
}
</script>