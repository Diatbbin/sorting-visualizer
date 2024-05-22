import React from 'react';
import '../styles/Bar.css';

const Bar = ({ heightFrac }) => {
  return <div className="bar" style={{ height: `${heightFrac * (4/5) * 100}%` }}></div>;
};

export default Bar;