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
          <li ><div className="fb-login-button" data-max-rows="1" data-size="large" data-show-faces="false" data-auto-logout-link="true"></div></li>
          <li ><a href="javascript:;">Contact us</a></li>
          <li ><a href="./admin.html">Admin</a></li>
        </ul>
        <div className="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button_count" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>
      </div>
    )
  }
}

// var Test = React.createClass({
//   render: function() {
//     return (
//       <div>234</div>
//     );
//   }
// });

ReactDOM.render(
  <Menu />
  ,document.getElementById('menu')
);
