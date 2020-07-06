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
    todos: [],
    users: [],
    userName: '',
    email: '',
    password: '',
    newTodo: '',
    dialog: null
  },
  mutations: {
  PUSH_USER_NAME(state, user){
    state.userName = user
  },
  PUSH_EMAIL(state, email){
    state.email = email
  },
  PUSH_PASSWORD(state, password){
    state.password = password
  },
  GET_USERS(state, user){
    state.users = user
  },
  GET_TODO(state, todo){
    state.newTodo =  todo
  },
  ADD_USER(state){
    state.users.push({
      name: state.userName,
      email: state.email,
      password: state.password
      //completed: false
    })
  },
  ADD_TODO(state){
    state.todos.push({
      body: state.newTodo,
      completed: false
    })
  },
    EDIT_USER(state, user){
      var users = state.users
      state.dialog = true
      users.splice(users.indexOf(user), 1)
      state.users = users
      state.userName = user.name
      //console.log(state.userName);
    },
    REMOVE_TODO(state, todo){
      var todos = state.todos
      todos.splice(todos.indexOf(todo), 1)
      
    },
    COMPLETE_TODO(state, todo){
      todo.completed = !todo.completed
    },
    CLEAR_TODO(state){
      state.newTodo = ''
    },
    CLOSE_DIALOG(state){
      state.dialog = false
    }
  },
  actions: {
    pushUserName({commit}, user){
      commit('PUSH_USER_NAME', user)
    },
    pushEmail({commit}, email){
      commit('PUSH_EMAIL', email)
    },
    pushPassword({commit}, password){
      commit('PUSH_PASSWORD', password)
    },
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
            console.log(localStorage.getItem('access_token') || null)
            console.log(error)
            

            reject(error)
          })
      })
    },
    getTodo({commit}, todo){
      commit('GET_TODO', todo)
    },
    addUser({commit}){
      commit('ADD_USER')
    },
    addTodo({commit}){
      commit('ADD_TODO')
    },
    editUser({commit}, user){
      commit('EDIT_USER', user)
    },
    removeTodo({commit}, todo){
      commit('REMOVE_TODO', todo)
    },
    completeTodo({commit}, todo){
      commit('COMPLETE_TODO', todo)
    },
    clearTodo({commit}){
      commit('CLEAR_TODO')
    },
    closeDialog({commit}){
      commit('CLOSE_DIALOG')
    }
    
  },
  getters: {
    newTodo: state => state.newTodo,
    userName: state => state.userName,
    email: state => state.email,
    password: state => state.password,
    todos: state => state.todos.filter((todo) => {return !todo.completed}),
    completedTodos: state => state.todos.filter((todo) => {return todo.completed}),
    activeDialog: state => state.dialog
  }
}

const store = new Vuex.Store({
    modules: {
      token: token,
      users: users,
    }
  })
  
  export default store