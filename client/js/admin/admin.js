class Admin extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    const root = RootReducerStore;
    return (
      <div>
        <AdminLogin store={root} />
        <AdminMain store={root} />
        <AdminEditStation store={root} />
      </div>
    )
  }
}

//const Admin = connect(state=>state, null)(AdminComponent);
ReactDOM.render(
  <Admin />
  ,document.getElementById('content')
);
