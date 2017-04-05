//const {createStore} = Redux;

const MapStoreReducer = (state=[], action)=> {
  switch (action.type){
    case 'deleteClientAddMarker':

      //filter client added marker
      state.clientAddMarkers = state.clientAddMarkers.filter(
        (clientAddMarker,index) => {
          if (index !== action.payload){
            return true;
          } else {
            clientAddMarker.setMap(null);
            return false;
          }
        }
      );

      //reset client added marker label
      state.clientAddMarkers.map((clientAddMarker, index)=>{
        clientAddMarker.setLabel(index+1+"");
      });
      return {
        ...state, type: 'deleteClientAddMarker',
      }
    case 'mapMoveTo':
      return {
        ...state, type: 'mapMoveTo', lat: action.lat, lng: action.lng
      }
    case 'addClientMarkers':
      return {
        ...state, type: 'addClientMarkers', clientAddMarkers: action.payload
      }
    case 'addClientMarkersSuccess':
      return {
        ...state, type: 'addClientMarkersSuccess'
      }
    case 'filterMapItems':
      const result = state.Markers.filter((item)=>{
        if (item.address.toUpperCase().indexOf(action.filterAddress.toUpperCase()) > -1 && item.provider.toUpperCase().indexOf(action.filterProvider.toUpperCase())>-1)
          return true;
      });
      return {
        ...state, type: 'filterMapItems', FilteredMarkers: result
      }
    case 'filterMapItemsSuccess':
      return {
        ...state, type: 'filterMapItemsSuccess', FilteredMarkers: ''
      }
    case 'getMapItems':
      try {
         fetch ("http://localhost:81/coursework/api/api.php?format=json&lang=en").then((response)=>{
           response.json().then((json)=>{
             console.log(json);
             action.dispatch({type: 'getMapItemsSuccess', Markers:json.stationList.station});
           });
         });
      } catch (e){
        console.log(e);
        action.dispatch({type: 'getMapItemsFail'});
      }
      return {
        ...state, type: 'getMapItems'
      }
    case 'getMapItemsSuccess':
      return {
        ...state, type: 'getMapItemsSuccess', Markers:action.Markers
      }
    case 'clearMapListItems':
      state.addMapListItems = [];
      return {
        ...state, type: 'filterMapSuccess'
      }
    case 'addMapListItem':
      const data = action.payload.stationList.station;
      state.addMapListItems.push(data);
        return {
          ...state, type: 'addMapListItem'
        }
    case 'deleteMapListItem':
      const place_id = action.payload;
      return {
      ...state, type: 'deleteMapListItem',
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
        ...state, type: action.type
      }
  }
}


//const MapStore = createStore(MapStoreReducer);
