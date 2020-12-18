import React from 'react';
import './LoginPopup.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Popup from '../Popup/Popup';

class LoginPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailValid: false,
      emailError: '',
      password: '',
      passwordError: '',
      passwordValid: false,
      formError: '', // Ошибка формы по умолчанию пустая
    };
  }

  handleSubmit = () => {
    // Передали данные из состояния во внешнюю функцию
    this.props.onSubmit({
      email: this.state.email,
      password: this.state.password,
    })
      .then((success) => {
        // Если всё в порядке, промис разрешится и мы скроем ошибку формы
        // А также сбросим значения инпутов
        this.setState({
          formError: '',
          password: '',
          email: '',
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
        emailError: 'Поле email обязательно',
      });
    }
  }

  _validatePassword = () => {
    if (this.state.password.length > 0) {
      // Если пароль не пустой, то проверим длину
      if (this.state.password.length < 5) {
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

  _validateForm = () => {
    this._validateEmail();
    this._validatePassword();
  }

  render() {
    return (
      <>
        <Popup
          isOpened={this.props.isLoginPopupOpened}
          close={this.props.close}
          title='Вход'
          children={
            <PopupWithForm
              changePopup={this.props.changePopup}
              buttonText='Войти'
              buttonEnabled={this.state.emailValid && this.state.passwordValid}
              alternative='Зарегистрироваться'
              onSubmit={this.handleSubmit}
              formError={this.state.formError}
              children={
                <>
                  <div className="form__input-container" >
                    <label htmlFor="login-email" className="form__input-label">Email</label>
                    <input value={this.state.email} onChange={this.handleChange} type='email' name='email' id="login-email" placeholder='Введите почту' required={true} className="form__input"/>
                    {this.state.emailError && <div className="form__input-error">{this.state.emailError}</div>}
                  </div>
                  <div className="form__input-container" >
                    <label htmlFor="login-password" className="form__input-label">Пароль</label>
                    <input value={this.state.password} onChange={this.handleChange} type='password' name='password' id="login-password" placeholder='Введите пароль' required={true} className="form__input"/>
                    {this.state.passwordError && <div className="form__input-error">{this.state.passwordError}</div>}
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

export default LoginPopup;
