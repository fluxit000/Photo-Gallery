import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {GalleryConextProvider} from './store/galleryAPI';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GalleryConextProvider>
    <App />
  </GalleryConextProvider>
);
