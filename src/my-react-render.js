export const provider = component => arg => () => component(arg)();
export const text = f => (typeof f === 'function' ? f : () => f);

export const createStore = reducer => {
  let state = 0;
  let listeners = [];

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);
    for (let i = 0; i < listeners.length; ++i) {
      listeners[i]();
    }
    // крутая ошибка : забыл что итерируемым обьектам
    //наплевать на твоё мнение о "порядке" обхода
  };

  const subscribe = listener => {
    listeners.push(listener);
  };
  const add = obj => {
    state = { ...obj, ...state };
  };

  return { getState, dispatch, subscribe, add };
};
