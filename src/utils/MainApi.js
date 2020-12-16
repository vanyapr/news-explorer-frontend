const apiUrl = 'https://api.vanyapr.students.nomoreparties.space';

class MainApi {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    // this.token = token;
  }

  // Обработчик ответа сервера?
  _processResponse(serverResponse) {
    if (serverResponse.ok) {
      // Если сервер ответил без ошибок, передали далее данные в JSON
      return serverResponse.json();
    }

    // Иначе вернули ошибку, которая попадёт в catch
    return Promise.reject(new Error(`Ошибка: ${serverResponse.status}`));
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
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new MainApi(apiUrl);
