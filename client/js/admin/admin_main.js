
const {connect} = ReactRedux;

class AdminMainComponent extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <AdminStationList store={this.props} />
      </div>
    );
  }
}

const AdminMain = connect(state=>state, null)(AdminMainComponent);
