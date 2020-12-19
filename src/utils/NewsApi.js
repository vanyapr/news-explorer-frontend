import { newsApiUrl, newsApiKey, newsApiYandexUrl } from './constants.js';
import Utils from './utils';

class NewsApi {
  constructor(newsApiUrl, newsApiKey, Utils, daysBefore = 7) {
    this._newsApiUrl = newsApiUrl;
    this._newsApiKey = newsApiKey;
    this._processResponse = Utils.processResponse;
    this._catchErrors = Utils.catchErrors;
    this._calculateDate = Utils.calculateDate;
    this._pageSize = 100;
    this._daysBefore = daysBefore;
  }

  // Возвращает объект с новостями в случае успеха либо реджект с ошибкой
  getNewsBySearchString(searchString) {
    // Вычислили необходимый диапазон дат
    this._fromDate = this._calculateDate();
    this._toDate = this._calculateDate(this._daysBefore);
    // Запросили данные
    return fetch(`${this._newsApiUrl}everything?q=${searchString}&from=${this._fromDate}&to=${this._toDate}&pageSize=${this._pageSize}&apiKey=${this._newsApiKey}`, {
      method: 'GET',
    })
      .then(this._processResponse)
      .catch(this._catchErrors);
  }
}

// Экспортировали экземпляр класса
export default new NewsApi(newsApiYandexUrl, newsApiKey, Utils);
