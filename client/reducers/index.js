const {combineReducers, createStore} = Redux;

const RootReducer = combineReducers({
  Map: MapStoreReducer,
  Page: PageStoreReducer,
});

const RootReducerStore = createStore(RootReducer);
