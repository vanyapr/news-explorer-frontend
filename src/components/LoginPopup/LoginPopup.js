import React from 'react';
import './LoginPopup.css';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Popup from '../Popup/Popup';

class LoginPopup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.error = 'Текст ошибки для вёрстки';
  }

  handleSubmit = (form) => {
    console.log(form);
    const { email, password } = form;
    console.log(email, password);
    this.setState({
      email: email.value,
      password: password.value,
    });
    this.props.onSubmit({
      email: email.value,
      password: password.value,
    });
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
              alternative='Зарегистрироваться'
              onSubmit={this.handleSubmit}
              children={
                <>
                  <div className="form__input-container" >
                    <label htmlFor="login-email" className="form__input-label">Email</label>
                    <input type='email' name='email' id="login-email" placeholder='Введите почту' className="form__input"/>
                    {this.error && <div className="form__input-error">{this.error}</div>}
                  </div>
                  <div className="form__input-container" >
                    <label htmlFor="login-password" className="form__input-label">Пароль</label>
                    <input type='password' name='password' id="login-password" placeholder='Введите пароль' className="form__input"/>
                    {this.error && <div className="form__input-error">{this.error}</div>}
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
