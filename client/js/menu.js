class Menu extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
  }

  componentDidMount(){

  }

  render(){
    return (
      <div className="menuContainer">
        <ul>
          <li ><a href="">Main</a></li>
          <li ><a href="javascript:;">Contact us</a></li>
          <li ><a href="./admin.html">Admin</a></li>
        </ul>
        <div className="facebook-like">
          <div className="fb-like " data-href="https://developers.facebook.com/docs/plugins/" data-layout="box_count" data-action="like" data-size="large" data-show-faces="true" data-share="true"></div>
        </div>

      </div>
    )
  }
}

ReactDOM.render(
  <Menu />
  ,document.getElementById('menu')
);
