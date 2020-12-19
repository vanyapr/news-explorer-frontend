import { apiUrl } from './constants.js';
import Utils from './utils';

class MainApi {
  constructor(token) {
    this.apiUrl = apiUrl;
    this._processResponse = Utils.processResponse;
    this._catchErrors = Utils.catchErrors;
    this._token = token;
  }

  saveToFavorites(newsItem, token) {
    return fetch(`${this.apiUrl}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newsItem),
    })
      .then(this._processResponse)
      .catch(this._catchErrors);
  }

  getSavedNewsList() {
    return fetch(`${this.apiUrl}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._token}`,
      },
    })
      .then(this._processResponse)
      .catch(this._catchErrors);
  }
}

// Экспортировали экземпляр класса
export default MainApi;
