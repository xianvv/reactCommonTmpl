import React from 'react';
import { createRoot } from 'react-dom/client';

const env = process.env.REACT_APP_ENV;
const root = createRoot(document.getElementById('root'));
const StrictTag = env === 'production' ? React.StrictMode : 'div';
root.render(
  <StrictTag>
    <div>666</div>
  </StrictTag>
);