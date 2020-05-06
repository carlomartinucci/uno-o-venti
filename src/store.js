import { configureStore } from "@reduxjs/toolkit";
import {throttle} from 'lodash';

import eggAndChickenReducer from "./eggAndChickenSlice";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('loading error', err)
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.error('saving error', err)
  }
};

const store = configureStore({
  reducer: eggAndChickenReducer,
  preloadedState: loadState()
});

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

export default store
