<template>
  <v-row justify="center">
    <v-dialog v-model="active" persistent max-width="600px">
      <template>
       
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="name" v-model="users.name" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" v-model="users.email" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Password*" v-model="users.password" type="password" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog()">Close</v-btn>
          <v-btn color="blue darken-1" @click="updateUser(users)" >Save</v-btn>
        </v-card-actions>
      </v-card>
      <code>{{ users }}</code>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    data () {
        return {
            
        }
    },
    methods: {
          closeDialog(){
            this.$store.dispatch('closeDialog')
          },
          updateUser(users) {
            // this.user = {
            //   id: this.users.id,
            //   name: this.users.name,
            //   email: this.users.email,
            //   password: this.users.password
            // }
            console.log('user update ' + JSON.stringify(this.users));
            this.$store.dispatch('updateUser', this.users)
          },
    },
    computed: {
        active(){
            return this.$store.getters.activeDialog
        },
        users(){
          return this.$store.getters.users
        }
    }
  }
</script>