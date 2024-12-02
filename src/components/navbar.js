import React from 'react';
import PropTypes from 'prop-types';
import './navbar.css';

const Navbar = (props) => {
  return (
    <header className="navbar-container">
      <div data-thq="thq-navbar" className="navbar-navbar-interactive">
        <img
          alt={props.logoAlt}
          src='https://images.pexels.com/photos/6809665/pexels-photo-6809665.jpeg?auto=compress&cs=tinysrgb&w=800'
          className="navbar-image1"
        />
        <div data-thq="thq-navbar-nav" className="navbar-desktop-menu">
          <nav className="navbar-links1">
            <span className="thq-body-small thq-link">{props.link1}</span>
            <span className="thq-body-small thq-link">{props.link2}</span>
            <span className="thq-body-small thq-link">{props.link5}</span>
          </nav>
        </div>
        <div data-thq="thq-burger-menu" className="navbar-burger-menu">
          <svg viewBox="0 0 1024 1024" className="navbar-icon1">
            <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
          </svg>
        </div>
        <div data-thq="thq-mobile-menu" className="navbar-mobile-menu">
          <div className="navbar-nav">
            <div className="navbar-top">
              <img
                alt={props.logoAlt}
                src={props.logoSrc}
                className="navbar-logo"
              />
              <div data-thq="thq-close-menu" className="navbar-close-menu">
                <svg viewBox="0 0 1024 1024" className="navbar-icon3">
                  <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                </svg>
              </div>
            </div>
            <nav className="navbar-links2">
              <span className="thq-body-small thq-link">{props.link1}</span>
              <span className="thq-body-small thq-link">{props.link2}</span>
              <span className="thq-body-small thq-link">{props.link5}</span>
            </nav>
          </div>
          <div className="navbar-buttons2">
            
          </div>
        </div>
      </div>
    </header>
  );
};

Navbar.defaultProps = {
  logoAlt: 'DocTalk Logo',
  logoSrc: 'https://images.pexels.com/photos/3683107/pexels-photo-3683107.jpeg?auto=compress&cs=tinysrgb&w=800',
   
  link1: 'Home',
  link2: 'About',
  link5: 'Contact',
};

Navbar.propTypes = {
  logoAlt: PropTypes.string,
  logoSrc: PropTypes.string,
  link1: PropTypes.string,
  link2: PropTypes.string,
  link5: PropTypes.string,
};

export default Navbar;
