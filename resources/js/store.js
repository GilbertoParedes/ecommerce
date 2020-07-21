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

let cart = window.localStorage.getItem('cart');
let cartCount = window.localStorage.getItem('cartCount');


const  produtcs = {
    state: {
      produtcs: [],
      produtc: [],
      cart: cart ? JSON.parse(cart) : [],
      cartCount: cartCount ? parseInt(cartCount) : 0,
      produtcCart: [],
      modal: null
    },
    mutations: {
      PRODUCTS(state, products){
        state.produtcs = products
      },
      EDIT_PRODUCT(state, product){
        state.modal = true
        state.produtc = product
      },
      CLOSE_MODAL(state){
        state.modal = false
      },
      SAVE_CART(state) {
        window.localStorage.setItem('cart', JSON.stringify(state.cart));
        window.localStorage.setItem('cartCount', state.cartCount);
      },
      INCREMENT_CART(state, [item, cant]){
        let found = state.cart.find(product => product.id == item.id)
        found.quantity = cant
        found.totalPrice = found.quantity * found.price

        
        this.commit("SAVE_CART")
      },
      ADD_TO_CART(state, item){
        let found = state.cart.find(product => product.id == item.id)

        if(found){
          found.quantity++
          found.totalPrice = found.quantity * found.price
        }else{
          state.cart.push(item)

          Vue.set(item, 'quantity', 1)
          Vue.set(item, 'totalPrice', item.price)
        }

        state.cartCount++
        
        this.commit("SAVE_CART")
    
        //console.log(item.name)
      },
      REMOVE_CART(state, item){
        let index = state.cart.indexOf(item);

        if(index > -1){
          let product = state.cart[index]
          state.cartCount -= product.quantity
          state.cart.splice(index, 1)
        }

        this.commit("SAVE_CART")
      },
      GET_PRODUTC(state, produtcs){
        state.produtcs = produtcs
      },
      SHOW_PRODUTC(state, produtc){
        state.produtc = produtc
        
      },
    },
    actions: {
      products({commit}){
        return new Promise((resolve, reject) => {
          axios.get('/products', {
              
            })
            .then(response => {
              console.log(response);
              let products = response.data
              commit('PRODUCTS', products)
  
              resolve(response)
            })
            .catch(error => {
             
              reject(error)
            })
        })
      },
      editProduct({commit}, product){
        commit('EDIT_PRODUCT', product)
      },
      closeModal({commit}){
        commit('CLOSE_MODAL')
      },
      getProdutcs({commit}){
        return new Promise((resolve, reject) => {
          axios.get('/products', {
              
            })
            .then(response => {
              console.log(response);
              var produtcs = response.data
              commit('GET_PRODUTC', produtcs)
  
              resolve(response)
            })
            .catch(error => {
             
              reject(error)
            })
        })
      },
      showProdutc({commit}, id){
          return new Promise((resolve, reject) => {
            axios.get('/products/' + id, {
                
              })
              .then(response => {
                console.log(response);
                var produtc = response.data
                console.log(JSON.stringify(produtc))
                commit('SHOW_PRODUTC', produtc)
    
                resolve(response)
              })
              .catch(error => {
               
                reject(error)
              })
          })
      },
      incrementCArt({commit}, [item, cant]){
        commit('INCREMENT_CART', [item, cant])
      },
      addProdutcCart({commit}, item){
          commit('ADD_TO_CART', item)
      },
      removeFromCart({commit}, item){
          commit("REMOVE_CART", item)
      },
      saveCart({commit}){
          commit("SAVE_CART")
      }
    },
    getters: {
      activeModal: state => state.modal,
    }

}

const store = new Vuex.Store({
    modules: {
      token: token,
      users: users,
      produtcs: produtcs,
    }
  })
  
  export default store