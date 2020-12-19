import React from 'react';
import './RegisterPopup.css';
import Popup from '../Popup/Popup';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

class RegisterPopup extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailValid: false,
      emailError: '',
      password: '',
      passwordError: '',
      passwordValid: false,
      name: '',
      nameValid: '',
      nameError: '',
      formError: '', // Ошибка формы по умолчанию пустая
    };
  }

  handleSubmit = () => {
    // Передали данные из состояния во внешнюю функцию
    this.props.onSubmit({
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
    })
      .then((success) => {
        // Если всё в порядке, промис разрешится и мы скроем ошибку формы
        // а также сбросим значения полей на пустые
        this.setState({
          formError: '',
          email: '',
          password: '',
          name: '',
        });
      })
      .catch((error) => {
        // Преобразовали полученную ошибку в объект
        const errorText = JSON.parse(error.message);
        // Рендерим ошибку в форме
        this.setState({
          formError: errorText.message,
        });
      });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    // При каждлом апдейте компонента мы валидируем инпуты,
    // И в случае ошибок валидации рендерим ошибку
    this.setState({
      [name]: value,
    }, () => this._validateForm());
    // Запускаем валидацию в коллбэке, чтобы она выполнялась
    // после записи значений в стейт
  }

  // Не буду усложнять и напишу простой валидатор для каждого поля
  // потому что сложный валидатор слишком заморочен для этой ситуации
  _validateEmail = () => {
    if (this.state.email.length > 0) {
      // Регулярное выражение для проверки имейла
      const emailRegExp = /^[a-z0-9\-\.]+@[a-z0-9\-\.]+\.[a-z]{2,}/;
      if (!this.state.email.match(emailRegExp)) {
        this.setState({
          emailValid: false,
          emailError: 'Введите корректный email',
        });
      } else {
        // Если имейл введён
        this.setState({
          emailError: '',
          emailValid: true,
        });
      }
    } else {
      // Если имейл не введён
      this.setState({
        emailValid: false,
        emailError: 'Обязательно укажите email',
      });
    }
  }

  _validatePassword = () => {
    if (this.state.password.length > 0) {
      // Если пароль не пустой
      // Получим удовольствие (и вызовем баттхёрт юзера),
      // потребуем, чтобы пароль содержал буквы и цифры
      const passwordRegExp = /^[a-z0-9]+$/;
      if (!this.state.password.match(passwordRegExp)) {
        this.setState({
          passwordValid: false,
          passwordError: 'Пароль должен содержать только буквы и цифры',
        });
      } else if (this.state.password.length < 5) {
        this.setState({
          passwordValid: false,
          passwordError: 'Пароль должен быть длиннее 5 символов',
        });
      } else {
        this.setState({
          passwordValid: true,
          passwordError: '',
        });
      }
    } else {
      this.setState({
        passwordValid: false,
        passwordError: 'Обязательно укажите пароль',
      });
    }
  }

  _validateName = () => {
    if (this.state.name.length > 0) {
      if (this.state.name.length > 2) {
        this.setState({
          nameValid: true,
          nameError: '',
        });
      } else {
        this.setState({
          nameValid: false,
          nameError: 'Имя должно быть длиннее 2 букв',
        });
      }
    } else {
      this.setState({
        nameValid: false,
        nameError: 'Введите своё имя',
      });
    }
  }

  _validateForm = () => {
    this._validateEmail();
    this._validatePassword();
    this._validateName();
  }

  render() {
    return (
      <>
        <Popup
          isOpened={this.props.isRegisterPopupOpened}
          close={this.props.close}
          title='Регистрация'
          children={
            <PopupWithForm
              changePopup={this.props.changePopup}
              buttonText='Зарегистрироваться'
              alternative='Войти'
              buttonEnabled={this.state.emailValid && this.state.passwordValid && this.state.nameValid}
              onSubmit={this.handleSubmit}
              formError={this.state.formError}
              children={
                <>
                  <div className="form__input-container" >
                    <label htmlFor="email" className="form__input-label">Email</label>
                    <input value={this.state.email} onChange={this.handleChange} type='email' name='email' id="email" placeholder='Введите почту' className="form__input"/>
                    {this.state.emailError && <div className="form__input-error">{this.state.emailError}</div>}
                  </div>
                  <div className="form__input-container" >
                    <label htmlFor="password" className="form__input-label">Пароль</label>
                    <input value={this.state.password} onChange={this.handleChange} type='password' name='password' id="password" placeholder='Введите пароль' className="form__input"/>
                    {this.state.passwordError && <div className="form__input-error">{this.state.passwordError}</div>}
                  </div>
                  <div className="form__input-container" >
                    <label htmlFor="name" className="form__input-label">Имя</label>
                    <input value={this.state.name} onChange={this.handleChange} type='text' name='name' id="name" placeholder='Введите своё имя' className="form__input"/>
                    {this.state.nameError && <div className="form__input-error">{this.state.nameError}</div>}
                  </div>
                </>
              }
            />
          }
        />
      </>
    );
  }
}

export default RegisterPopup;
