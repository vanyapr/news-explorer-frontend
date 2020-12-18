import React from 'react';
import './SearchForm.css';

class SearchForm extends React.Component {
  handleFormSubmit = (event) => {
    event.preventDefault();
    // Получили значение инпута при сабмите
    const searchString = event.target.searchString.value;
    // Передали в обработчик снаружи
    this.props.handleSearchSubmit(searchString);
  }

  render() {
    return (
      <section className='search-form'>
        <div className="search-form__container">
          <h1 className="search-form__heading">Что творится в&nbsp;мире?</h1>
          <p className="search-form__description">Находите самые свежие статьи на любую тему и сохраняйте в&nbsp;своём личном кабинете.</p>
          <form onSubmit={this.handleFormSubmit} className="search-form__form">
            <input name='searchString' type="text" className="search-form__input" placeholder='Введите тему новости' required={true}/>
            <button className="search-form__button">Искать</button>
          </form>
        </div>
      </section>
    );
  }
}

export default SearchForm;
