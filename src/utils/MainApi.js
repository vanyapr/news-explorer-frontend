const apiUrl = 'https://api.vanyapr.students.nomoreparties.space';

class MainApi {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  // Асинхронный обработчик ответа сервера
  async _processResponse(serverResponse) {
    if (serverResponse.ok) {
      // Если сервер ответил без ошибок, передали далее данные в JSON
      return serverResponse.json();
    }

    // Получает из ответа сервера текст ошибки
    const errorMessage = await serverResponse.text();
    return Promise.reject(new Error(errorMessage));
  }

  _catchErrors(error) {
    // Вывели ошибку в консоль
    console.log(error.message);
    // Отловили ошибку соединения с сервером
    if (error instanceof TypeError) {
      const networkError = { message: 'Ошибка соединения с сервером' };
      return Promise.reject(new Error(JSON.stringify(networkError)));
    }
    // Вернули реджект с текстом ответа сервера, если ошибка с текстом
    return Promise.reject(new Error(error.message));
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
}

export default new MainApi(apiUrl);
