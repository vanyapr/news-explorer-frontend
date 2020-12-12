import React from 'react';
import './NewsCardButton.css';

class NewsCardButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isTooltipVisible: false,
    };
  }

  toggleTooltip = () => {
    this.setState({
      isTooltipVisible: !this.state.isTooltipVisible,
    });
  }

  handleButtonPress = () => {
    // Потом сюда будем передавать хендлер через пропс
    console.log('Нажали кнопку');
  }

  render() {
    return (
      <>
        <button onClick={this.handleButtonPress} onMouseEnter={this.toggleTooltip} onMouseLeave={this.toggleTooltip} className={`card__button card__button_type_${this.props.buttonType}`}>Добавить в избранное</button>
        {/*<div className={this.state.isTooltipVisible ? 'card__tooltip card__tooltip_state_visible' : 'card__tooltip'}>{this.props.tooltipText}</div>*/}
        <div className={`card__tooltip card__tooltip_type_${this.props.buttonType} ${this.state.isTooltipVisible && 'card__tooltip_state_visible'} `}>{this.props.tooltipText}</div>
      </>
    );
  }
}

export default NewsCardButton;
