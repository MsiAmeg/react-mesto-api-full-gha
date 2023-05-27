class AuthApi {
    constructor(config){
      this._url = config.url;
      this._headers = config.headers;
    }

    _request(url, options) {
      return fetch(url, options).then(this._renderResponse)
    }
  
    _renderResponse(res) {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    registration(password, email) {
      return this._request(`${this._url}/signup`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
            password,
            email
        })
      })
    }
  
    signIn(password, email){
      return this._request(`${this._url}/signin`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
            password,
            email
        })
      })
    }
  
    validateUserData(jwt){
      return this._request(`${this._url}/users/me`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${jwt}`
        }
      })
    }
  }

const authApi = new AuthApi({
    url: "https://auth.nomoreparties.co",
    headers: {
      'Content-Type': 'application/json'
    }
  });
export default authApi;