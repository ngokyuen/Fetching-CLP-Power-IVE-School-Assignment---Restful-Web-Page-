class AdminComponent extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    const root = RootReducerStore;
    const {login_result} = this.props.Admin;
    if (login_result){
      return (
        <div>
          <AdminLogin store={root} />
          <AdminMain store={root} />
          <AdminEditStation store={root} />
        </div>
      )
    } else {
      return (
        <div>
          <AdminLogin store={root} />
        </div>
      )
    }

  }
}

const root = RootReducerStore;
const Admin = connect(state=>state, null)(AdminComponent);
ReactDOM.render(
  <Admin store={root} />
  ,document.getElementById('content')
);
