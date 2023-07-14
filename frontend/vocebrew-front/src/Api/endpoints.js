import axios from 'axios'

class Api {
    constructor (url, headers) {
      this._url = url
      this._headers = headers
    }
  
    checkResponse (res) {
      return new Promise((resolve, reject) => {
        // console.log(res.data, res)
        if (res.status === 204) {
          return resolve(res)
        }
        const func = res.status < 400 ? resolve : reject
        // console.log(res.json())
        // res.then((data) => console.log(data))
        res.json().then(data => func(data))
      })
    }


    async signin(email, password) {
      const config = {
        'headers': {
          'content-type': 'application/json',
        }
      };
      console.log('axios signin', this._headers)
      const body = JSON.stringify(email, password)
      try {
        const response = await axios.post(`${this._url}/auth/jwt/create/`, body, config)
        return response.data
      }
      catch(error) {
        console.log(error)
      }
    }
  
    
    async signup({email, password, name, re_password}) {
      const body = JSON.stringify(email, password, name, re_password)
      try {
        const response = await axios.put(`${this._url}/auth/users/`, body, {"Content-Type": "application/json"})
        return response.data
      } catch(error) {
        console.log(error)
      }
    }
    
    async reset_password(email) {
      const body = {"email": email}
      try {
        const response = await axios.post(
          `${this._url}/auth/users/reset_password/`,
          body,
          this._headers
        )
        return response.data
      } catch(error) {
        console.error(error)
      }
    }
    
    async confirm_reset_password({uid, token, new_password, re_new_password}) {
      const body = JSON.stringify({uid, token, new_password, re_new_password})
      const config = {
        "headers" : {
          "Content-Type": "application/json"
        }
      }
      try {
        const response = await axios.post(
          `${this._url}/auth/users/reset_password_confirm/`,
          body,
          config
        )
        return response.data
      } catch(error) {
        console.error(error)
      }
    }
    
    async refresh_token() {
      const token = localStorage.getItem('refresh_token')
      const body = {'refresh': `${token}`}
      try {
        const res = await axios.post(`${this._url}/auth/jwt/refresh/`, body, this._headers)
        return res
      } catch(error) {
        console.error(error)
      }
    }


    async load_user() {
      const token = localStorage.getItem('access_token')
      const config = {
        "headers" : {
          "Content-Type": "application/json",
          "Authorization": `JWT ${token}`,
          "Accept": "application/json"
        }
      }
      try {
        const response = await axios.get(`${this._url}/auth/users/me/`, config)
        return response.data
      } catch(error) {
        console.error(error)
      }
    }
  

    async changePassword({new_password, re_new_password, current_password}) {
      const token = localStorage.getItem('access_token')
      const config = {
        "headers" : {
          "Content-Type": "application/json",
          "Authorization": `JWT ${token}`,
          "Accept": "application/json"
        }
      }
      console.log(new_password, re_new_password, current_password)
      const body = JSON.stringify({new_password, re_new_password, current_password})
      try {
        const response = await axios.post(`${this._url}/auth/users/set_password/`, body, config)
        return response
      } catch(error) {
        console.log(error)
      }
    }


    // changePassword ({ current_password, new_password }) {
    //   const token = localStorage.getItem('access_token')
    //   return fetch(
    //     `/api/users/set_password/`,
    //     {
    //       method: 'POST',
    //       headers: {
    //         ...this._headers,
    //         'authorization': `Token ${token}`
    //       },
    //       body: JSON.stringify({ current_password, new_password })
    //     }
    //   ).then(this.checkResponse)
    // }
  
    addToFavorites ({ id }) {
      const token = localStorage.getItem('token')
      return fetch(
        `/api/recipes/${id}/favorite/`,
        {
          method: 'GET',
          headers: {
            ...this._headers,
            'authorization': `Token ${token}`
          }
        }
      ).then(this.checkResponse)
    }
  
    removeFromFavorites ({ id }) {
      const token = localStorage.getItem('token')
      return fetch(
        `/api/recipes/${id}/favorite/`,
        {
          method: 'DELETE',
          headers: {
            ...this._headers,
            'authorization': `Token ${token}`
          }
        }
      ).then(this.checkResponse)
    }
  
    getUser ({ id }) {
      const token = localStorage.getItem('token')
      return fetch(
        `/api/users/${id}/`,
        {
          method: 'GET',
          headers: {
            ...this._headers,
            'authorization': `Token ${token}`
          }
        }
      ).then(this.checkResponse)
    }
  
    getUsers ({
      page = 1,
      limit = 6
    }) {
      const token = localStorage.getItem('token')
      return fetch(
        `/api/users/?page=${page}&limit=${limit}`,
        {
          method: 'GET',
          headers: {
            ...this._headers,
            'authorization': `Token ${token}`
          }
        }
      ).then(this.checkResponse)
    }
  
    // subscriptions
  
    getSubscriptions ({
      page, 
      limit = 6,
      recipes_limit = 3
    }) {
      const token = localStorage.getItem('token')
      return fetch(
        `/api/users/subscriptions/?page=${page}&limit=${limit}&recipes_limit=${recipes_limit}`,
        {
          method: 'GET',
          headers: {
            ...this._headers,
            'authorization': `Token ${token}`
          }
        }
      ).then(this.checkResponse)
    }
  
    deleteSubscriptions ({
      author_id
    }) {
      const token = localStorage.getItem('token')
      return fetch(
        `/api/users/${author_id}/subscribe/`,
        {
          method: 'DELETE',
          headers: {
            ...this._headers,
            'authorization': `Token ${token}`
          }
        }
      ).then(this.checkResponse)
    }
  
    subscribe ({
      author_id
    }) {
      const token = localStorage.getItem('token')
      return fetch(
        `/api/users/${author_id}/subscribe/`,
        {
          method: 'GET',
          headers: {
            ...this._headers,
            'authorization': `Token ${token}`
          }
        }
      ).then(this.checkResponse)
    }
  
    // ingredients
    getIngredients ({ name }) {
      const token = localStorage.getItem('token')
      return fetch(
        `/api/ingredients/?name=${name}`,
        {
          method: 'GET',
          headers: {
            ...this._headers
          }
        }
      ).then(this.checkResponse)
    }
  
    // tags
    getTags () {
      const token = localStorage.getItem('token')
      return fetch(
        `/api/tags/`,
        {
          method: 'GET',
          headers: {
            ...this._headers
          }
        }
      ).then(this.checkResponse)
    }
  
  
    addToOrders ({ id }) {
      const token = localStorage.getItem('token')
      return fetch(
        `/api/recipes/${id}/shopping_cart/`,
        {
          method: 'GET',
          headers: {
            ...this._headers,
            'authorization': `Token ${token}`
          }
        }
      ).then(this.checkResponse)
    }
  
    removeFromOrders ({ id }) {
      const token = localStorage.getItem('token')
      return fetch(
        `/api/recipes/${id}/shopping_cart/`,
        {
          method: 'DELETE',
          headers: {
            ...this._headers,
            'authorization': `Token ${token}`
          }
        }
      ).then(this.checkResponse)
    }
  
    deleteRecipe ({ recipe_id }) {
      const token = localStorage.getItem('token')
      return fetch(
        `/api/recipes/${recipe_id}/`,
        {
          method: 'DELETE',
          headers: {
            ...this._headers,
            'authorization': `Token ${token}`
          }
        }
      ).then(this.checkResponse)
    }
  }
  
  export default new Api(process.env.API_URL || 'http://127.0.0.1:8000', { 'Content-Type': 'application/json' })
  