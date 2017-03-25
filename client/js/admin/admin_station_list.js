
const {connect} = ReactRedux

class AdminStationListComponent extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>test</div>
    )
  }
}

const AdminStationList = connect(state=>state, null)(AdminStationListComponent);
