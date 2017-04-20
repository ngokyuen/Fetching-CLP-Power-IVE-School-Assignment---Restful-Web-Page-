
const {connect} = ReactRedux;

class AdminMainComponent extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    const root = RootReducerStore;
    return (
      <div>
        <AdminStationList store={root}/>
      </div>
    );
  }
}

const AdminMain = connect(state=>state, null)(AdminMainComponent);
