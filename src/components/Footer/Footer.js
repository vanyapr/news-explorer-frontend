import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

class Footer extends React.PureComponent {
  render() {
    return (
      <footer className='footer'>
        <div className="footer__container">
          <p className="footer__copyright">© 2020 Supersite, Powered by News API</p>
          <nav className="footer__links">
            <ul className="footer__links-list">
              <li className="footer__links-list-item">
                <Link to='/' className='footer__link' title='Главная'>Главная</Link>
              </li>
              <li className="footer__links-list-item">
                <Link to='https://praktikum.yandex.ru' className='footer__link' title='Яндекс практикум'>Яндекс практикум</Link>
              </li>
            </ul>
            <ul className="footer__links-list footer__links-list_type_socials">
              <li className="footer__links-list-item">
                <Link to='https://github.com/vanyapr' className='footer__link-social footer__link_socials_type_github' title='Github' target='_blank'>Github</Link>
              </li>
              <li className="footer__links-list-item">
                <Link to='https://ru-ru.facebook.com/HowToBasic/' className='footer__link-social footer__link_socials_type_facebook' title='Facebook' target='_blank'>Яндекс практикум</Link>
              </li>
            </ul>
          </nav>
        </div>

      </footer>
    );
  }
}

export default Footer;
