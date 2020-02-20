import React from 'react';

// Interfaces
import { HeaderInterface } from './interface';

// Styles
import './Header.scss';

const Header = ({
  classes,
  onsubmit,
  defaultValue,
  handleOnChange
}: HeaderInterface) => {
  return (
    <header className={classes}>
      <div className="header-page__input-wrapper">
        <input
          id="url"
          type="text"
          value={defaultValue}
          onChange={handleOnChange}
          placeholder="paste or type youtube video url here.."
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
