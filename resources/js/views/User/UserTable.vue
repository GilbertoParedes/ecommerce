<template>

<div id="current-todos" class="container">
  <v-simple-table fixed-header height="300px">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Email</th>
          <th class="text-left">Actualizar</th>
          <th class="text-left">Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users.users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <v-btn class="mx-1"  @click="edit(user)" fab small color="#4fa7ff">
              <v-icon color="#ffffff">mdi-pencil</v-icon>
            </v-btn>
          </td>
          <td>
            <v-btn class="mx-1" fab small color="#ff0000">
              <v-icon color="#ffffff" dark>mdi-trash-can</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  
    <!--<h3 v-if="todos.length > 0">Current({{todos.length}})</h3>
    <ul class="list-group">
      <li class="list-group-user" v-for="todo in todos">
        {{todo.body}}
        <div class="btn-group">
          <button type="button" @click="edit(todo)" class="btn btn-default btn-sm">
            <span class="glyphicon glyphicon-edit"></span> Edit
          </button>
          <button type="button" @click="complete(todo)" class="btn btn-default btn-sm">
            <span class="glyphicon glyphicon-ok-circle"></span> Complete
          </button>
          <button type="button" @click="remove(todo)" class="btn btn-default btn-sm">
            <span class="glyphicon glyphicon-remove-circle"></span> Remove
          </button>
        </div>
      </li>
    </ul> -->
    <!--<code>{{ users.users }}</code>-->
  </div>
</template>
<script>
  
    export default {
        data() {
          return {
            activate: false
          }
        },
        methods: {
            edit(user){
            this.$store.dispatch('editUser', user)
            //console.log("click edit" + user)
            },
            complete(todo){
            this.$store.dispatch('completeTodo', todo)
            },
            remove(todo){
            this.$store.dispatch('removeTodo', todo)
            },
        },
        computed: 
        {
            users(){
                return this.$store.state.users
            }
            
        },
        created() {
            //console.log(this.$store)
            this.$store.dispatch('getUsers') // dispatch loading
        }
    }
</script>