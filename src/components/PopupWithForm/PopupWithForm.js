import React from 'react';
import './PopupWithForm.css';

class PopupWithForm extends React.Component {
  constructor(props) {
    super(props);

    this.isSubmitDisabled = false;
    this.formError = 'Такой пользователь уже есть';
  }

  handleLinkClick = (event) => {
    event.preventDefault();
    this.props.changePopup();
    console.log('Нажата ссылка смены попапа');
  }

  render() {
    return (
      <>
        <form className="form">
          {this.props.children}
          {this.formError && <div className="form__form-error">{this.formError}</div>}
          <button type="submit" className={this.isSubmitDisabled ? 'form__submit-button form__submit-button_state_disabled' : 'form__submit-button'}>{this.props.buttonText}</button>
        </form>
        <p className="form__variants">или <a onClick={this.handleLinkClick} className='form__link'>{this.props.alternative}</a></p>
      </>
    );
  }
}

export default PopupWithForm;
