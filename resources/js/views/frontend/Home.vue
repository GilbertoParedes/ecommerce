<template>
    <div>
        <Navbar></Navbar>
        <v-row>
            <v-img src="https://picsum.photos/510/300?random" max-width="100%" max-height="300px" aspect-ratio="2"></v-img>
        </v-row>
        <v-row>
            <div class="img-description">
                <span class="span-display-offer">FREE SHIPPING ON ORDERS OVER $100</span>
            </div>
        </v-row> 
        <Card></Card>
    </div>
</template>

<script>


import Navbar from './partials/navbar.vue'
import Card from './partials/cards'

export default {
  components: {
      Navbar,
      Card,
  }
};
</script>