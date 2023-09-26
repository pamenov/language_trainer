import axios from 'axios'
// import getCookie from "../Utils/index"

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}




class AuthApi {
    constructor (url, headers) {
      this._url = url
      this._headers = headers
    }

  
    async signin(email, password) {
      const config = {
        'headers': {
          'content-type': 'application/json',
        }
      };
      // console.log('axios signin', this._headers)
      const body = JSON.stringify({email, password})
      try {
        const response = await axios.post(`${this._url}/auth/jwt/create/`, body, config)
        return response.data
      }
      catch(error) {
        console.log(error)
      }
    }
  
    
    async signup({email, password, name, re_password}) {
      const body = JSON.stringify({email, password, name, re_password})
      console.log(email, password, re_password, name)
      console.log("BODY", body)
      const handmade_body = {
        'name': name,
        'email': email,
        'password': password,
        're_password': re_password
      }
      const csrftoken = getCookie('csrftoken');
      console.log("TOKEN", csrftoken)
 
      // const headers = {
      //   "X-CSRFToken": csrftoken,
      //   "Content-Type": "application/json"
      // };
      const config = {
        'headers': {
          // 'content-type': 'application/x-www-form-urlencoded',
          "X-CSRFToken": csrftoken,
          "Content-Type": "application/json",
          // "Content-Type": "text/javascript"
        }
      };
      try {
        const response = await axios.post(`${this._url}/auth/users/`,body , config)
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
}
  
  export default new AuthApi(process.env.API_URL || 'http://127.0.0.1:8000', { 'Content-Type': 'application/json' })
  // export default new AuthApi('http://backend', { 'Content-Type': 'application/json' })
