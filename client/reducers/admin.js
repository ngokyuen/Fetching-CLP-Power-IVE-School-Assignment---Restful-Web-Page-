
const AdminStoreReducer = (state=[], action) => {
  switch (action.type){
    case 'update_station':
      try {
        const url_string = "id=" + encodeURIComponent(action.id) + "&editStation=" + encodeURIComponent(action.editStation);
        fetch ("http://localhost:81/coursework/api/api.php?action=update_station",
        {
          method: "POST",
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: url_string,
        }).then(function(response){
          response.json().then(function(json){
            //console.log(json);
            if (json.result == true)
              action.dispatch({type:'update_station_success', payload: json});
            else
              action.dispatch({type:'update_station_fail', payload: json});
          });
        });
      } catch(e){
        console.log(e);
      }
      return {
        ...state, type: 'update_station',
      }
    case 'update_station_success':
      return {
        ...state, type: 'update_station_success',
      }
    case 'update_station_fail':
      return {
        ...state, type: 'update_station_fail',
      }
    case 'delete_station':
      try {
        fetch("http://localhost:81/coursework/api/api.php?action=delete_station&id="+action.id).then(function(response){
          response.json().then(function(json){
            if (json.result == true)
              action.dispatch({type:'delete_station_success'});
            else
              action.dispatch({type:'delete_station_fail'});
          });
        });
      } catch (e){
        console.log(e);
      }
      return {
        ...state, type: 'delete_station',
      }
      break;
    case 'delete_station_success':
      return {
        ...state, type: 'delete_station_success',
      }
    case 'delete_station_fail':
      return {
        ...state, type: 'delete_station_fail',
      }
    case 'load_station':
      try {
        fetch("http://localhost:81/coursework/api/api.php?no=" + action.no + "&format=json&lang=en").then(function(response){
          response.json().then(function(json){
            if (json){
              action.dispatch({type:'load_station_success', payload:json});
            } else {
              action.dispatch({type:'load_station_fail'});
            }

          });
        });
      } catch(e) {
        console.log(e);
      }
      return {
        ...state, type: 'load_station',
      }
    case 'load_station_success':
      return {
        ...state, load_station_result: action.payload, type: 'load_station_success',
      }
    case 'load_station_fail':
      return {
        ...state, type: 'load_station_fail',
      }
    case 'clear_load_station':
      return {
        ...state, load_station_result: null, type: 'clear_load_station_success',
      }
    case 'load_stations':
      try {
        fetch("http://localhost:81/coursework/api/api.php?format=json&lang=en").then(function(response){
          response.json().then(function(json){
            if (json)
              action.dispatch({type:'load_stations_success', payload:json});
            else
              action.dispatch({type:'load_stations_fail'});
          });
        });
      } catch(e) {
        console.log(e);
      }
      return {
        ...state, type:'load_stations',
      }
    case 'load_stations_success':
      return {
        ...state, load_stations_result: action.payload, type: 'load_stations_success',
      }
    case 'load_stations_fail':
      return {
        ...state, type: 'load_stations_fail',
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
            if (json.result == true)
              action.dispatch({type:'login_success', payload: json});
            else
              action.dispatch({type:'login_fail', payload: json});
          });
        });
        return {
          ...state, type: 'login',
        }
      } catch (e){
        console.log(e)
      }
    case 'login_success':
      return {
        ...state, type:'login_completed', login_result: action.payload.result, token: action.payload.data.token, login_error_msg: '',
      }
    case 'login_fail':
      return {
        ...state, type:'login_fail', login_result: action.payload.result, token: '', login_error_msg: action.payload.error_msg,
      }
    default:
      return {
        ...state, type: action.type,
      }
  }
}
