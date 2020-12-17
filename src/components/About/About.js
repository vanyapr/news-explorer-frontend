import React from 'react';
import './About.css';
import author from '../../images/author.jpg';
import author2x from '../../images/author@2x.jpg';

class About extends React.Component {
  render() {
    return (
      <>
        <section className='about'>
          <div className="about__container">
            <img className="about__image" src={author} srcSet={author2x} width='464' height='464' alt="Автор"/>
            <div className="about__text">
              <h2 className="about__heading">Об авторе</h2>
              <p className="about__description">Меня зовут Ваня Проскуряков, я&nbsp;веб-разработчик из&nbsp;города Орехово-Зуево.
                Я&nbsp;хорошо разбираюсь в&nbsp;HTML, CSS, Javascript, Node, PHP, Nginx, React и&nbsp;многом другом, касающемся
                фронтенда, бекенда, и&nbsp;в&nbsp;целом веб-разработки.
              </p>
              <p className="about__description">На&nbsp;практикуме я&nbsp;стал разбираться во&nbsp;всём этом ещё лучше,
                и&nbsp;получил прикольный диплом.
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default About;
