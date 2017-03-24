
const AdminStoreReducer = (state=[], action) => {
  switch (action.type){
    case 'login':
    try {
      const result = fetch ("http://localhost:81/coursework/api/api.php?action=login",
      
    );
      const json = result.json();

      return {
        ...state
      }
    } catch (e){
      console.log(e)
    }
    default:
      return {
        ...state
      }
  }
}
