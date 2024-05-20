import React from 'react';
import '../styles/Button.css';

const Button = ({ value, onClick }) => {
  return (
    <div className="button">
      <button className="btn btn-blue" onClick={onClick}>{value}</button>
    </div>
  );
};

export default Button;