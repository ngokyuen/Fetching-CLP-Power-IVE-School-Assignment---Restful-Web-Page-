//const {createStore} = Redux;

const MapStoreReducer = (state=[], action)=> {
  switch (action.type){
    case 'filterMap':
      return {
        ...state, filterAddress: action.address, filterProvider: action.provider,
      }
    case 'clearMapListItems':
      state.addMapListItems = [];
      return {
        ...state,
      }
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
          fetch('http://localhost:81/coursework/api/api.php?format=json&lang=en&action=addMapDetail',{
            method: "POST",
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: 'provider='+ encodeURIComponent(action.payload.provider) +'&mapdetails='+ encodeURIComponent(JSON.stringify(action.payload.mapdetails))}
          ).then(function(response){
            //console.log(encodeURIComponent(JSON.stringify(action.payload.mapdetails)));
            //alert(response.json());
            response.json().then(function (json){
              if (json.result === 'true') {
                alert("Create Successfully");
                action.dispatch({type:'clearMapListItems'});
              }

            });

          })
          return {
            ...state
          }
        // console.log(encodeURIComponent(JSON.stringify(action.payload.mapdetails)));

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
