import React from 'react';
import '../styles/Button.css';

const BlueButton = ({ value, onClick }) => {
  return (
    <div className="button">
      <button className="btn btn-blue" onClick={onClick}>{value}</button>
    </div>
  );
};

const RedButton = ({ value, onClick }) => {
  return (
    <div className="button">
      <button className="btn btn-red" onClick={onClick}>{value}</button>
    </div>
  );
};

export { BlueButton, RedButton };
