<template>
  <div class="main-login">
    <v-row>
      <v-col offset-md="1" cols="12" sm="12" md="4" xs="12">
          <v-card
            class="mx-auto login-card"
            max-width="400"
            height="600"
            outlined
          >     
  
              <v-img src="https://storage.googleapis.com/wfhq_flatbelly/img/logo-pure.png"></v-img>
              <v-alert type="error" v-if="error">
                <p>{{ this.error }}</p>
              </v-alert> 
              <v-form @submit.prevent="login" method="post">
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    md="12"
                  >
                    <v-text-field
                      v-model="email"
                      label="E-mail"
                      solo
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="12">
                    <v-text-field
                      v-model="password"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min]"
                      :type="show ? 'text' : 'password'"
                      name="input-10-1"
                      label="Normal with hint text"
                      hint="At least 8 characters"
                      counter
                      solo
                      @click:append="show = !show"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-checkbox label="Keep me logged in" hide-details></v-checkbox>
                </v-row>
                <v-card-actions>
                  <v-btn type="submit" class="btn-login" block color="#2ab27b">Sign in</v-btn>
                </v-card-actions>
                <v-row justify="center">
                    <a href="#">Forgot Your Password?</a>
                </v-row>
          </v-container>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
    
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null,
      error: null,
      show: false,
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          emailMatch: () => ('The email and password you entered don\'t match'),
      },
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("retrieveToken", {
          email: this.email,
          password: this.password
        })
        .then(response => {
          this.$router.push({ name: "dashboard" });
        })
        .catch(error => {
          this.error = error.response.data.message;
          console.log(this.error);
        });
    }
  },
  
};

</script>