<template>
<div class="main-navbar">
    <v-toolbar extended flat>
    <v-app-bar-nav-icon  @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
    <v-col cols="2">
      <v-toolbar-title></v-toolbar-title>
    </v-col>
    <!-- <v-spacer></v-spacer> -->
    <v-col class="d-flex justify-space-around">
      <v-toolbar-items 
        v-for="item in items"
        :key="item.title"
        link class="hidden-sm-and-down"
      >
      <router-link :to="item.url" v-if="item.image.length > 0">
          <img :src="item.image" alt="" width="100">
      </router-link>
      
      <v-btn v-else color="#ffffff" :to="item.url">{{ item.title }}</v-btn>
      </v-toolbar-items>
    </v-col>

    <v-col cols="2" class="d-flex justify-end">
      <!-- <v-btn large @click.stop="openCart = !openCart"> -->
        <v-badge
          color="#000000"
          :content="cartCount"
        >
        </v-badge>
        <v-icon @click.stop="openCart = true" color="#000000" dark>mdi-cart</v-icon>
      <!-- </v-btn> -->
      <v-btn right to="/login" color="#448669" flat>MEMBERS LOGIN</v-btn>
    </v-col>
  </v-toolbar>
  
  <!-- Cart Items -->
  <v-navigation-drawer
      v-model="openCart"
      temporary
      absolute
      width="500"
    >
    
      <Cart></Cart>
      <v-btn block @click="openCart = false">close</v-btn>
    </v-navigation-drawer>
    <!-- End Cart Items -->
  
    <v-navigation-drawer
      v-model="drawer"
      temporary
      absolute
      width = "200"
      id = "drawer"
    >
    
    <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title else>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block>Logout</v-btn>
        </div>
      </template>
      
    </v-navigation-drawer>
</div>
</template>

<script>

import Cart from './cart'

export default {
    components: {
      Cart
    },
    data() {
    return {
      drawer: null,
      openCart: false,
      items: [
          { title: 'Products', icon: 'dashboard', url: '/', image: ''},
          { title: 'Home', icon: 'dashboard', url: '/', image: 'https://storage.googleapis.com/wfhq_purelife/redesign/images/logo.png'},
          { title: 'About', icon: 'question_answer', url: '/', image: '' }
        ],
        right: null
    };
  },

  methods: {
    menuItems() {
      return this.menu;
    }
  },
  computed: {
    cartCount(){
            return this.$store.state.cart.cartCount
    },
  }
};
</script>