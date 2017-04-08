
const PageStoreReducer = (state=[], action) => {
  switch (action.type){
    case 'connect_ws':
      try {
        const socket = io.connect('http://localhost:82');
        socket.on('connect', ()=>{
          socket.on('number_online_user', (data)=>{
              action.dispatch({type:'ws_number_online_user', number_online_user: data, socket: socket});
          })

          socket.on('update_client_all_stations', ()=>{
            action.dispatch({type:'getMapItems', dispatch:action.dispatch});
          })

          socket.on('ws_notify', (data)=>{
            action.dispatch({type:'ws_notify', notify: data});
          })

        })

        return {
          ...state, type: 'connect_ws_success',
        }
      } catch (e){
        return {
          ...state, type: 'connect_ws_fail',
        }
      }

      return {
        ...state, type:'connect_ws',
      }
    case 'ws_notify':
      return {
        ...state, type:'ws_notify', notify: action.notify,
      }
    case 'ws_update_client_all_stations':
      //alert("ws_update_client_all_stations");
      action.socket.emit('update_client_all_stations',true);
      return {
        ...state, type:'ws_update_client_all_stations',
      }

    case 'ws_number_online_user':
      return {
        ...state, type:'ws_number_online_user_success', number_online_user: action.number_online_user, socket: action.socket,
      }
    case 'ws_client_submit_markers':
      action.socket.emit('client_submit_markers', true);
      return {
        ...state, type:'ws_client_submit_markers'
      }
    case 'go_to_contact_page':
      return {
        ...state, page: 'contact_page',
      }
    case 'clear_page':
      return {
        ...state, page: ''
      }
    default:
      return {
        ...state, page: '',
      }
  }
}
