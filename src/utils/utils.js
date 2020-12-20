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

  // Возвращает сегодняшнюю дату минусо (Х) дней в формате ISO 8601
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

  // Принимает дату в формате ISO 8601, возвращает дату вида "1 января 2020"
  beautifyDate(ISODate) {
    // Преобразовать дату из формата
    this._date = new Date(ISODate);
    this._year = this._date.getFullYear();
    this._mounth = this._date.getMonth();
    this._day = this._date.getDate();

    // Массив с месяцами
    this._mounthList = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    // Собираем строку с датой в шаблон
    return `${this._day} ${this._mounthList[this._mounth]} ${this._year}`;
  }

  // Принимает объект, преобразует в формат апи
  convertToApiFormat(newsItem, searchString) {
    console.log(newsItem);
    // Разобрали объект новости
    const { title, description, publishedAt, source, url, urlToImage } = newsItem;

    // Преобразуем в формат совместимый с апи
    const result = {
      keyword: searchString, // Строка поиска
      title,
      text: description,
      date: publishedAt,
      source: source.name,
      link: url,
      image: urlToImage,
    };

    console.log(result);
    return result;
  }

  // Принимает массив объектов, преобразует в формат приложения
  convertListToAppFormat(newsList) {
    return newsList.map((item) => {
      // Разобрали объект новости
      const {
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
        _id,
      } = item;

      // Преобразуем в формат совместимый с приложением
      return {
        keyword, // Строка поиска
        title,
        description: text,
        publishedAt: date,
        source: {
          name: source,
        },
        url: link,
        urlToImage: image,
        _id,
      };
    });
  }
}

export default new Utils();
