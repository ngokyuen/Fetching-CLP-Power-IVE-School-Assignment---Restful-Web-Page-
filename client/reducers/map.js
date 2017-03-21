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
    case 'addMapListItemsToApi':
        try {
          const response = fetch('http://localhost:81/coursework/api/api.php?format=json&lang=en&action=addMapDetail',
          {headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }, method: "POST", body: 'data='+ encodeURIComponent(JSON.stringify(action.payload))}
        );

          return {
            ...state,
          }
        } catch (e) {
          console.log(e);
        }
    default:
      return {
        addMapListItems: [],
        ...state,
      }
  }
}


//const MapStore = createStore(MapStoreReducer);
