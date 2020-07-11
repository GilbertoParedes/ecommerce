import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const token = {
  state: {
    token: localStorage.getItem('access_token') || null
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    }
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null
    }
  },
  actions: {
    retrieveToken(context, credentials) {

      return new Promise((resolve, reject) => {
        axios.post('api/auth/login', {
          email: credentials.email,
          password: credentials.password,
        })
          .then(response => {
            //console.log(response)
            const token = response.data.access_token
            localStorage.setItem('access_token', token)
            context.commit('retrieveToken', token)

            resolve(response)
          })
          .catch(error => {
            //console.log(error)
            reject(error)
          })
      })

    },
    destroyToken(context) {
      
      if (context.getters.loggedIn){
        
        return new Promise((resolve, reject) => {
          axios.post('api/auth/logout/', '', {
              headers: { Authorization: "Bearer " + context.state.token }
            })
            .then(response => {
              //console.log(response)
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
  
              resolve(response)
            })
            .catch(error => {
              //console.log(error)
              localStorage.removeItem('access_token')
              context.commit('destroyToken')

              reject(error)
            })
        })

      }
    }
  }
}

const endPoints = {
  state: {
    token: localStorage.getItem('access_token') || null
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    }
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null
    }
  },
  actions: {
    retrieveToken(context, credentials) {

      return new Promise((resolve, reject) => {
        axios.post('api/auth/login', {
          email: credentials.email,
          password: credentials.password,
        })
          .then(response => {
            //console.log(response)
            const token = response.data.access_token
            localStorage.setItem('access_token', token)
            context.commit('retrieveToken', token)

            resolve(response)
          })
          .catch(error => {
            //console.log(error)
            reject(error)
          })
      })

    },
    destroyToken(context) {
      
      if (context.getters.loggedIn){
        
        return new Promise((resolve, reject) => {
          axios.post('api/auth/logout/', '', {
              headers: { Authorization: "Bearer " + context.state.token }
            })
            .then(response => {
              //console.log(response)
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
  
              resolve(response)
            })
            .catch(error => {
              //console.log(error)
              localStorage.removeItem('access_token')
              context.commit('destroyToken')

              reject(error)
            })
        })

      }
    }
  }
}

const users = {
  state: {
    token: localStorage.getItem('access_token') || null,
    users: [],
    user: [],
    clear:[],
    id: '',
    name: '',
    email: '',
    password: '',
    newTodo: '',
    dialog: null
  },
  mutations: {
  GET_USERS(state, user){
    state.users = user
  },
  GET_TODO(state, todo){
    state.newTodo =  todo
  },
  ADD_USER(state, user){
    state.name = user.name
    state.email = user.email
    state.password = user.password
    var newUser = {}
    newUser['name'] = state.name;
    newUser['email'] = state.email;
    newUser['password'] = state.password;

    return new Promise((resolve, reject) => {
      axios.post('/api/auth/users', newUser, {
          headers: { Authorization: "Bearer " + state.token },
        })
        .then(response => {
          console.log(response.data);
          
          state.users.push({
            name: response.data.name,
            email: response.data.email,
            password: response.data.password,
            id: response.data.id
            //completed: false
          })

          resolve(response)
        })
        .catch(error => {
          console.log(localStorage.getItem('access_token') || null)
          console.log(error)
        
          reject(error)
        })
    })

    /*state.users.push({
      name: state.name,
      email: state.email,
      password: state.password
      //completed: false
    })*/
  },
    EDIT_USER(state, user){
      //var users = state.users

      state.dialog = true
      state.user = user
      // state.id = user.id
      // state.name = user.name
      // state.email = user.email
      // state.password = user.password
    },
    DELETE_USER(state, user){
      return new Promise((resolve, reject) => {
        axios.delete('/api/auth/users/' + user.id,{
            headers: { Authorization: "Bearer " + state.token },
          })
          .then(response => {
            console.log(response.data)
            var user = response.data
            var users = state.users

            users.splice(users.indexOf(user), 1)
            Vue.$toast.success('User Delete.', {
              // optional options Object
            })
  
            resolve(response)
          })
          .catch(error => {
            console.log(localStorage.getItem('access_token') || null)
            console.log(error)
          
            reject(error)
          })
      })
    },
    UPDATE_USER(state, user){
      return new Promise((resolve, reject) => {
        axios.put('/api/auth/users/' + user.id, user, {
            headers: { Authorization: "Bearer " + state.token },
          })
          .then(response => {
            var userResponse = JSON.stringify(response.data)
            Vue.$toast.success('User Update.', {
              position: 'top-right',
              duration: 5000
            })
            console.log('Respuesta de usuario: ' + userResponse)
            // state.users.push({
            //   name: user.name,
            //   email:  user.email,
            //   password: user.password,
            // })
  
            resolve(response)
          })
          .catch(error => {
            console.log(localStorage.getItem('access_token') || null)
            console.log(error)
          
            reject(error)
          })
      })
      //todo.completed = !todo.completed
    },
    CLEAR_INPUTS(state){
      var clearInputs = [
        state.name = '',
        state.email= '',
        state.password = ''
      ]
      state.clear = clearInputs
    },
    CLOSE_DIALOG(state){
      state.dialog = false
    }
  },
  actions: {
    getUsers({commit}){
      return new Promise((resolve, reject) => {
        axios.get('/api/auth/users', {
            headers: { Authorization: "Bearer " + localStorage.getItem('access_token') || null }
          })
          .then(response => {
            console.log(response);
            
            commit('GET_USERS', response.data)

            resolve(response)
          })
          .catch(error => {
           
            reject(error)
          })
      })
    },
    updateUser({commit}, user){
      commit('UPDATE_USER', user)
    },
    deleteUser({commit}, user){
      commit('DELETE_USER', user)
    },

    getTodo({commit}, todo){
      commit('GET_TODO', todo)
    },
    addUser({commit}, user){
      commit('ADD_USER', user)
    },
    addTodo({commit}){
      commit('ADD_TODO')
    },
    editUser({commit}, user){
      commit('EDIT_USER', user)
    },
    
    
    clearInputs({commit}){
      commit('CLEAR_INPUTS')
    },
    closeDialog({commit}){
      commit('CLOSE_DIALOG')
    }
    
  },
  getters: {
    clearInputs: state => state.clear,
    password: state => state.password,
    todos: state => state.todos.filter((todo) => {return !todo.completed}),
    completedTodos: state => state.todos.filter((todo) => {return todo.completed}),
    activeDialog: state => state.dialog,
    users: state => state.user
  }
}

const store = new Vuex.Store({
    modules: {
      token: token,
      users: users,
    }
  })
  
  export default store