const {connect} = ReactRedux;

class MapRightFloatShortcutComponent extends react.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="">
      </div>
    )
  }
}

const MapRightFloatShortcut = connect(state=>state, null)(MapRightFloatShortcutComponent);
