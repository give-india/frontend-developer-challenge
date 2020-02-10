import React from 'react';

// Interfaces
import { HeaderInterface } from './interface';

// Styles
import './Header.scss';

const Header = ({ classes, URLRef, onsubmit }: HeaderInterface) => {
  return (
    <header className={classes}>
      <div className="header-page__input-wrapper">
        <input
          id="url-input"
          type="text"
          placeholder="paste or type youtube video url here.."
          ref={URLRef}
          className="header-page__input-text"
        ></input>
        <button className="cursor header-page__input-button" onClick={onsubmit}>
          ADD
        </button>
      </div>
    </header>
  );
};

export default Header;
