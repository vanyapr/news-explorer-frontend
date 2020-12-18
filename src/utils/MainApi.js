import { apiUrl } from './constants.js';
import Utils from './utils';

class MainApi {
  constructor(apiUrl, Utils) {
    this.apiUrl = apiUrl;
    this._processResponse = Utils.processResponse;
    this._catchErrors = Utils.catchErrors;
  }

  // Авторизует юзера, возвращает токен в случае успеха, или ошибку в случае неудачи
  login(loginData) {
    return fetch(`${this.apiUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then(this._processResponse)
      .catch(this._catchErrors);
  }

  // Регистрирует юзера, возвращает объект юзера в случае успеха, или ошибку в случае неудачи
  register(loginData) {
    return fetch(`${this.apiUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then(this._processResponse)
      .catch(this._catchErrors);
  }

  // Принимает токен и возвращает данные пользователя, либо ошибку
  getUserData(token) {
    return fetch(`${this.apiUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(this._processResponse)
      .catch(this._catchErrors);
  }
}

// Экспортировали экземпляр класса
export default new MainApi(apiUrl, Utils);
