
const {connect} = ReactRedux;

class AdminEditStationComponent extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>123</div>
    )
  }
}

const AdminEditStation = connect(state=>state, null)(AdminEditStationComponent);
