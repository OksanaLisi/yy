import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './BurgerMenu.scss';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    const rootElement = document.getElementById('blured');
    if (rootElement) {
      rootElement.classList.toggle('blur');
    }
  };

  const closeMenu = () => {
    setIsOpen(false); // Закриття меню
    const rootElement = document.getElementById('blured');
    if (rootElement) {
      rootElement.classList.remove('blur'); // Прибрати розмиття
    }
  };

  return (
    <div className={`burger-menu ${isOpen ? 'open' : ''}`}>
      <div className="burger-icon" onClick={toggleMenu}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
      <div className="menu-items">
        <ul>
          <Link to="/" onClick={closeMenu}><li>Main</li></Link> {/* Додано onClick */}
          <Link to="/main" onClick={closeMenu}><li>Domains Add</li></Link> {/* Додано onClick */}
          <Link to="/add-generation" onClick={closeMenu}><li>Add Generation</li></Link> {/* Додано onClick */}
        </ul>
      </div>
    </div>
  );
};

export default BurgerMenu;
