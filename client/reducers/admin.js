
const AdminStoreReducer = (state=[], action) => {
  switch (action.type){
    case 'login':
    try {
      const url_string = "username=" + encodeURIComponent(action.payload.username) + "&password=" + encodeURIComponent(action.payload.password);
      const result = fetch ("http://localhost:81/coursework/api/api.php?action=login",
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
        ...state, login: action.payload.result, token: action.payload.data.token, login_error_msg: '',
      }
    case 'login_fail':
      return {
        ...state, login: action.payload.result, token: '', login_error_msg: action.payload.error_msg,
      }
    default:
      return {
        ...state
      }
  }
}
