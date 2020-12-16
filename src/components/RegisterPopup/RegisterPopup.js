import React from 'react';
import './RegisterPopup.css';
import Popup from '../Popup/Popup';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

class RegisterPopup extends React.Component {
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
              children={
                <>
                  <div className="form__input-container" >
                    <label htmlFor="email" className="form__input-label">Email</label>
                    <input type='email' name='email' id="email" placeholder='Введите почту' className="form__input"/>
                    {this.error && <div className="form__input-error">{this.error}</div>}
                  </div>
                  <div className="form__input-container" >
                    <label htmlFor="password" className="form__input-label">Пароль</label>
                    <input type='password' name='password' id="password" placeholder='Введите пароль' className="form__input"/>
                    {this.error && <div className="form__input-error">{this.error}</div>}
                  </div>
                  <div className="form__input-container" >
                    <label htmlFor="name" className="form__input-label">Имя</label>
                    <input type='text' name='name' id="name" placeholder='Введите своё имя' className="form__input"/>
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

export default RegisterPopup;
