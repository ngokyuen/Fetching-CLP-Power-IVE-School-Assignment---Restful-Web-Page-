
const PageStoreReducer = (state=[], action) => {
  switch (action.type){
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
