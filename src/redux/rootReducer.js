import { DECREMENT, INCREMENT } from "./types";

// rootReducer должен вернуть новый объект
// асинхронных событий быть не должно 
export function rootReducer(state, action) {
    if(action.type === INCREMENT) {
        return state + 1;
    } else if (action.type === DECREMENT) {
        return state - 1;
    } 
    return state;
}