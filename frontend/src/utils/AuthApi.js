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
        credentials: 'include',
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
        credentials: 'include',
        headers: this._headers,
        body: JSON.stringify({
            password,
            email
        })
      })
    }
  
    validateUserData(jwt){
      return this._request(`${this._url}/users/me`, {
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${jwt}`
        }
      })
    }
  }

const authApi = new AuthApi({
    url: "https://api.rekunir.frontend.nomoredomains.rocks",
    headers: {
      'Content-Type': 'application/json',
    }
  });
export default authApi;