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
      <div style={{padding:30}}>
        <ul>
          <li style={{padding:10, display:"inline"}}><a href="">Main</a></li>
          <li style={{padding:10, display:"inline"}}><div className="fb-login-button" data-max-rows="1" data-size="large" data-show-faces="false" data-auto-logout-link="true"></div></li>
          <li style={{padding:10, display:"inline"}}><a href="javascript:;">Contact us</a></li>
          <li style={{padding:10, display:"inline"}}><a href="./admin.html">Admin</a></li>
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
