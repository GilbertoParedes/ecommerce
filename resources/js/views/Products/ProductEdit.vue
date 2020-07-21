<template>
    <v-row justify="center">
    <v-dialog v-model="modal" persistent max-width="1000px">
      <template>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Product Edit</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Name" v-model="product.name"  required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Slug" v-model="product.slug"  required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                    filled
                    rows="3"
                    label="Description"
                    v-model="product.description"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Price" v-model="product.price"  required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field label="Status" v-model="product.status"  required></v-text-field>
              </v-col>
              <v-col cols="12">
                 <v-img width="50" height="50" :src="product.image"></v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeModal()" >Close</v-btn>
          <v-btn color="blue darken-1" >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods: {
        closeModal(){
            this.$store.dispatch('closeModal')
        }
    },
    computed: {
        modal(){
            return this.$store.getters.activeModal
        },
        product(){
            return this.$store.state.produtcs.produtc
        },

    }
}
</script>