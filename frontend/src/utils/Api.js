class Api {
    constructor(config){
      this._url = config.url;
      this._headers = config.headers;
      this._cohort = config.cohort;
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
  
    getInitialCards() {
      return this._request(`${this._url}/cards`, {
        headers: this._headers
      })
    }
  
    setCard({name, link}){
      return this._request(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name,
          link
        })
      })
    }
  
    deleteCard(cardId){
      return this._request(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
    }
  
    getUserData(){
      return this._request(`${this._url}/users/me`, {
        headers: this._headers
      })
    }
  
    setUserData({name, about}){
      return this._request(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name,
          about
        })
      })
    }
  
    setUserAvatar({avatar}){
      return this._request(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar
        })
      })
    }
  
    toggleLike(cardId, isLiked){
      return this._request(`${this._url}/cards/${cardId}/likes`, {
        method: isLiked ? 'DELETE' : 'PUT',
        headers: this._headers
      })
    }
  }

const api = new Api({
    url: "https://api.rekunir.frontend.nomoredomains.rocks",
    headers: {
      authorization: "c0e56340-d4b4-40f3-996d-780e6ca9c44e",
      'Content-Type': 'application/json',
      credentials: 'include',
      cookies: document.cookie.jwt,
    },
    cohort: "cohort-60"
  });
export default api;