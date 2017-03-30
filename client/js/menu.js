const {connect} = ReactRedux;

class MenuContainer extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
  }

  componentDidMount(){

  }

  clickContact(){
    this.props.dispatch({type:'go_to_contact_page'});
  }

  render(){
    return (
      <div className="menuContainer">
        <div className="logoContainer">
          <div className="logo">CLP Power HK</div>
        </div>

        <div className="menuButtonContainer">
          <ul className="menuButton">
            <li ><a href="">Main</a></li>
            <li ><a href="javascript:;" onClick={this.clickContact.bind(this)}>Contact us</a></li>
            <li ><a href="./admin.html">Admin</a></li>
          </ul>
        </div>

        <div className="facebook-like">
          <div className="fb-like " data-href="https://developers.facebook.com/docs/plugins/" data-layout="box_count" data-action="like" data-size="large" data-show-faces="true" data-share="true"></div>
        </div>

      </div>
    )
  }
}

const Menu = connect(state=>state, null)(MenuContainer);
