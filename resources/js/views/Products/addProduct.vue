<template>
    <v-row justify="center">
    <v-dialog v-model="modal" persistent max-width="1000px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Products</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field outlined label="name*" v-model="name"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field outlined label="slug*" v-model="generateSlug" hint="example of helper text only on focus"></v-text-field>
                <p>Slug Name: {{ this.generateSlug }}</p>
              </v-col>
              <v-col cols="12">
                <v-textarea
                outlined
                clearable
                clear-icon="cancel"
                label="Text"
                v-model="description"
                rows="3"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field outlined label="Price*" v-model="price"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  outlined
                  :items="['0', '1']"
                  label="Status*"
                  v-model="status"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
               <v-file-input
                    label="image"
                    outlined
                    prepend-icon="mdi-camera"
                    v-model="image"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeModal()">Close</v-btn>
          <v-btn color="blue darken-1" text @click="saveProduct()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            slug: '',
            description: '',
            price: '',
            image: '',
            status: '',
        }
    },
    computed: {
        modal() {
            return this.$store.state.produtcs.addModal
        },
        product(){
           let product
           return product = {
               name: this.name,
               slug: this.slug,
               description: this.description,
               price: this.price,
               image: this.image,
               status: this.status
            }
        },
        generateSlug: function() {
            return this.sanitizeName(this.name)
        }
    },
    methods: {
        /**
         * save product
         */
        saveProduct(){
            this.$store.dispatch('saveProduct', this.product)
        },
        closeModal(){
            return this.$store.dispatch('closeAddModal')
        },
        sanitizeName: function(name) {
            var slug = "";
            // Change to lower case
            var nameLower = name.toLowerCase();
            // asigne name lowercase to slug
            slug = nameLower
            // Trim the last whitespace
            slug = slug.replace(/\s*$/g, '');
            // Change whitespace to "-"
            slug = slug.replace(/\s+/g, '-');
            return slug;
        }
    },
}
</script>