import './style.scss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const iconStylePassword = ['eye', 'eye-slash'];

export const Input = ({ className, type, value, placeHolder, iconStyle, name, onChange }) => {
  const [Type, setType] = useState(type);
  const flag = type === 'password';
  /*{typeof iconStyle === 'object' && (
    <i
      className={`input__right-icon fa fa-${iconStyle.icon}`}
      style={iconStyle.style}
      aria-hidden="true"
    />
  )}*/
  const switchType = () => {
    setType(Type === 'password' ? 'text' : 'password');
  };
  return (
    <div className={`input ${className}`}>
      <div className="main-content">

        <input
          className="input__text"
          type={`${Type}`}
          placeholder={placeHolder}
          name={name}
          id={`txt${name}`}
          onChange={onChange}
        />
      </div>
      {flag && (
        <div className="option-content">
          <i
            className={`input__right-icon fa fa-${iconStylePassword[Type === 'password' ? 1 : 0]
              }`}
            aria-hidden="true"
            onClick={switchType}
          />
        </div>
      )}
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  placeHolder: PropTypes.string,
  iconStyle: PropTypes.objectOf({
    icon: PropTypes.string,
    style: PropTypes.object,
  }),
  name: PropTypes.string,
};

Input.defaultProps = {
  value: '',
  placeHolder: '',
  iconStyle: {},
  name: '',
};