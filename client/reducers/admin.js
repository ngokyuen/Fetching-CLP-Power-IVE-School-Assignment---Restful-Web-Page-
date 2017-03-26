
const AdminStoreReducer = (state=[], action) => {
  switch (action.type){
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
