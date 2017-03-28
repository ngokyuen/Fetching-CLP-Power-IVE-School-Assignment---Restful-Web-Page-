
const AdminStoreReducer = (state=[], action) => {
  switch (action.type){
    case 'delete_station':
      try {
        fetch("http://localhost:81/coursework/api/api.php?action=delete_station&id="+action.id).then(function(response){
          response.json().then(function(json){
            action.dispatch({type:'delete_station_success'});
          });
        });
      } catch (e){
        action.dispatch({type:'delete_station_fail'});
        console.log(e);
      }
      return {
        ...state,
      }
      break;
    case 'delete_station_success':
      return {
        ...state, type: delete_station_success
      }
    case 'delete_station_fail':
      return {
        ...state, type: delete_station_fail
      }
    case 'load_station':
      try {
        fetch("http://localhost:81/coursework/api/api.php?no=" + action.no + "&format=json&lang=en").then(function(response){
          response.json().then(function(json){
            action.dispatch({type:'load_station_success', payload:json});
          });
        });
      } catch(e) {
        action.dispatch({type:'load_station_fail'});
        console.log(e);
      }
      return {
        ...state,
      }
    case 'clear_load_station':
      return {
        ...state, load_station_result: null,
      }
    case 'load_station_success':
      return {
        ...state, load_station_result: action.payload,
      }
    case 'load_station_fail':
      return {
        ...state, load_station_error_msg: 'Load Station Error',
      }
    case 'load_stations':
      try {
        fetch("http://localhost:81/coursework/api/api.php?format=json&lang=en").then(function(response){
          response.json().then(function(json){
            action.dispatch({type:'load_stations_success', payload:json});
          });
        });
      } catch(e) {
        action.dispatch({type:'load_stations_fail'});
        console.log(e);
      }
      return {
        ...state,
      }

    case 'load_stations_success':
      return {
        ...state, load_stations_result: action.payload,
      }
    case 'load_stations_fail':
      return {
        ...state, load_stations_error_msg: 'Load Stations Error',
      }

    case 'login':
      try {
        const url_string = "username=" + encodeURIComponent(action.payload.username) + "&password=" + encodeURIComponent(action.payload.password);
        fetch ("http://localhost:81/coursework/api/api.php?action=login",
        {
          method: "POST",
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: url_string,
        }).then(function(response){
          response.json().then(function(json){
            //console.log(json);
            if (json.result == true){
              action.dispatch({type:'login_success', payload: json});
            } else {
              action.dispatch({type:'login_fail', payload: json});
            }
          });
        });
        return {
          ...state,
        }
      } catch (e){
        console.log(e)
      }
    case 'login_success':
    //alert("test");
      return {
        ...state, login_result: action.payload.result, token: action.payload.data.token, login_error_msg: '',
      }
    case 'login_fail':
      return {
        ...state, login_result: action.payload.result, token: '', login_error_msg: action.payload.error_msg,
      }
    default:
      return {
        ...state
      }
  }
}
