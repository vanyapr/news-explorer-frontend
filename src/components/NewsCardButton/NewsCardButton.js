import React from 'react';
import './NewsCardButton.css';
import { CurrentUserContext } from '../../contexts/currentUserContext';

class NewsCardButton extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      // Состояние тултипа: виден или нет
      isTooltipVisible: false,
      // Состояние кнопки "в избранное"
      isBookmarkButtonActive: false,
    };
  }

  static contextType = CurrentUserContext;
  // Поскольку контекст в классовом компоненте может быть только 1,
  // буду использовать значение this.context как булево

  toggleTooltip = () => {
    this.setState({
      isTooltipVisible: !this.state.isTooltipVisible,
    });
  }

  handleButtonPress = () => {
    // Проверить, авторизован ли юзер и является ли кнопка кнопкой удаления
    // В этом состоянии мы добавляем новость в избранное
    if (this.context && !(this.props.buttonType === 'delete')) {
      // Если юзер авторизован, мы добавляем карточку в избранное
      this.props.saveToFavorites(this.props.card).then((success) => {
        // Перевели состояние кнопки в "нажатое"
        this.setState({
          isBookmarkButtonActive: true,
        });
      }).catch((error) => {
        // Просто выведем ошибку в консоль в случае ошибки
        console.log(error);
      });
    } else if (this.context && this.props.buttonType === 'delete') {
      // Удаляем карточку, нажата кнопка удаления
      this.props.deleteCard(this.props.card._id);
    } else {
      // Если юзер не авторизован, мы открываем попап регистрации
      this.props.openLoginPopup();
    }
  }
  // Если юзер не авторизован, показываем "войдите"
  // Если юзер авторизован и находится в лк, показываем "удалить"

  render() {
    return (
      <>
        <button onClick={this.handleButtonPress} onMouseEnter={this.toggleTooltip} onMouseLeave={this.toggleTooltip} className={`card__button card__button_type_${this.props.buttonType} ${this.state.isBookmarkButtonActive ? 'card__button_type_bookmark_state_active' : ''}`}>Добавить в избранное</button>
        {(!this.context || this.props.buttonType === 'delete')
        && <div className={`card__tooltip card__tooltip_type_${this.props.buttonType} ${this.state.isTooltipVisible && 'card__tooltip_state_visible'} `}>{this.props.tooltipText}</div>
        }
      </>
    );
  }
}

export default NewsCardButton;
