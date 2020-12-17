import React from 'react';
import './NotificationPopup.css';
import Popup from '../Popup/Popup';

class NotificationPopup extends React.Component {
  render() {
    return (
      <>
        <Popup
          title='Пользователь успешно зарегистрирован!'
          isOpened={this.props.isNotificationPopupOpened}
          close={this.props.close}
          children={
            <button className='login-button' onClick={this.props.changePopup}>Войти</button>
          }
        />
      </>
    );
  }
}

export default NotificationPopup;
