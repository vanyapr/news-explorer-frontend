// Класс-хелпер для обработки ошибок и ответов api
class Utils {
  // Асинхронный обработчик ответа сервера
  async processResponse(serverResponse) {
    if (serverResponse.ok) {
      // Если сервер ответил без ошибок, передали далее данные в JSON
      return serverResponse.json();
    }

    // Получает из ответа сервера текст ошибки
    const errorMessage = await serverResponse.text();
    return Promise.reject(new Error(errorMessage));
  }

  // Принимает ошибки, выводит в консоль и возвращает реджект промиса
  catchErrors(error) {
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

  // Вычисляет дату за минусом переданного числа дней
  calculateDate(offsetDays = 0) {
    // Получили текущую дату
    const date = new Date();
    // Учли разницу во времени между Россией и Англией
    // date.setHours(date.getHours() + (date.getTimezoneOffset() / 60) * -1);
    // Вычли из даты нужное число дней
    date.setDate(date.getDate() - offsetDays);
    // Вернули дату в формате ISO 8601
    return date.toISOString();
  }
}

export default new Utils();
