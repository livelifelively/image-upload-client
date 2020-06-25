import "core-js/stable";
import "regenerator-runtime/runtime";

import React from 'react';
import ReactDOM from 'react-dom';

import App from '@/App';

const title = 'Slintel: Image Upload';

ReactDOM.render(
  <App title={title} />,
  document.getElementById('app')
);
