import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { composeWithDevTools } from '@redux-devtools/extension';
import { rootReducer } from './redux/rootReducer';
import { asyncIncrement, changeTheme, decrement, increment } from './redux/actions';
import './styles.css';
// import { createStore } from './createStore';

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
// const store = createStore(
//     rootReducer,
//     compose(
//         applyMiddleware(thunk, logger),
//         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     ) 
// );

// С помощью установленного пакета composeWithDevTools
const store = createStore(
    rootReducer,
    composeWithDevTools (
        applyMiddleware(thunk, logger),
    ) 
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

themeBtn.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light') 
    ? 'dark'
    : 'light'
    store.dispatch(changeTheme(newTheme));
});

store.subscribe(() => {
    const state = store.getState();

    counter.textContent = state.counter;
    document.body.className = state.theme.value;

    [addBtn, subBtn, themeBtn, asyncBtn].forEach(btn => { 
        btn.disabled = state.theme.disabled
    });
});

store.dispatch({type: 'INIT_APPLICATION'});