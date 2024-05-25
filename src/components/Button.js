import React from 'react';
import '../styles/Button.css';

const SortButton = ({ value, onClick }) => {
  return (
    <div className="button">
      <button className="btn btn-sort" onClick={onClick}>{value}</button>
    </div>
  );
};

const ResetButton = ({ value, onClick }) => {
  return (
    <div className="button">
      <button className="btn btn-reset" onClick={onClick}>{value}</button>
    </div>
  );
};

export { SortButton, ResetButton };
