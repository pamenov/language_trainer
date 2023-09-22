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

    async collectionsList ({created_by_me, my_favorite}) {
      const token = localStorage.getItem("access_token")
      let config = {}
      if (token) {
        config = {
          "headers": {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            }
        }
        console.log("sending request with token", token)
      } else {
        config = {
          "headers": {
            "Content-Type": "application/json",
          }
        }
        console.log("sending request WITHOUT token")
      }
      try {
        const response = await axios.get(`${this._url}/collections/`, config)
        return response
      } catch (error) {
        console.error(error)
      }
    }

    async collectionDetails ({ id }) {
      const token = localStorage.getItem("access_token")
      let config = {}
      if (token) {
        config = {
          "headers": {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            }
        }
      } else {
        config = {
          "headers": {
            "Content-Type": "application/json",
          }
        }
      }
      const body = JSON.stringify({id})
      try {
        const response = await axios.get(`${this._url}/collections/${id}`, config)
        return response
      } catch (error) {
        console.error(error)
      }
    }

    async addToFavorites({ id }) {
      const token = localStorage.getItem("access_token")
      const config = {
        "headers": {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      }
      const body = {"collection_id": id}
      try {
        const res = await axios.post(`${this._url}/add-to-favorites/`, body, config)
        return res
      } catch (error) {
        console.error(error)
      }
    }
    
    async getWordToLearn({id}) {
      const token = localStorage.getItem("access_token")
      let config = {}
      if (token) {
        config = {
          "headers": {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            }
        }
      } else {
        config = {
          "headers": {
            "Content-Type": "application/json",
          }
        }
      }
      const body = JSON.stringify({id})
      try {
        const response = await axios.get(`${this._url}/collections/${id}/learn/`, config)
        return response
      } catch (error) {
        console.error(error)
      }
    }
  
    // addToFavorites ({ id }) {
    //   const token = localStorage.getItem('token')
    //   return fetch(
    //     `/api/recipes/${id}/favorite/`,
    //     {
    //       method: 'GET',
    //       headers: {
    //         ...this._headers,
    //         'authorization': `Token ${token}`
    //       }
    //     }
    //   ).then(this.checkResponse)
    // }
  
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
  
    // getUser ({ id }) {
    //   const token = localStorage.getItem('token')
    //   return fetch(
    //     `/api/users/${id}/`,
    //     {
    //       method: 'GET',
    //       headers: {
    //         ...this._headers,
    //         'authorization': `Token ${token}`
    //       }
    //     }
    //   ).then(this.checkResponse)
    // }
  
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
  