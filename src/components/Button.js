import React from 'react';
import '../styles/Button.css';

const Button = ({ value, onClick }) => {
  return (
    <div className="button">
      <button className="button" onClick={onClick}>{value}</button>
    </div>
  );
};

export default Button;