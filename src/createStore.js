// 17 строчек кода Redux
// Реализация через функцию, замыкания
// нету приватных переменных, благодаря замыканию мы можем их получить 
// То что будет находиться в createStore будет не доступно для тех кусков кода, где будет использовать store
// Когда прилетает action мы должны изменить state, и сделать мы это должны через Reducer


// Нюанс пустой объект state, не всегда начальное состояние для любого приложения
// initialState начальное состояние
// По правилам Reducer должен быть action, но учитывая что пока нету никаких действий 
// нужно просто проиницилизровать наш state, можно передать специальный системный объект
export function createStore(rootReducer, initialState) {
    // let state = {}
    let state = rootReducer(initialState, {type: '__INIT__'});
    const subscribers = [];

    // Публичные методы
    return {
        // dispatch что то произошло
        // action === {type: 'INCREMENT'}
        // action обычный объект у которого есть поле type
        dispatch(action) {
            // Правило Reducer на выходе мы получаем объект
            // не создаем новый объект, а изменяем текущее состояние 
            state = rootReducer(state, action);
            // Уведомить всех слушателей, что наше состояние изменилось 
            subscribers.forEach(sub => sub());
        },
        // subscribe все слушатели которые слушают этот объект, должны что-то поменять 
        // передаем функцию callback, которая выполниться когда что-то произойдет 
        // когда подписываемся на store, в массив subscribers складываем callback
        subscribe(callback) {
            subscribers.push(callback);
        },
        // получение состояния
        getState() {
            return state;
        }
    }
}