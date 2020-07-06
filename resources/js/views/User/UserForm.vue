<template>
  <div>
    <div id="get-todo" class="container">
      <input class="form-control"
        :value="userName"
        @change="pushUserName"
        placeholder="I need to...">
      <input class="form-control"
        :value="email"
        @change="pushEmail"
        placeholder="I need to...">
      <input class="form-control"
        :value="password"
        @change="pushPassword"
        placeholder="I need to...">
      <button class="btn btn-primary" @click="addUser">Add Todo</button>
    </div>
    <UserTable></UserTable>
    <UserEdit></UserEdit>
  </div>
</template>
<script>
    import UserTable from './UserTable.vue'
    import UserEdit from './UserEdit.vue'

    import { mapState, mapGetters } from 'vuex';

    export default {
        components: {
            UserTable,
            UserEdit
        },
        methods: {
            pushUserName(e){
              this.$store.dispatch('pushUserName', e.target.value)
            },
            pushEmail(e){
              this.$store.dispatch('pushEmail', e.target.value)
            },
            pushPassword(e){
              this.$store.dispatch('pushPassword', e.target.value)
            },
            addUser(){
              this.$store.dispatch('addUser')
              //this.$store.dispatch('clearInputs')
            },
            addTodo(){
            this.$store.dispatch('addTodo')
            this.$store.dispatch('clearTodo')
            }
        },
        computed: {
            newTodo(){
              return this.$store.getters.newTodo
            },
            userName(){
              return this.$store.getters.userName
            },
            email(){
              return this.$store.getters.email
            },
            password(){
              return this.$store.getters.password
            }

        }
    }
</script>