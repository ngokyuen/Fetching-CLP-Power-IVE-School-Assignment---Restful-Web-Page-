const {combineReducers, createStore} = Redux;

const RootReducer = combineReducers({
  Map: MapStoreReducer,
});

const RootReducerStore = createStore(RootReducer);
