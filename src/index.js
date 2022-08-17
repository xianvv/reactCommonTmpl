import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import routeConfig, { renderRoutes } from './router';
import reportWebVitals from './reportWebVitals';
import { webRecorder, getTodoMgr } from './utils';
import { env } from '@/config';

const todoMgr = getTodoMgr();
async function sendRecord(list) {
  const old = JSON.parse(localStorage.getItem('rrweb_events')) || [];
  old.unshift(...list);
  localStorage.setItem('rrweb_events', JSON.stringify(old));
}
webRecorder.setSave(list => {
  todoMgr.add(sendRecord, list);
});
const root = createRoot(document.getElementById('root'));
const StrictTag = env === 'production' ? React.StrictMode : 'div';
root.render(
  <StrictTag>
    {renderRoutes(routeConfig)}
  </StrictTag>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
