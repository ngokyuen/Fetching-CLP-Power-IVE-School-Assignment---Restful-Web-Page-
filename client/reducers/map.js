//const {createStore} = Redux;

const MapStoreReducer = (state=[], action)=> {
  switch (action.type){
    case 'addMapListItem':
    const data = action.payload.stationList.station;
    state.addMapListItems.push(data);
      return {
        ...state,
      }
    case 'deleteMapListItem':
      const place_id = action.payload;
      return {
      ...state,
        addMapListItems: state.addMapListItems.filter((item)=> {
          return item.result.place_id != place_id;
        }),
      }
      break;
    default:
      return {
        addMapListItems: [],
        ...state,
      }
  }
}


//const MapStore = createStore(MapStoreReducer);
