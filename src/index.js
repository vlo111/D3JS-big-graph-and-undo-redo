import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UndoManager from "./Undo/UndoManager";
import Undo1 from "./Undo/Undo1";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*<App />*/}
    {/*<UndoManager />*/}
    <Undo1 />
  </React.StrictMode>
);

reportWebVitals();
