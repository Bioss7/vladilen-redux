import './styles.css';
// import { createStore } from './createStore';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './redux/rootReducer';
import { asyncIncrement, decrement, increment } from './redux/actions';

const counter = document.getElementById('counter');
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('sub');
const asyncBtn = document.getElementById('async');
const themeBtn = document.getElementById('theme');

// пример Middleware
// function logger(state) {
//     return function(next) {
//         return function(action) {
//             console.log('Prev State', state.getState());
//             console.log('Action', action);
//             const newState = next(action);
//             console.log('New State', newState);
//             return newState;
//         }
//     }
// }

// Создаем свою функцию которая есть в Redux
// получаем объект store который взаимодействует с данными 
// Для работы createStore нужен 1 параметр rootReducer
const store = createStore(
    rootReducer, 
    0, 
    applyMiddleware(thunk, logger)
);

addBtn.addEventListener('click', () => {
   store.dispatch(increment());
});

subBtn.addEventListener('click', () => {
    store.dispatch(decrement());
});

asyncBtn.addEventListener('click', () => {
    setTimeout(() => {
        store.dispatch(asyncIncrement());
    }, 2000)
});

store.subscribe(() => {
    const state = store.getState();

    counter.textContent = state;
});

store.dispatch({type: 'INIT_APPLICATION'});

themeBtn.addEventListener('click', () => {
    // document.body.classList.toggle('dark');
});
