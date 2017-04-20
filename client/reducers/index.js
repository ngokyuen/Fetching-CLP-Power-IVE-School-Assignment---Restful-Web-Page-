const {combineReducers, createStore} = Redux;

const RootReducer = combineReducers({
  Map: MapStoreReducer,
  Page: PageStoreReducer,
  Admin: AdminStoreReducer,
});

const RootReducerStore = createStore(RootReducer);
