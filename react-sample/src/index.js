import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ShoppingList from './ShoppingList'
import Board from './Board'
import Game from './Game'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Game />, document.getElementById('root'));
registerServiceWorker();


