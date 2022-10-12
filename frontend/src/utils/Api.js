const onError = res => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

class Api {
  constructor({baseUrl, headers}) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _getHeaders() {
    const jwt = localStorage.getItem('jwt');
    return {
      'Authorization': `Bearer ${jwt}`,
      ...this._headers,
    };
  }

  // получаем карточки с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._getHeaders()
    })
      .then(onError);
  }

  // получаем данные о пользователе с сервера
  getUserInfo() {  
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._getHeaders()
    })
      .then(onError);
  }

  // если оба промиса зарезолвены - верни массив этих промисов
  getAllNeededData() { 
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
  }

  // записываем данные пользователя на сервер
  setUserInfoApi(info) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: info.name,
        about: info.about
      })
    })
    .then(onError)
  }

  // добавляем карточку на сервер
  addUserCard(data) { 
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(onError);
  }

  // записываем аватарку на сервер
  handleUserAvatar(input) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: input.avatar
      })
    })
    .then(onError)
  }

  // отправляем лайк на сервер
  setLike(data) { 
    return fetch(`${this._url}/cards/${data._id}/likes`, {
      method: 'PUT',
      headers: this._getHeaders()
    })
      .then(onError);
  }

  // убираем лайк с сервера
  deleteLike(data) { 
    return fetch(`${this._url}/cards/${data._id}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders()
    })
      .then(onError);
  }

  // удаление карточки
  deleteCard(data) {
    return fetch(`${this._url}/cards/${data._id}`, {
      method: 'DELETE',
      headers: this._getHeaders()
    })
      .then(onError);
  }
}

const api = new Api({
  baseUrl: 'https://api.td-diana.nomoredomains.icu',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;