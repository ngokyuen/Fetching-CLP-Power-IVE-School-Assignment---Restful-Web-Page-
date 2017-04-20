const {connect} = ReactRedux

class ContactComponent extends React.Component {

  constructor(props){
    super(props);
  }

  //close the alert dialog when click the background
  clickBackground(){
    this.props.dispatch({type:'clear_page'});
  }

  
  render(){
    const {page} = this.props.Page;

    if (page == 'contact_page') {

      return (
        <div className="alertContainer">
            <div onClick={this.clickBackground.bind(this)} className="background"></div>
            <div className="alert">
              <div className="content">
                <div className="header">Contact Us</div>
                <div className="content_content">
                    <p>
                    <b>Address:</b><br />
                    20 Tsing Yi Road, Tsing Yi Island, New Territories<br/>
                    </p>
                    <p><b>Tel:</b><br /><a href="callto:1234 4567">1234 4567</a><br/></p>
                    <p><b>Fax:</b><br />1234 4568<br/></p>
                    <p><b>Email:</b><br /><a href="mailto:tedngok@gmail.com">tedngok@gmail.com</a></p>
                    <p><b>Location:</b></p>
                    <iframe width="800" height="600" frameBorder="0" style={{border:0}}
                      src="https://www.google.com/maps/embed/v1/place?q=20%20Tsing%20Yi%20Road%2C%20Tsing%20Yi%20Island%2C%20New%20Territories&key=AIzaSyC_uk7pUPriJEafftHHGKp4pozIieTegdA" allowFullScreen>
                    </iframe>
                  </div>
                </div>
            </div>
        </div>
      );
    } else {
      return null;
    }

  }

}


const Contact = connect(state=>state, null)(ContactComponent);
